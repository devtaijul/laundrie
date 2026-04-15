import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your Laundrie order has been placed successfully.",
  robots: { index: false, follow: false },
};

import { SuccessRedirect } from "@/components/order/order-success/SuccessRedirect";
import { getOrderByOrderId } from "@/actions/order.actions";
import { Suspense } from "react";
import OrderSuccessSkeleton from "@/components/skeletons/OrderSuccessSkeleton";
import { SuccessOrderPage } from "@/components/order/SuccessOrderPage";

const OrderSuccess = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = await params;

  const response = await getOrderByOrderId(orderId);

  return (
    <Suspense fallback={<OrderSuccessSkeleton />}>
      <SuccessOrderPage />
    </Suspense>
  );
};

export default OrderSuccess;
