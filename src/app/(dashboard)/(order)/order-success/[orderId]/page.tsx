import { CheckCircle } from "lucide-react";

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
