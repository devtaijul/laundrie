import {
  getFinanceStats,
  getMonthlyRevenue,
  getPayments,
} from "@/actions/finance.actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pagination } from "@/components/admin/Pagination";
import { FinanceFilters } from "@/components/admin/FinanceFilters";
import { RevenueChart } from "@/components/admin/RevenueChart";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import {
  CreditCard,
  TrendingUp,
  XCircle,
  Clock,
  Banknote,
} from "lucide-react";

type StatusFilter = "all" | "succeeded" | "canceled" | "processing";

const PAGE_SIZE = 10;

const statusBadge = (status: string) => {
  if (status === "succeeded")
    return (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
        Succeeded
      </Badge>
    );
  if (status === "canceled")
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
        Canceled
      </Badge>
    );
  return (
    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0">
      Processing
    </Badge>
  );
};

const AdminFinance = async ({
  search = "",
  status = "all",
  page = 1,
}: {
  search?: string;
  status?: StatusFilter;
  page?: number;
}) => {
  const [statsRes, chartRes, paymentsRes] = await Promise.all([
    getFinanceStats(),
    getMonthlyRevenue(),
    getPayments({ search, status, page, pageSize: PAGE_SIZE }),
  ]);

  const stats =
    statsRes.success && statsRes.data
      ? statsRes.data
      : {
          totalRevenueCents: 0,
          totalPaid: 0,
          totalFailed: 0,
          totalProcessing: 0,
        };

  const chartData =
    chartRes.success && chartRes.data ? chartRes.data : [];

  const payments =
    paymentsRes.success && paymentsRes.data
      ? paymentsRes.data.payments
      : [];
  const totalPages =
    paymentsRes.success && paymentsRes.data
      ? paymentsRes.data.totalPages
      : 1;
  const totalCount =
    paymentsRes.success && paymentsRes.data
      ? paymentsRes.data.totalCount
      : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground">
          Monitor payments and revenue
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Banknote className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">
                {formatMoney(stats.totalRevenueCents / 100)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-green-100">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Succeeded Payments
              </p>
              <p className="text-2xl font-bold">{stats.totalPaid}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Processing</p>
              <p className="text-2xl font-bold">{stats.totalProcessing}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-start gap-4">
            <div className="p-2 rounded-lg bg-red-100">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Canceled</p>
              <p className="text-2xl font-bold">{stats.totalFailed}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Revenue ({new Date().getFullYear()})</CardTitle>
        </CardHeader>
        <CardContent>
          <RevenueChart data={chartData} />
        </CardContent>
      </Card>

      {/* Filters */}
      <FinanceFilters currentSearch={search} currentStatus={status} />

      {/* Table */}
      {payments.length === 0 ? (
        <Card className="p-12 flex flex-col items-center gap-3 text-center">
          <CreditCard className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-medium text-muted-foreground">
            No payments found
          </p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search or filter.
          </p>
        </Card>
      ) : (
        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Payment ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-muted-foreground truncate max-w-[140px]">
                      {p.paymentIntentId}
                    </td>
                    <td className="py-3 px-4 font-medium">
                      {p.order?.orderId ?? "—"}
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div>
                        <p className="font-medium">{p.order?.user?.name ?? "—"}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.order?.user?.email ?? ""}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                      {format(new Date(p.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {formatMoney(p.amountCents / 100)}
                    </td>
                    <td className="py-3 px-4">{statusBadge(p.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-2 border-t border-border text-xs text-muted-foreground">
            {totalCount} payment{totalCount !== 1 ? "s" : ""} total
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/admin/finance"
            search={search}
            status={status !== "all" ? status : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default AdminFinance;
