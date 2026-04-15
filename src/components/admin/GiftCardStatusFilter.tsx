"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const STATUSES = [
  { label: "All", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Used", value: "EXHAUSTED" },
  { label: "Expired", value: "EXPIRED" },
  { label: "Canceled", value: "CANCELED" },
];

export function GiftCardStatusFilter({ currentStatus }: { currentStatus?: string }) {
  const router = useRouter();
  const active = currentStatus ?? "ALL";

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map(({ label, value }) => (
        <button
          key={value}
          onClick={() =>
            router.push(value === "ALL" ? "/admin/gift-cards" : `/admin/gift-cards?status=${value}`)
          }
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium border transition-colors",
            active === value
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
