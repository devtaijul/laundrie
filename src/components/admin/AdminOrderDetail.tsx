import { getOrderByOrderId } from "@/actions/order.actions";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import AdminOrderDetailSkeleton from "../skeletons/AdminOrderDetailSkeleton";
import { AdminDetailsHeader } from "./AdminDetailsHeader";
import { OrderDetailsMain } from "./OrderDetailsMain";
import { OrderExtends } from "@/types/global-type";

const AdminOrderDetail = async ({ id }: { id: string }) => {
  const res = await getOrderByOrderId(id);

  if (!res?.success) {
    return (
      <div className="px-4 py-6 -mt-4 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-background/95 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Order not found</p>
        </Card>
      </div>
    );
  }

  const order = res.data;

  return (
    <Suspense fallback={<AdminOrderDetailSkeleton />}>
      <div className="p-4 lg:p-6 space-y-6">
        {/* Header */}
        <AdminDetailsHeader />

        <OrderDetailsMain order={order as OrderExtends } />
      </div>
    </Suspense>
  );
};

export default AdminOrderDetail;
