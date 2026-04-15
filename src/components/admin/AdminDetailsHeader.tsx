import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/generated/prisma";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const STATUS_BADGE: Record<OrderStatus, { label: string; className: string }> =
  {
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

interface Props {
  orderId: string;
  status: OrderStatus;
  createdAt: Date;
}

export const AdminDetailsHeader = ({ orderId, status, createdAt }: Props) => {
  const badge = STATUS_BADGE[status];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/orders"
          className="h-8 w-8 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">{orderId}</h1>
          <p className="text-xs text-muted-foreground">
            Placed {formatDate(createdAt)}
          </p>
        </div>
      </div>

      <Badge className={cn("hover:opacity-100 text-sm px-3 py-1", badge.className)}>
        {badge.label}
      </Badge>
    </div>
  );
};
