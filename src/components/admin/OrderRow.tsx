"use client";

import { OrderExtends } from "@/types/global-type";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Eye, MoreHorizontal, Copy, WashingMachine } from "lucide-react";
import { formatDate, formatMoney } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@/generated/prisma";

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

const PAYMENT_STYLE: Record<string, string> = {
  succeeded: "bg-green-100 text-green-700",
  processing: "bg-blue-100 text-blue-700",
  requires_payment_method: "bg-red-100 text-red-700",
};

function copyToClipboard(text: string, label: string) {
  navigator.clipboard.writeText(text);
  toast.success(`${label} copied`);
}

/* ─── Desktop table row ─────────────────────────────────────────────────── */
export const OrderRow = ({ order }: { order: OrderExtends }) => {
  const router = useRouter();
  const detailUrl = `/admin/orders/${order.id}`;

  const paymentStatus = order.payments?.[0]?.status ?? null;
  const customerName =
    (order.user?.name ??
      `${order.user?.firstName ?? ""} ${order.user?.lastName ?? ""}`.trim()) ||
    "Unknown";
  const initials = customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalOversized =
    (order.oversizedItems ?? 0) +
    (order.pillowItems ?? 0) +
    (order.duvetItems ?? 0);

  return (
    <tr className="border-b border-border hover:bg-muted/40 transition-colors group">
      {/* Order ID */}
      <td className="py-3 px-4">
        <span className="text-sm font-mono font-medium text-foreground">
          {order.orderId}
        </span>
      </td>

      {/* Customer */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage src={order.user?.image ?? undefined} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {customerName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {order.user?.email ?? order.user?.phone ?? "—"}
            </p>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
        {formatDate(order.createdAt)}
      </td>

      {/* Items */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <WashingMachine className="h-3.5 w-3.5 shrink-0" />
          <span>
            {order.machineCount ?? 1}
            {totalOversized > 0 ? ` + ${totalOversized} oversized` : ""}
          </span>
        </div>
      </td>

      {/* Payment */}
      <td className="py-3 px-4">
        {paymentStatus ? (
          <Badge
            className={cn(
              "hover:opacity-100 capitalize text-xs",
              PAYMENT_STYLE[paymentStatus] ?? "bg-gray-100 text-gray-700",
            )}
          >
            {paymentStatus === "succeeded" ? "Paid" : paymentStatus}
          </Badge>
        ) : (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
            Unpaid
          </Badge>
        )}
      </td>

      {/* Amount */}
      <td className="py-3 px-4 text-sm font-semibold text-foreground whitespace-nowrap">
        {formatMoney(order.totalCents, true)}
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <Badge
          className={cn(
            "hover:opacity-100 text-xs whitespace-nowrap",
            STATUS_STYLE[order.status],
          )}
        >
          {STATUS_LABEL[order.status]}
        </Badge>
      </td>

      {/* Actions — inline on desktop */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-7 px-3 text-xs"
            onClick={() => router.push(detailUrl)}
          >
            <Eye className="h-3.5 w-3.5 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 px-2 text-xs text-muted-foreground"
            onClick={() => copyToClipboard(order.orderId, "Order ID")}
          >
            <Copy className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

/* ─── Mobile card ───────────────────────────────────────────────────────── */
export const OrderCard = ({ order }: { order: OrderExtends }) => {
  const router = useRouter();
  const detailUrl = `/admin/orders/${order.id}`;

  const paymentStatus = order.payments?.[0]?.status ?? null;
  const customerName =
    (order.user?.name ??
      `${order.user?.firstName ?? ""} ${order.user?.lastName ?? ""}`.trim()) ||
    "Unknown";
  const initials = customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const totalOversized =
    (order.oversizedItems ?? 0) +
    (order.pillowItems ?? 0) +
    (order.duvetItems ?? 0);

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      {/* Top row: order ID + status + dropdown */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm font-mono font-semibold text-foreground truncate">
            {order.orderId}
          </span>
          <Badge
            className={cn(
              "hover:opacity-100 text-xs shrink-0",
              STATUS_STYLE[order.status],
            )}
          >
            {STATUS_LABEL[order.status]}
          </Badge>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push(detailUrl)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => copyToClipboard(order.orderId, "Order ID")}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Order ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Customer row */}
      <div className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={order.user?.image ?? undefined} />
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {customerName}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {order.user?.email ?? order.user?.phone ?? "—"}
          </p>
        </div>
      </div>

      {/* Bottom row: date, items, payment, amount */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span>{formatDate(order.createdAt)}</span>
          <span className="flex items-center gap-1">
            <WashingMachine className="h-3 w-3" />
            {order.machineCount ?? 1}
            {totalOversized > 0 ? ` +${totalOversized}` : ""}
          </span>
          {paymentStatus ? (
            <Badge
              className={cn(
                "hover:opacity-100 text-xs",
                PAYMENT_STYLE[paymentStatus] ?? "bg-gray-100 text-gray-700",
              )}
            >
              {paymentStatus === "succeeded" ? "Paid" : paymentStatus}
            </Badge>
          ) : (
            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 text-xs">
              Unpaid
            </Badge>
          )}
        </div>
        <span className="text-sm font-semibold text-foreground shrink-0">
          {formatMoney(order.totalCents, true)}
        </span>
      </div>
    </div>
  );
};
