"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Loader2,
  ShoppingBag,
  Truck,
  WashingMachine,
  PackageCheck,
  Star,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderStatus, OrderEventType } from "@/generated/prisma";
import { updateOrderStatus, logCleaningEvent } from "@/actions/admin.order.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// The linear progression steps
const STATUS_STEPS: {
  status: OrderStatus;
  label: string;
  icon: React.ReactNode;
}[] = [
  { status: OrderStatus.PENDING,            label: "Order Placed",      icon: <ShoppingBag className="h-4 w-4" /> },
  { status: OrderStatus.PROCESSING,         label: "Confirmed",         icon: <CheckCircle2 className="h-4 w-4" /> },
  { status: OrderStatus.PICKUP_SCHEDULED,   label: "Pickup Scheduled",  icon: <Truck className="h-4 w-4" /> },
  { status: OrderStatus.PICKED_UP,          label: "Picked Up",         icon: <PackageCheck className="h-4 w-4" /> },
  { status: OrderStatus.WASHING,            label: "Washing",           icon: <WashingMachine className="h-4 w-4" /> },
  { status: OrderStatus.DELIVERY_SCHEDULED, label: "Out for Delivery",  icon: <Truck className="h-4 w-4" /> },
  { status: OrderStatus.DELIVERED,          label: "Delivered",         icon: <Star className="h-4 w-4" /> },
];

const STEP_INDEX: Partial<Record<OrderStatus, number>> = {
  [OrderStatus.PENDING]:            0,
  [OrderStatus.PROCESSING]:         1,
  [OrderStatus.PICKUP_SCHEDULED]:   2,
  [OrderStatus.PICKED_UP]:          3,
  [OrderStatus.WASHING]:            4,
  [OrderStatus.DELIVERY_SCHEDULED]: 5,
  [OrderStatus.DELIVERED]:          6,
};

// What the admin can do at each status
const NEXT_ACTION: Partial<Record<
  OrderStatus,
  { label: string; next: OrderStatus; requiresDriver?: boolean }
>> = {
  [OrderStatus.PENDING]: {
    label: "Confirm Order",
    next: OrderStatus.PROCESSING,
  },
  [OrderStatus.PROCESSING]: {
    label: "Schedule Pickup",
    next: OrderStatus.PICKUP_SCHEDULED,
    requiresDriver: true,
  },
  [OrderStatus.PICKUP_SCHEDULED]: {
    label: "Mark as Picked Up",
    next: OrderStatus.PICKED_UP,
  },
  [OrderStatus.PICKED_UP]: {
    label: "Start Washing",
    next: OrderStatus.WASHING,
  },
  [OrderStatus.WASHING]: {
    label: "Schedule Delivery",
    next: OrderStatus.DELIVERY_SCHEDULED,
  },
  [OrderStatus.DELIVERY_SCHEDULED]: {
    label: "Mark as Delivered",
    next: OrderStatus.DELIVERED,
  },
};

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    className: "bg-yellow-100 text-yellow-700",
  },
  [OrderStatus.PROCESSING]: {
    label: "Confirmed",
    className: "bg-blue-100 text-blue-700",
  },
  [OrderStatus.PICKUP_SCHEDULED]: {
    label: "Pickup Scheduled",
    className: "bg-cyan-100 text-cyan-700",
  },
  [OrderStatus.PICKED_UP]: {
    label: "Picked Up",
    className: "bg-purple-100 text-purple-700",
  },
  [OrderStatus.WASHING]: {
    label: "Washing",
    className: "bg-sky-100 text-sky-700",
  },
  [OrderStatus.DELIVERY_SCHEDULED]: {
    label: "Out for Delivery",
    className: "bg-orange-100 text-orange-700",
  },
  [OrderStatus.DELIVERED]: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
  },
  [OrderStatus.CANCELED]: {
    label: "Cancelled",
    className: "bg-red-100 text-red-700",
  },
  [OrderStatus.FAILED]: {
    label: "Failed",
    className: "bg-red-100 text-red-700",
  },
};

const TERMINAL = new Set([OrderStatus.DELIVERED, OrderStatus.CANCELED, OrderStatus.FAILED]);

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  hasDriver: boolean;
  /** Cleaning events already logged for this order */
  cleaningStarted: boolean;
  cleaningDone: boolean;
}

