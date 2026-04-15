import { getOrders } from "@/actions/order.actions";
import { OrderStatus } from "@/generated/prisma";
import { OrderExtends } from "@/types/global-type";
import { Card } from "../ui/card";
import { OrderCard, OrderRow } from "./OrderRow";
import { Pagination } from "./Pagination";
import { Package } from "lucide-react";

export const OrderTable = async ({
  status,
  search,
  page = 1,
  pageSize = 10,
}: {
  status?: OrderStatus | "ALL";
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  const res = await getOrders({ search, status, page, pageSize });

  if (!res?.success) {
    return (
      <Card className="p-6 mt-4">
        <p className="text-sm text-muted-foreground">Failed to load orders.</p>
      </Card>
    );
  }

  const { orders, totalPages } = res.data as {
    orders: OrderExtends[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };

  if (orders.length === 0) {
    return (
      <Card className="p-12 mt-4 flex flex-col items-center gap-3 text-center">
        <Package className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm font-medium text-muted-foreground">
          No orders found
        </p>
        <p className="text-xs text-muted-foreground">
          Try adjusting your search or filter.
        </p>
      </Card>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {/* ── Desktop table (md+) ─────────────────────────────────────── */}
      <div className="hidden md:block border border-border rounded-xl bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                  Order ID
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Items
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Payment
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order as OrderExtends} />
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/admin/orders"
          search={search}
          status={status}
        />
      </div>

      {/* ── Mobile card list (< md) ─────────────────────────────────── */}
      <div className="md:hidden space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order as OrderExtends} />
        ))}

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          basePath="/admin/orders"
          search={search}
          status={status}
        />
      </div>
    </div>
  );
};
