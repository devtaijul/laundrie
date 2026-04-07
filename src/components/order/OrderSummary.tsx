import { formatMoney } from "@/lib/utils";
import React from "react";

export const OrderSummary = ({
  title = "Total",
  machinesCost,
  oversizedItems,
  oversizedCost,
  deliveryFee,
  subtotal,
  tax,
  coverageType,
  coverageCost,
  total,
  isCents = false,
}: {
  title: string;
  machinesCost: number;
  oversizedItems: number;
  oversizedCost: number;
  deliveryFee: number;
  subtotal: number;
  tax: number;
  coverageType: string;
  coverageCost: number;
  total: number;
  isCents?: boolean;
}) => {
  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Laundry Service</span>
        <span>{formatMoney(machinesCost)}</span>
      </div>
      {oversizedItems > 0 && (
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Oversized Items ({oversizedItems})
          </span>
          <span className="font-medium">{formatMoney(oversizedCost)}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-muted-foreground">Delivery Fee</span>
        <span className="font-medium">{formatMoney(deliveryFee)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground font-bold">Subtotal</span>
        <span className=" font-bold">{formatMoney(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">Tax (10%)</span>
        <span className="font-medium">{formatMoney(tax)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted-foreground">
          {coverageType} Poplin Protection Plan
        </span>
        <span className="font-medium">{formatMoney(coverageCost)}</span>
      </div>
      <div className="border-t pt-2 flex justify-between text-lg font-semibold">
        <span>{title}</span>
        <span className="text-primary">{formatMoney(total, isCents)}</span>
      </div>
    </div>
  );
};
