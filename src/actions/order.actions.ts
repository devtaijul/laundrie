"use server";

import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { OrderData } from "@/contexts/OrderContext";
import { PickupSpotTS } from "@/types/enums";
import {
  actionError,
  actionResponse,
  generateOrderId,
} from "@/lib/server/utils";
import { OrderEventType, OrderStatus } from "@/generated/prisma";
import { orderCalculation } from "@/lib/utils";

let stripeClient: Stripe | null = null;

async function getStripeClient(): Promise<Stripe> {
  if (stripeClient) return stripeClient;

  const paymentSettings = await prisma.paymentSetting.findFirst({
    select: { stripe_secret_key: true },
  });

  if (!paymentSettings || !paymentSettings.stripe_secret_key) {
    // এখানে থ্রো করাই ভালো, যাতে উপর থেকে ক্যাচ করে সুন্দর error দেখাতে পারেন
    throw new Error("Stripe secret key not configured");
  }

  stripeClient = new Stripe(paymentSettings.stripe_secret_key, {
    apiVersion: "2025-10-29.clover",
  });

  return stripeClient;
}

// map PI status → our order status
function mapPiStatusToOrder(s: Stripe.PaymentIntent.Status): OrderStatus {
  switch (s) {
    case "succeeded":
      return OrderStatus.DELIVERED;
    case "processing":
    case "requires_action":
    case "requires_confirmation":
    case "requires_capture":
      return OrderStatus.PROCESSING;
    case "canceled":
      return OrderStatus.CANCELED;
    case "requires_payment_method":
      return OrderStatus.FAILED;
    default:
      return OrderStatus.PENDING;
  }
}

async function getOrCreateStripeCustomer(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) return user.stripeCustomerId;

  const stripe = await getStripeClient();

  const customer = await stripe.customers.create({
    email: user?.email || undefined,
    name: user?.name || undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

/** 1) Create order first (no Stripe yet) */
export async function createOrderAction(orderState: OrderData, total: number) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) throw new Error("Not authenticated");

    // 👉 server-side এ আপনার কার্ট থেকে মোট বের করুন
    const totalCents = total * 100; // convert to cents

    const {
      machinesCost,
      oversizedCost,
      deliveryFee,
      subtotal,
      tax,
      /*   minimumCharge,
      isExpress, */
    } = orderCalculation(orderState);

    const {
      pickupAddress,
      pickupInstructions,
      pickupSpot,
      detergent,
      delicateCycle,
      returnOnHangers,
      additionalRequests,
      smallBags,
      regularBags,
      largeBags,
      oversizedItems,
      coverageType,
      promoCode,
      giftCard,
      // paymentMethod,
      coverageCost,
      deliverySpeed,
    } = orderState;

    const orderId = generateOrderId();

    const order = await prisma.order.create({
      data: {
        userId,
        totalCents,
        currency: "eur",
        pickupAddress,
        pickupInstructions,
        pickupSpot: pickupSpot as PickupSpotTS,
        delicateCycle,
        returnOnHangers,
        additionalRequests,
        smallBags,
        regularBags,
        largeBags,
        oversizedItems,
        coverageType,
        promoCode,
        giftCard,
        deliverySpeed,
        detergent,
        machinesCost,
        oversizedCost,
        deliveryFee,
        subtotal,
        tax,
        coverageCost,
        orderId,
        status: OrderStatus.PENDING,
      },
      select: { id: true, totalCents: true, currency: true },
    });

    // create an event for the order
    await prisma.orderEvent.create({
      data: {
        orderId: order.id,
        type: OrderEventType.PICKUP_SCHEDULED,
        title: "Pickup Scheduled",
      },
    });

    return order; // { id, totalCents, currency }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create order");
  }
}

