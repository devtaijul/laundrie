"use client";

import { useCallback, useMemo, useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import {
  createOrderAction,
  payOrderAction,
  refreshPaymentIntentStatusAction,
} from "@/actions/order.actions";
import { OrderData, useOrder } from "@/contexts/OrderContext";
import { useOrderCalculation } from "./use-order-calculation";

type BillingInfo = { name?: string; email?: string; postalCode?: string };

export function useStripePaymentAndOrder(getBillingInfo?: () => BillingInfo) {
  const { state } = useOrder();
  const { total } = useOrderCalculation();
  const stripe = useStripe();
  const elements = useElements();

  // UI state & validation
  const [zip, setZip] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [errCard, setErrCard] = useState<string | null>(null);
  const [errExp, setErrExp] = useState<string | null>(null);
  const [errCvc, setErrCvc] = useState<string | null>(null);
  const [globalErr, setGlobalErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const elementOptions = useMemo(
    () => ({
      style: {
        base: {
          fontSize: "16px",
          color: "#0f172a",
          "::placeholder": { color: "#9CA3AF" },
        },
        invalid: { color: "#DC2626" },
      },
    }),
    []
  );

  const valid = useMemo(
    () => !errCard && !errExp && !errCvc && zip.trim().length >= 3,
    [errCard, errExp, errCvc, zip]
  );

  // field change handlers
  const onCardNumberChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => setErrCard(e.error?.message ?? null),
    []
  );
  const onExpiryChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => setErrExp(e.error?.message ?? null),
    []
  );
  const onCvcChange = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => setErrCvc(e.error?.message ?? null),
    []
  );

  // ONE BUTTON: create order → tokenize → pay
  const orderAndPay = useCallback(async () => {
    setGlobalErr(null);

    if (!stripe || !elements) {
      setGlobalErr("Stripe not ready yet.");
      return;
    }
    if (!valid) {
      setGlobalErr("Please fix validation errors.");
      return;
    }

    setLoading(true);
    try {
      // 1) Create order first (server)

      const order = await createOrderAction(state.data, total); // { id, totalCents, currency }

      // 2) Tokenize → PaymentMethod
      const card = elements.getElement(CardNumberElement);
      if (!card) throw new Error("Card element not found");

      const info = getBillingInfo?.() ?? {};
      const pmRes = await stripe.createPaymentMethod({
        type: "card",
        card,
        billing_details: {
          name: info.name,
          email: info.email,
          address: { postal_code: info.postalCode ?? zip },
        },
      });
      if (pmRes.error || !pmRes.paymentMethod) {
        throw new Error(
          pmRes.error?.message || "Failed to create payment method"
        );
      }

      // 3) Pay that order (server confirm)
      const { outcome } = await payOrderAction({
        orderId: order.id,
        paymentMethodId: pmRes.paymentMethod.id,
        saveCard,
      });

      // 4) 3DS?
      if (outcome.status === "requires_action" && outcome.clientSecret) {
        const act = await stripe.handleCardAction(outcome.clientSecret);
        if (act.error) throw new Error(act.error.message || "3D Secure failed");
        await refreshPaymentIntentStatusAction(outcome.paymentIntentId);
      }

      return {
        orderId: order.id,
        paymentIntentId: outcome.paymentIntentId,
        status: outcome.status,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setGlobalErr(e.message || "Payment failed");
      throw e;
    } finally {
      setLoading(false);
    }
  }, [elements, getBillingInfo, saveCard, stripe, valid, zip]);

  return {
    // state & validation
    zip,
    setZip,
    saveCard,
    setSaveCard,
    errCard,
    errExp,
    errCvc,
    globalErr,
    loading,
    valid,
    elementOptions,
    onCardNumberChange,
    onExpiryChange,
    onCvcChange,
    // main action
    orderAndPay,
  };
}