export const OrderStatusManager = ({
  orderId,
  currentStatus,
  hasDriver,
  cleaningStarted,
  cleaningDone,
}: Props) => {
  const [loading, setLoading] = useState<string | null>(null);

  const currentIndex = STEP_INDEX[currentStatus] ?? 0;
  const nextAction = NEXT_ACTION[currentStatus];
  const badge = STATUS_BADGE[currentStatus];
  const isTerminal = TERMINAL.has(currentStatus);

  async function advance() {
    if (!nextAction) return;
    if (nextAction.requiresDriver && !hasDriver) {
      toast.error("Please assign a driver before scheduling pickup.");
      return;
    }
    setLoading("advance");
    const res = await updateOrderStatus(orderId, nextAction.next);
    if (res.success) {
      toast.success(`Status updated to: ${STATUS_BADGE[nextAction.next].label}`);
    } else {
      toast.error(res.error ?? "Failed to update status");
    }
    setLoading(null);
  }

  async function cancel() {
    setLoading("cancel");
    const res = await updateOrderStatus(orderId, OrderStatus.CANCELED, "Cancelled by admin");
    if (res.success) {
      toast.success("Order cancelled");
    } else {
      toast.error(res.error ?? "Failed to cancel order");
    }
    setLoading(null);
  }

  async function logCleaning(
    type: OrderEventType.CLEANING_STARTED | OrderEventType.CLEANING_DONE,
  ) {
    setLoading(type);
    const res = await logCleaningEvent(orderId, type);
    if (res.success) {
      toast.success(type === OrderEventType.CLEANING_STARTED ? "Cleaning started" : "Cleaning complete");
    } else {
      toast.error(res.error ?? "Failed to log event");
    }
    setLoading(null);
  }

  return (
    <div className="space-y-5">
      {/* Current status badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Current Status:</span>
        <Badge className={cn("hover:opacity-100", badge.className)}>
          {badge.label}
        </Badge>
      </div>

      {/* Status stepper */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />

        <div className="space-y-4">
          {STATUS_STEPS.map((step, i) => {
            const isDone = i < currentIndex;
            const isCurrent = i === currentIndex;
            const isPending = i > currentIndex;

            return (
              <div key={step.status} className="flex items-center gap-3 relative">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center z-10 flex-shrink-0",
                    isDone && "bg-green-500 text-white",
                    isCurrent && "bg-primary text-white ring-4 ring-primary/20",
                    isPending && "bg-muted text-muted-foreground border border-border",
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : isCurrent ? (
                    step.icon
                  ) : (
                    <Circle className="h-4 w-4" />
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    isDone && "text-foreground font-medium",
                    isCurrent && "text-foreground font-semibold",
                    isPending && "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}

          {/* Cancelled / Failed states */}
          {(currentStatus === OrderStatus.CANCELED ||
            currentStatus === OrderStatus.FAILED) && (
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center z-10 flex-shrink-0">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-semibold text-red-600">
                {currentStatus === OrderStatus.CANCELED ? "Cancelled" : "Failed"}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Washing sub-events — visible while status is WASHING */}
      {currentStatus === OrderStatus.WASHING && (
        <div className="border border-dashed border-border rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Washing Progress
          </p>
          <div className="flex gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              disabled={cleaningStarted || loading !== null}
              onClick={() => logCleaning(OrderEventType.CLEANING_STARTED)}
            >
              {loading === OrderEventType.CLEANING_STARTED && (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              )}
              <WashingMachine className="h-3.5 w-3.5 mr-1" />
              {cleaningStarted ? "Wash Started ✓" : "Mark Wash Started"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!cleaningStarted || cleaningDone || loading !== null}
              onClick={() => logCleaning(OrderEventType.CLEANING_DONE)}
            >
              {loading === OrderEventType.CLEANING_DONE && (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              )}
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              {cleaningDone ? "Wash Done ✓" : "Mark Wash Done"}
            </Button>
          </div>
        </div>
      )}

      {/* Primary action button */}
      {!isTerminal && nextAction && (
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          onClick={advance}
          disabled={loading !== null}
        >
          {loading === "advance" && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {nextAction.label}
          {nextAction.requiresDriver && !hasDriver && (
            <span className="ml-1 text-xs opacity-75">(assign driver first)</span>
          )}
        </Button>
      )}

      {/* Cancel button */}
      {!isTerminal && (
        <Button
          variant="ghost"
          className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={cancel}
          disabled={loading !== null}
        >
          {loading === "cancel" && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Cancel Order
        </Button>
      )}
    </div>
  );
};
