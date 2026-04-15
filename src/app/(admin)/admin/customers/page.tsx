import { Suspense } from "react";
import AdminCustomers from "@/components/admin/AdminCustomers";
import { OrdersTableSkeleton } from "@/components/skeletons/OrdersTableSkeleton";

type StatusFilter = "all" | "active" | "banned";

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}) {
  const { search = "", status = "all", page = "1" } = await searchParams;

  const safeStatus: StatusFilter =
    status === "active" || status === "banned" ? status : "all";

  const safePage = Math.max(1, parseInt(page, 10) || 1);

  return (
    <Suspense fallback={<OrdersTableSkeleton />}>
      <AdminCustomers
        search={search}
        status={safeStatus}
        page={safePage}
      />
    </Suspense>
  );
}
