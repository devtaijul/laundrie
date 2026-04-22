"use client";

import { useOrderCalculation } from "@/hooks/use-order-calculation";
import { formatMoney } from "@/lib/utils";
import React from "react";

export const TotalBlock = () => {
  const { total, tax, deliveryFee } = useOrderCalculation();
  const stepsTotal = total - tax - deliveryFee;
  return (
    <div className="bg-blue-50 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-muted-foreground">Estimated Total:</span>
        <span className="text-xl font-bold text-primary">
          {formatMoney(stepsTotal)}
        </span>
      </div>
    </div>
  );
};
