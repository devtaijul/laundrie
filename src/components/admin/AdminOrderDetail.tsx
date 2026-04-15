import { getOrderByOrderId } from "@/actions/order.actions";
import { getAllRider } from "@/actions/rider.actions";
import { Card } from "@/components/ui/card";
import { Suspense } from "react";
import AdminOrderDetailSkeleton from "../skeletons/AdminOrderDetailSkeleton";
import { AdminDetailsHeader } from "./AdminDetailsHeader";
import { OrderDetailsMain } from "./OrderDetailsMain";
import { OrderExtends } from "@/types/global-type";
import { User } from "@/generated/prisma";

const AdminOrderDetail = async ({ id }: { id: string }) => {
  const [orderRes, driversRes] = await Promise.all([
    getOrderByOrderId(id),
    getAllRider("", 1, 100),
  ]);

  if (!orderRes?.success || !orderRes.data) {
    return (
      <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-background/95 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Order not found</p>
        </Card>
      </div>
    );
  }

  const order = orderRes.data as OrderExtends;
  const drivers = (driversRes?.data ?? []) as Omit<User, "passwordHash">[];

  return (
    <Suspense fallback={<AdminOrderDetailSkeleton />}>
      <div className="p-4 lg:p-6 space-y-6">
        <AdminDetailsHeader
          orderId={order.orderId}
          status={order.status}
          createdAt={order.createdAt}
        />
        <OrderDetailsMain order={order} drivers={drivers} />
      </div>
    </Suspense>
  );
};

export default AdminOrderDetail;
