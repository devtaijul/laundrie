import { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { OrdersTableSkeleton } from "@/components/skeletons/OrdersTableSkeleton";
import type { DashboardPeriod } from "@/lib/dashboard-period";
import { format } from "date-fns";

function parsePeriod(params: {
  mode?: string;
  date?: string;
  month?: string;
  year?: string;
}): DashboardPeriod {
  const now = new Date();
  const mode = params.mode;

  if (mode === "day") {
    const date =
      params.date && /^\d{4}-\d{2}-\d{2}$/.test(params.date)
        ? params.date
        : format(now, "yyyy-MM-dd");
    return { mode: "day", date };
  }

  if (mode === "year") {
    const year = Number(params.year);
    return { mode: "year", year: year >= 2020 && year <= 2030 ? year : now.getFullYear() };
  }

  // default: month
  const year = Number(params.year);
  const month = Number(params.month);
  return {
    mode: "month",
    year: year >= 2020 && year <= 2030 ? year : now.getFullYear(),
    month: month >= 1 && month <= 12 ? month : now.getMonth() + 1,
  };
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: string;
    date?: string;
    month?: string;
    year?: string;
  }>;
}) {
  const params = await searchParams;
  const period = parsePeriod(params);

  return (
    <Suspense fallback={<OrdersTableSkeleton />}>
      <AdminDashboard period={period} />
    </Suspense>
  );
}
