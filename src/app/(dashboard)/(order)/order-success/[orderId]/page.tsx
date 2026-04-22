import type { Metadata } from "next";
import { getOrderByOrderId } from "@/actions/order.actions";
import { SuccessOrderPage } from "@/components/order/SuccessOrderPage";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Laundrie order has been placed successfully.",
  robots: { index: false, follow: false },
};

const OrderSuccess = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;
  const response = await getOrderByOrderId(orderId);

  if (!response?.success || !response.data) {
    notFound();
  }

  const order = response.data;

  return (
    <SuccessOrderPage
      urlOrderId={orderId}
      order={{
        id: order.id,
        orderId: order.orderId,
        createdAt: order.createdAt,
        totalCents: order.totalCents,
        deliverySpeed: order.deliverySpeed,
        status: order.status,
      }}
    />
  );
};

export default OrderSuccess;
