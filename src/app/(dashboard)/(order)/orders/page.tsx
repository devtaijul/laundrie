import type { Metadata } from "next";
import { getMyOrders } from "@/actions/order.actions";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track all your Laundrie orders.",
};
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { MyOrders } from "@/components/order/MyOrders";
import { MyOrdersSkeleton } from "@/components/skeletons/MyOrdersSkeleton";
import { Suspense } from "react";

export default async function OrdersPage() {
  // Mock orders data

  getMyOrders();

  return (
    <div className="min-h-screen  pb-20">
      {/* Header */}
      <TopNavigation title="Orders" />

      {/* Content */}
      <Suspense fallback={<MyOrdersSkeleton />}>
        <MyOrders />
      </Suspense>

      <BottomNavigation />
    </div>
  );
}
