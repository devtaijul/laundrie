import { Suspense } from "react";
import AdminFinance from "@/components/admin/AdminFinance";
import { OrdersTableSkeleton } from "@/components/skeletons/OrdersTableSkeleton";

type StatusFilter = "all" | "succeeded" | "canceled" | "processing";

export default async function FinancePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>;
}) {
  const { search = "", status = "all", page = "1" } = await searchParams;

  const safeStatus: StatusFilter =
    status === "succeeded" || status === "canceled" || status === "processing"
      ? status
      : "all";

  const safePage = Math.max(1, parseInt(page, 10) || 1);

  return (
    <Suspense fallback={<OrdersTableSkeleton />}>
      <AdminFinance search={search} status={safeStatus} page={safePage} />
    </Suspense>
  );
}
