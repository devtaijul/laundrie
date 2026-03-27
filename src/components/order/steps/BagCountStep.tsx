"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { PRICING } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { TotalBlock } from "./TotalBlock";

export const BagCountStep = () => {
  const { state, dispatch } = useOrder();
  const { machineCount, deliverySpeed } = state.data;
  const isExpress = deliverySpeed === "express";
  const machinePricing = isExpress
    ? PRICING.machine.express
    : PRICING.machine.standard;

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const updateCount = (increment: boolean) => {
    const newCount = increment
      ? machineCount + 1
      : Math.max(1, machineCount - 1);
    dispatch({ type: "UPDATE_DATA", field: "machineCount", value: newCount });
  };

  const calcCost = (count: number) =>
    machinePricing.base + Math.max(0, count - 1) * machinePricing.additional;

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          MACHINE COUNT
        </h2>
        <p className="text-muted-foreground">
          How many washing machines do you need? One machine holds approx. 4–5
          kg of laundry.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg p-4 space-y-1">
        <p className="font-semibold text-primary">Pricing</p>
        <p className="text-sm text-primary">
          1st machine: €{machinePricing.base.toFixed(2)}
        </p>
        <p className="text-sm text-primary">
          Each additional machine: €{machinePricing.additional.toFixed(2)}
        </p>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
          <h3 className="font-medium text-foreground">Washing machines</h3>
          <p className="text-sm text-muted-foreground">
            €{calcCost(machineCount).toFixed(2)} total
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateCount(false)}
            disabled={machineCount <= 1}
            className="h-10 w-10 rounded-full border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="text-lg font-medium w-8 text-center">
            {machineCount}
          </span>

          <Button
            size="icon"
            onClick={() => updateCount(true)}
            className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Pricing reference table */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`flex justify-between text-sm px-2 py-1 rounded transition-colors ${
              machineCount === n
                ? "bg-primary/10 text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <span>
              {n} machine{n > 1 ? "s" : ""}
            </span>
            <span>€{calcCost(n).toFixed(2)}</span>
          </div>
        ))}
        {machineCount > 4 && (
          <div className="flex justify-between text-sm px-2 py-1 rounded bg-primary/10 text-primary font-semibold">
            <span>{machineCount} machines</span>
            <span>€{calcCost(machineCount).toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-4">
          <TotalBlock />

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