/** 2) Pay an order: create+confirm PI and write Payment history */
export async function payOrderAction(input: {
  orderId: string;
  paymentMethodId: string; // pm_xxx from client
  saveCard?: boolean;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Not authenticated");

  const order = await prisma.order.findUnique({ where: { id: input.orderId } });
  if (!order) throw new Error("Order not found");
  if (
    order.status !== OrderStatus.PENDING &&
    order.status !== OrderStatus.PROCESSING
  ) {
    // avoid double-charge
    throw new Error(`Order is ${order.status}, cannot pay`);
  }

  const customerId = await getOrCreateStripeCustomer(userId);

  const stripe = await getStripeClient();

  // Create + confirm PaymentIntent (only card; no redirects)
  const pi = await stripe.paymentIntents.create(
    {
      amount: order.totalCents,
      currency: order.currency,
      customer: customerId,
      payment_method: input.paymentMethodId,
      confirmation_method: "automatic",
      confirm: true,
      payment_method_types: ["card"], // or AMP: { enabled:true, allow_redirects:"never" }
      setup_future_usage: input.saveCard ? "off_session" : undefined,
      metadata: { orderId: order.id, userId },
      payment_method_options: { card: { request_three_d_secure: "automatic" } },
    },
    {
      // safety: idempotency for the specific order
      idempotencyKey: `order_pay_${order.id}`,
    }
  );

  // write/update order + payment history (provisional; webhook is source of truth)
  await prisma.order.update({
    where: { id: order.id },
    data: {
      paymentIntent: pi.id,
      payments: {
        create: {
          paymentIntentId: pi.id,
          status: pi.status,
          amountCents: order.totalCents,
          currency: order.currency,
        },
      },
    },
  });

  return {
    outcome: {
      status: pi.status, // may be requires_action
      clientSecret: pi.client_secret ?? undefined,
      paymentIntentId: pi.id,
    },
  };
}

/** (optional) After 3DS, refresh */
export async function refreshPaymentIntentStatusAction(
  paymentIntentId: string
) {
  const stripe = await getStripeClient();

  const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
  const orderId = (pi.metadata?.orderId as string) || undefined;

  if (orderId) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: mapPiStatusToOrder(pi.status) },
    });
    await prisma.payment.updateMany({
      where: { paymentIntentId: paymentIntentId },
      data: { status: pi.status },
    });
  }

  return { status: pi.status };
}

export const getOrderByOrderId = async (orderId: string) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { payments: true, events: true, rider: true },
    });

    if (!order) actionError("Order not found");

    return actionResponse(order);
  } catch (error) {
    console.log("errors", error);
  }
};

export const getMyOrders = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) actionError("Not authenticated");

    // where only delivered and cancelled
    const orders = await prisma.order.findMany({
      where: {
        userId,
        status: { in: [OrderStatus.DELIVERED, OrderStatus.CANCELED] },
      },
      orderBy: { createdAt: "desc" },
    });

    return actionResponse(orders);
  } catch (error) {
    console.log("errors", error);
    return actionError("Failed to get orders");
  }
};

export const getActiveOrders = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) actionError("Not authenticated");

    // where not in (DELIVERED, CANCELLED)
    const orders = await prisma.order.findMany({
      where: {
        userId,
        NOT: {
          status: {
            in: [OrderStatus.DELIVERED, OrderStatus.CANCELED],
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return actionResponse(orders);
  } catch (error) {
    console.log("errors", error);
    return actionError("Failed to get orders");
  }
};

/* ADMIN ACTIONS */

export const getOrders = async ({
  search,
  status,
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  status?: OrderStatus | "ALL";
  page?: number;
  pageSize?: number;
}) => {
  try {
    const where = {
      ...(status && status !== "ALL" && { status }),
      ...(search && { OR: [{ id: { contains: search } }] }),
    };

    const skip = (page - 1) * pageSize;

    const [orders, totalCount] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          payments: true,
          events: true,
          user: {
            omit: { passwordHash: true },
          },
        },
        skip,
        take: pageSize,
      }),
      prisma.order.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return actionResponse({
      orders,
      page,
      pageSize,
      totalCount,
      totalPages,
    });
  } catch (error) {
    console.log("errors", error);
    return actionError("Failed to get orders");
  }
};
