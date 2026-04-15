"use client";

import { useRouter } from "next/navigation";
import { OrderStatus } from "@/generated/prisma";
import { cn } from "@/lib/utils";

const TABS: { label: string; value: OrderStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Pending", value: OrderStatus.PENDING },
  { label: "Confirmed", value: OrderStatus.PROCESSING },
  { label: "Pickup", value: OrderStatus.PICKUP_SCHEDULED },
  { label: "Picked Up", value: OrderStatus.PICKED_UP },
  { label: "Washing", value: OrderStatus.WASHING },
  { label: "Delivery", value: OrderStatus.DELIVERY_SCHEDULED },
  { label: "Delivered", value: OrderStatus.DELIVERED },
  { label: "Cancelled", value: OrderStatus.CANCELED },
];

interface Props {
  currentStatus?: OrderStatus | "ALL";
}

export const OrderStatusTab = ({ currentStatus = "ALL" }: Props) => {
  const router = useRouter();

  function navigate(value: OrderStatus | "ALL") {
    const params = new URLSearchParams();
    if (value !== "ALL") params.set("status", value);
    router.push(`/admin/orders?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1 w-max">
      {TABS.map((tab) => {
        const isActive = currentStatus === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => navigate(tab.value)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-background/60",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
