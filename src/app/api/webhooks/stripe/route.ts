// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // raw body দরকার
export const dynamic = "force-dynamic"; // vercel edge-cache এড়াতে

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      // TODO: আপনার অর্ডার DB -> paid=true, amount=pi.amount, paymentIntentId=pi.id
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      // TODO: অর্ডার স্ট্যাটাস আপডেট/লগ
      break;
    }
    // প্রয়োজন হলে আরও কেস যোগ করুন
  }

  return NextResponse.json({ received: true });
}
