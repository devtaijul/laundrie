"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import { TotalBlock } from "./TotalBlock";

type OversizedField = "oversizedItems" | "pillowItems" | "duvetItems";

const ITEM_OPTIONS: {
  field: OversizedField;
  title: string;
  subtitle: string;
}[] = [
  {
    field: "oversizedItems",
    title: "Oversized Items",
    subtitle: "Comforters, large blankets — €15 each",
  },
  {
    field: "pillowItems",
    title: "Pillow",
    subtitle: "Pillows and cushions — €15 each",
  },
  {
    field: "duvetItems",
    title: "Duvet",
    subtitle: "Duvets and quilts — €15 each",
  },
];

export const OversizedItemsStep = () => {
  const { state, dispatch } = useOrder();

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const updateCount = (field: OversizedField, increment: boolean) => {
    const current = state.data[field];
    const next = increment ? current + 1 : Math.max(0, current - 1);
    dispatch({ type: "UPDATE_DATA", field, value: next });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          Oversized Items{" "}
          <span className="text-base font-normal text-muted-foreground">
            (Optional)
          </span>
        </h2>
        <p className="text-muted-foreground">
          Large items require their own wash. Select any that apply.
        </p>
      </div>

      <div className="space-y-1">
        {ITEM_OPTIONS.map(({ field, title, subtitle }) => (
          <div
            key={field}
            className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
          >
            <div>
              <h3 className="font-medium text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateCount(field, false)}
                disabled={state.data[field] === 0}
                className="h-10 w-10 rounded-full border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="text-lg font-medium w-8 text-center">
                {state.data[field]}
              </span>

              <Button
                size="icon"
                onClick={() => updateCount(field, true)}
                className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
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
