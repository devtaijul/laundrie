import { getCustomerById } from "@/actions/customer.actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomerBanButton } from "@/components/admin/CustomerBanButton";
import { PAGES } from "@/config/pages.config";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  ShoppingBag,
  Wallet,
  Gift,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

const ORDER_STATUS_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-blue-100 text-blue-700",
  },
  PICKUP_SCHEDULED: {
    label: "Pickup Scheduled",
    className: "bg-indigo-100 text-indigo-700",
  },
  PICKED_UP: {
    label: "Picked Up",
    className: "bg-purple-100 text-purple-700",
  },
  WASHING: {
    label: "Washing",
    className: "bg-cyan-100 text-cyan-700",
  },
  DELIVERY_SCHEDULED: {
    label: "Delivery Scheduled",
    className: "bg-orange-100 text-orange-700",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
  },
  FAILED: {
    label: "Failed",
    className: "bg-red-100 text-red-700",
  },
  CANCELED: {
    label: "Canceled",
    className: "bg-gray-100 text-gray-700",
  },
};

const AdminCustomerDetail = async ({ id }: { id: string }) => {
  const res = await getCustomerById(id);

  if (!res.success || !res.data) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href={PAGES.ADMIN.CUSTOMERS}>
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <p className="text-muted-foreground">Customer not found.</p>
        </div>
      </div>
    );
  }

  const customer = res.data;
  const isBanned = !!customer.bannedAt;

  const initials = (customer.name || "?")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const completedOrders = customer.orders.filter(
    (o: { status: string }) => o.status === "DELIVERED"
  ).length;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="shrink-0">
          <Link href={PAGES.ADMIN.CUSTOMERS}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground truncate">
            Customer Details
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage account and view order history
          </p>
        </div>
      </div>

      {/* ── Profile card ───────────────────────────────────────── */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <Avatar className="h-20 w-20 shrink-0">
              <AvatarFallback className="text-2xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{customer.name}</h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {customer.useType?.toLowerCase() ?? "personal"} account
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {isBanned ? (
                    <Badge className="bg-red-100 text-red-700 border-0">
                      Banned
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 border-0">
                      Active
                    </Badge>
                  )}
                  <CustomerBanButton
                    customerId={customer.id}
                    isBanned={isBanned}
                    variant="outline"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                {customer.email && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>
                    Joined {format(new Date(customer.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {isBanned && customer.bannedAt && (
                <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>
                    Banned on{" "}
                    {format(new Date(customer.bannedAt), "MMM d, yyyy 'at' HH:mm")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Stats ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 shrink-0">
                <ShoppingBag className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{customer.totalOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-green-500/10 shrink-0">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedOrders}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
                <Wallet className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Spent</p>
                <p className="text-2xl font-bold">
                  {formatMoney(customer.totalSpentCents / 100)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 shrink-0">
                <Gift className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ref. Credits</p>
                <p className="text-2xl font-bold">
                  {formatMoney(customer.referralCreditCents / 100)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Orders history ─────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Order History ({customer.totalOrders})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {customer.orders.length === 0 ? (
            <p className="text-sm text-muted-foreground px-6 pb-6">
              No orders yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                      Address
                    </th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customer.orders.map(
                    (order: {
                      id: string;
                      orderId: string;
                      status: string;
                      totalCents: number;
                      createdAt: Date;
                      pickupAddress: string | null;
                    }) => {
                      const statusStyle =
                        ORDER_STATUS_STYLES[order.status] ??
                        ORDER_STATUS_STYLES.PENDING;
                      return (
                        <tr
                          key={order.id}
                          className="hover:bg-muted/30 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <Link
                              href={PAGES.ADMIN.ORDER_VIEW(order.id)}
                              className="font-medium text-primary hover:underline"
                            >
                              {order.orderId}
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground hidden sm:table-cell whitespace-nowrap">
                            {format(
                              new Date(order.createdAt),
                              "MMM d, yyyy"
                            )}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                            {order.pickupAddress ?? "—"}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              className={`${statusStyle.className} border-0 text-xs`}
                            >
                              {statusStyle.label}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">
                            {formatMoney(order.totalCents / 100)}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCustomerDetail;
