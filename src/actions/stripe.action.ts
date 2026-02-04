"use server";

import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

// helper: নিশ্চিত করুন user-এর stripeCustomer আছে
export async function getOrCreateStripeCustomer(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email: user.email || undefined,
    name: user.firstName + " " + user.lastName || undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

// PaymentIntent তৈরি (orderId metadata-সহ)
export async function createPaymentIntentAction(input: {
  amountCents: number;
  orderId: string;
  saveCard?: boolean;
  customerId?: string; // থাকলে দিন
}) {
  const { amountCents, orderId, saveCard, customerId } = input;

  if (!amountCents || amountCents < 50) {
    throw new Error("Invalid amount");
  }
  if (!orderId) throw new Error("orderId missing");

  const pi = await stripe.paymentIntents.create({
    amount: Math.floor(amountCents),
    currency: "eur",
    customer: customerId, // optional
    payment_method_types: ["card"],
    automatic_payment_methods: { enabled: true },
    metadata: { orderId },
    ...(saveCard ? { setup_future_usage: "off_session" } : {}),
  });

  return { clientSecret: pi.client_secret!, paymentIntentId: pi.id };
}

// চাইলে cancel করতেও পারবেন
export async function cancelPaymentIntentAction(paymentIntentId: string) {
  const pi = await stripe.paymentIntents.cancel(paymentIntentId);
  return { status: pi.status };
}

// রিফান্ড (chargeId লাগবে)
export async function refundChargeAction(input: {
  chargeId: string;
  amountCents?: number; // partial refund হলে
}) {
  const refund = await stripe.refunds.create({
    charge: input.chargeId,
    amount: input.amountCents,
  });
  return { refundId: refund.id, status: refund.status };
}
