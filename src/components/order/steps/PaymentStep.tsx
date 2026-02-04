"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PAGES } from "@/config/pages.config";
import { useOrder } from "@/contexts/OrderContext";
import { useStripePaymentAndOrder } from "@/hooks/useStripePayment";
import { SafePaymentSetting } from "@/types/global-type";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TotalBlock } from "./TotalBlock";

function Inner() {
  const router = useRouter();
  const { dispatch } = useOrder();
  const { data: session } = useSession();

  const {
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
    orderAndPay,
  } = useStripePaymentAndOrder(() => ({
    name: session?.user.name || "",
    email: session?.user.email || "",
    // postalCode optional; hook zip state will be used
  }));

  const handleClick = async () => {
    try {
      const res = await orderAndPay(); // { orderId, paymentIntentId, status }

      if (res?.orderId) {
        router.push(PAGES.ORDER_SUCCESS(res?.orderId));
        dispatch({ type: "RESET_ORDER" });
      }
    } catch {
      // error already shown via globalErr
      throw new Error(
        "An error occurred while processing your payment. Please try again later."
      );
    }
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <TotalBlock />
      </div>
      <div>
        <Label>Card Number</Label>
        <div
          className={`border rounded-lg p-3 ${
            errCard ? "border-red-400" : "border-gray-200"
          }`}
        >
          <CardNumberElement
            options={elementOptions}
            onChange={onCardNumberChange}
          />
        </div>
        {errCard && <p className="text-red-600 text-sm mt-1">{errCard}</p>}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label>MM/YY</Label>
          <div
            className={`border rounded-lg p-3 ${
              errExp ? "border-red-400" : "border-gray-200"
            }`}
          >
            <CardExpiryElement
              options={elementOptions}
              onChange={onExpiryChange}
            />
          </div>
          {errExp && <p className="text-red-600 text-sm mt-1">{errExp}</p>}
        </div>
        <div>
          <Label>CVV</Label>
          <div
            className={`border rounded-lg p-3 ${
              errCvc ? "border-red-400" : "border-gray-200"
            }`}
          >
            <CardCvcElement options={elementOptions} onChange={onCvcChange} />
          </div>
          {errCvc && <p className="text-red-600 text-sm mt-1">{errCvc}</p>}
        </div>
        <div>
          <Label>Zip Code</Label>
          <Input
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\s+/g, ""))}
            className={`h-12 ${zip && zip.length < 3 ? "border-red-400" : ""}`}
            placeholder="Zip"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="save"
          checked={saveCard}
          onCheckedChange={(c) => setSaveCard(Boolean(c))}
        />
        <Label htmlFor="save" className="cursor-pointer">
          Save card for future orders
        </Label>
      </div>

      {globalErr && (
        <div className="p-3 bg-red-50 text-red-700 rounded">{globalErr}</div>
      )}

      <Button
        onClick={handleClick}
        disabled={!valid || loading}
        className="w-full h-12"
      >
        {loading ? "Processing..." : "Place order & pay"}
      </Button>
    </div>
  );
}

export function PaymentStep({
  paymentSetting,
}: {
  paymentSetting: SafePaymentSetting | null;
}) {
  if (!paymentSetting?.stripe_publishable_key) {
    return (
      <div>
        <p>Payment gateway not configured</p>
      </div>
    );
  }

  const stripePromise = loadStripe(paymentSetting?.stripe_publishable_key);
  return (
    <Elements stripe={stripePromise}>
      <Inner />
    </Elements>
  );
}
