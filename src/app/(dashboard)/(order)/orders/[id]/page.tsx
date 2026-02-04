import { getOrderByOrderId } from "@/actions/order.actions";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { OrderDetailsServer } from "@/components/order/OrderDetailsServer";
import OrderDetailsSkeleton from "@/components/skeletons/OrderDetailsSkeleton";
import { Suspense } from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  getOrderByOrderId(id);

  return (
    <div className="min-h-screen  py-20">
      {/* Header */}
      <TopNavigation title="Order Details" />

      {/* Content */}
      <Suspense fallback={<OrderDetailsSkeleton />}>
        <OrderDetailsServer orderId={id} />
      </Suspense>

      <BottomNavigation />
    </div>
  );
};

export default page;
