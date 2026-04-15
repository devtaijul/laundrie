"use client";

import { cn } from "@/lib/utils";

interface Props {
  amount: string;
  className?: string;
}

export function GiftCardVisual({ amount, className }: Props) {
  return (
    <div
      className={cn(
        "relative h-48 w-80 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-8 text-white select-none",
        className,
      )}
    >
      {/* decorative circles */}
      <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
      <div className="absolute -right-2 top-8 h-16 w-16 rounded-full bg-white/10" />
      <div className="absolute -bottom-8 -left-6 h-24 w-24 rounded-full bg-white/10" />

      {/* brand */}
      <div className="absolute left-5 top-5 text-xl font-bold tracking-tight">
        laundrie
      </div>

      {/* stars */}
      <div className="absolute right-20 top-12 text-white/30 text-lg">★</div>
      <div className="absolute right-12 bottom-14 text-white/30 text-sm">★</div>

      {/* amount + label */}
      <div className="absolute right-5 bottom-5 text-right">
        <div className="text-3xl font-bold">{amount}</div>
        <div className="text-sm opacity-80 mt-0.5">Gift Card</div>
        <div className="text-xs opacity-60 mt-0.5">Valid for 1 year</div>
      </div>
    </div>
  );
}
