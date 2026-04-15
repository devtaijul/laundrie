import type { Metadata } from "next";
import OrderSuccessClient from "@/components/order/OrderSuccessClient";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Laundrie order has been placed successfully.",
  robots: { index: false, follow: false },
};

export default function OrderSuccess() {
  return <OrderSuccessClient />;
}
