import { Suspense } from "react";
import { OrderStatus } from "@/generated/prisma";
import { OrderStatusTab } from "./OrderStatusTab";
import { OrderTable } from "./OrderTable";
import { OrdersTableSkeleton } from "../skeletons/OrdersTableSkeleton";
import { OrderSearchBar } from "./OrderSearchBar";

const AdminOrders = async ({
  search,
  status = "ALL",
  page,
}: {
  search?: string;
  status?: OrderStatus | "ALL";
  page?: number;
}) => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Monitor and manage all customer orders in one place.
        </p>
      </div>

      {/* Filters row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Status tabs — scrollable on mobile */}
        <div className="overflow-x-auto pb-1 -mb-1">
          <OrderStatusTab currentStatus={status} />
        </div>

        {/* Search */}
        <OrderSearchBar currentSearch={search} currentStatus={status} />
      </div>

      {/* Table / Cards */}
      <Suspense fallback={<OrdersTableSkeleton />}>
        <OrderTable status={status} search={search} page={page} />
      </Suspense>
    </div>
  );
};

export default AdminOrders;
