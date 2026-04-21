import {
  getDashboardStats,
  getDashboardChart,
  getRecentOrders,
} from "@/actions/dashboard.actions";
import { periodLabel, type DashboardPeriod } from "@/lib/dashboard-period";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardChart } from "@/components/admin/DashboardChart";
import { DashboardPeriodSelector } from "@/components/admin/DashboardPeriodSelector";
import { formatMoney } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/generated/prisma";
import {
  TrendingUp,
  TrendingDown,
  Package,
  CheckCircle2,
  DollarSign,
  Users,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const STATUS_STYLE: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  PICKUP_SCHEDULED: "bg-cyan-100 text-cyan-700",
  PICKED_UP: "bg-indigo-100 text-indigo-700",
  WASHING: "bg-sky-100 text-sky-700",
  DELIVERY_SCHEDULED: "bg-orange-100 text-orange-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELED: "bg-red-100 text-red-700",
  FAILED: "bg-red-100 text-red-700",
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  PENDING: "Pending",
  PROCESSING: "Confirmed",
  PICKUP_SCHEDULED: "Pickup Scheduled",
  PICKED_UP: "Picked Up",
  WASHING: "Washing",
  DELIVERY_SCHEDULED: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELED: "Cancelled",
  FAILED: "Failed",
};

function Trend({ value, suffix }: { value: number; suffix: string }) {
  const up = value >= 0;
  return (
    <div
      className={cn(
        "flex items-center gap-1 text-xs",
        up ? "text-green-600" : "text-destructive",
      )}
    >
      {up ? (
        <TrendingUp className="h-3.5 w-3.5" />
      ) : (
        <TrendingDown className="h-3.5 w-3.5" />
      )}
      <span className="font-medium">{Math.abs(value)}%</span>
      <span className="text-muted-foreground">{suffix}</span>
    </div>
  );
}

const AdminDashboard = async ({ period }: { period: DashboardPeriod }) => {
  const [statsRes, chartRes, ordersRes] = await Promise.all([
    getDashboardStats(period),
    getDashboardChart(period),
    getRecentOrders(8),
  ]);

  const stats = statsRes.success && statsRes.data ? statsRes.data : null;
  const chartData = chartRes.success && chartRes.data ? chartRes.data : [];
  const recentOrders =
    ordersRes.success && ordersRes.data ? ordersRes.data : [];

  const label = periodLabel(period);

  const chartTitle =
    period.mode === "day"
      ? `Orders on ${label} (by hour)`
      : period.mode === "month"
        ? `Orders in ${label} (by day)`
        : `Orders in ${label} (by month)`;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header + period selector */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Showing data for{" "}
            <span className="font-medium text-foreground">{label}</span>
          </p>
        </div>
        <DashboardPeriodSelector period={period} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <div className="p-2 rounded-lg bg-primary/10">
                <Package className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats?.orders ?? 0}</p>
            <Trend
              value={stats?.ordersVsPrev ?? 0}
              suffix={stats?.trendSuffix ?? ""}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Delivered</p>
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats?.delivered ?? 0}</p>
            <Trend
              value={stats?.deliveredVsPrev ?? 0}
              suffix={stats?.trendSuffix ?? ""}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Revenue</p>
              <div className="p-2 rounded-lg bg-amber-100">
                <DollarSign className="h-4 w-4 text-amber-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">
              {formatMoney((stats?.revenueCents ?? 0) / 100)}
            </p>
            <Trend
              value={stats?.revenueVsPrev ?? 0}
              suffix={stats?.trendSuffix ?? ""}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">New Customers</p>
              <div className="p-2 rounded-lg bg-blue-100">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold">{stats?.customers ?? 0}</p>
            <Trend
              value={stats?.customersVsPrev ?? 0}
              suffix={stats?.trendSuffix ?? ""}
            />
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-base">{chartTitle}</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-primary inline-block" />
                <span className="text-xs text-muted-foreground">Orders</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-amber-400 inline-block" />
                <span className="text-xs text-muted-foreground">Delivered</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DashboardChart data={chartData} />
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/orders" className="text-primary gap-1">
              See all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">
              No orders yet.
            </p>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {[
                        "Order ID",
                        "Customer",
                        "Date",
                        "Payment",
                        "Amount",
                        "Status",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {recentOrders.map((order) => {
                      const paymentStatus =
                        order.payments?.[0]?.status ?? null;
                      const customerName =
                        order.user?.name ||
                        `${order.user?.firstName ?? ""} ${order.user?.lastName ?? ""}`.trim() ||
                        "Unknown";
                      const initials = customerName
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2);

                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono text-xs font-medium">
                            <Link
                              href={`/admin/orders/${order.id}`}
                              className="hover:text-primary"
                            >
                              {order.orderId}
                            </Link>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-7 w-7 shrink-0">
                                <AvatarImage
                                  src={order.user?.image ?? undefined}
                                />
                                <AvatarFallback className="text-xs">
                                  {initials}
                                </AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="font-medium truncate">
                                  {customerName}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {order.user?.email ??
                                    order.user?.phone ??
                                    "—"}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {paymentStatus === "succeeded" ? (
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs">
                                Paid
                              </Badge>
                            ) : paymentStatus ? (
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 text-xs capitalize">
                                {paymentStatus}
                              </Badge>
                            ) : (
                              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">
                                Unpaid
                              </Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 font-semibold whitespace-nowrap">
                            {formatMoney(order.totalCents, true)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={cn(
                                "border-0 text-xs whitespace-nowrap",
                                STATUS_STYLE[order.status],
                              )}
                            >
                              {STATUS_LABEL[order.status]}
                            </Badge>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-border">
                {recentOrders.map((order) => {
                  const paymentStatus = order.payments?.[0]?.status ?? null;
                  const customerName =
                    order.user?.name ||
                    `${order.user?.firstName ?? ""} ${order.user?.lastName ?? ""}`.trim() ||
                    "Unknown";
                  const initials = customerName
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <div key={order.id} className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="font-mono text-xs font-semibold hover:text-primary"
                        >
                          {order.orderId}
                        </Link>
                        <Badge
                          className={cn(
                            "border-0 text-xs",
                            STATUS_STYLE[order.status],
                          )}
                        >
                          {STATUS_LABEL[order.status]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="h-7 w-7 shrink-0">
                          <AvatarImage src={order.user?.image ?? undefined} />
                          <AvatarFallback className="text-xs">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {customerName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {order.user?.email ?? order.user?.phone ?? "—"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" },
                          )}
                        </span>
                        <div className="flex items-center gap-2">
                          {paymentStatus === "succeeded" ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0 text-xs">
                              Paid
                            </Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-0 text-xs">
                              Unpaid
                            </Badge>
                          )}
                          <span className="font-semibold">
                            {formatMoney(order.totalCents, true)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
