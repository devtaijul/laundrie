"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useOrder } from "@/contexts/OrderContext";
import { LaundryCareField, LaundryCareValue } from "@/types/global-type";
import { cn } from "@/lib/utils";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const DETERGENT_OPTIONS = [
  { value: "none", label: "No detergent", badge: null },
  { value: "classic", label: "Classic detergent", badge: "Included" },
  {
    value: "classic-softener",
    label: "Classic detergent + softener",
    badge: "+€2.50",
  },
] as const;

const TEMP_OPTIONS = [
  { value: "30", label: "30°C" },
  { value: "40", label: "40°C" },
  { value: "60", label: "60°C" },
  { value: "90", label: "90°C" },
] as const;

const FOLDING_OPTIONS = [
  { value: "fold", label: "Fold", badge: "Included" },
  { value: "no-fold", label: "Do not fold", badge: null },
  { value: "hangers", label: "Everything on hangers", badge: "+€5.00" },
] as const;

export const LaundryCareStep = () => {
  const { state, dispatch } = useOrder();
  const [showAdditional, setShowAdditional] = useState(
    !!state.data.additionalRequests
  );

  const updateData = (field: LaundryCareField, value: LaundryCareValue) => {
    dispatch({ type: "UPDATE_DATA", field, value });
  };

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">LAUNDRY CARE</h2>
        <p className="text-muted-foreground">
          Choose care options for your laundry
        </p>
      </div>

      {/* Detergent */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Detergent</p>
        <div className="space-y-2">
          {DETERGENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData("detergent", opt.value)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-md border text-left transition-colors",
                state.data.detergent === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.badge && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    opt.badge === "Included"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Washing Temperature */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">
          Washing Temperature
        </p>
        <div className="grid grid-cols-4 gap-2">
          {TEMP_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData("washingTemp", opt.value)}
              className={cn(
                "py-2.5 rounded-md border text-sm font-medium transition-colors",
                state.data.washingTemp === opt.value
                  ? "border-primary bg-primary text-white"
                  : "border-gray-200 text-foreground hover:border-gray-300"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delicate Cycle */}
      <button
        type="button"
        onClick={() => updateData("delicateCycle", !state.data.delicateCycle)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-colors",
          state.data.delicateCycle
            ? "border-primary bg-primary/5"
            : "border-gray-200 hover:border-gray-300"
        )}
      >
        <Checkbox
          id="delicate"
          checked={state.data.delicateCycle}
          onCheckedChange={(checked) => updateData("delicateCycle", !!checked)}
          onClick={(e) => e.stopPropagation()}
        />
        <label
          htmlFor="delicate"
          className="text-sm font-medium cursor-pointer select-none"
        >
          Delicate cycle
        </label>
      </button>

      {/* Finishing / Folding */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Finishing</p>
        <div className="space-y-2">
          {FOLDING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateData("foldingOption", opt.value)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-md border text-left transition-colors",
                state.data.foldingOption === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <span className="text-sm font-medium">{opt.label}</span>
              {opt.badge && (
                <span
                  className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    opt.badge === "Included"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  )}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Ironing */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Ironing</p>
        <div className="flex items-center justify-between px-4 py-3 rounded-md border border-gray-200">
          <div>
            <p className="text-sm font-medium">Iron clothes</p>
            <p className="text-xs text-muted-foreground">
              +€3.00 per piece
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              type="button"
              onClick={() =>
                updateData(
                  "ironPieces",
                  Math.max(0, state.data.ironPieces - 1)
                )
              }
              disabled={state.data.ironPieces === 0}
              className="h-8 w-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium w-6 text-center">
              {state.data.ironPieces}
            </span>
            <Button
              size="icon"
              type="button"
              onClick={() =>
                updateData("ironPieces", state.data.ironPieces + 1)
              }
              className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        {state.data.ironPieces > 0 && (
          <p className="text-xs text-primary font-medium px-1">
            Iron total: +€{(state.data.ironPieces * 3).toFixed(2)}
          </p>
        )}
      </div>

      {/* Additional Requests */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => {
            const next = !showAdditional;
            setShowAdditional(next);
            if (!next) updateData("additionalRequests", "");
          }}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-md border text-left transition-colors",
            showAdditional
              ? "border-primary bg-primary/5"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <Checkbox
            checked={showAdditional}
            onCheckedChange={(checked) => {
              setShowAdditional(!!checked);
              if (!checked) updateData("additionalRequests", "");
            }}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-sm font-medium select-none">
            Additional requests
          </span>
        </button>
        {showAdditional && (
          <Textarea
            placeholder="Any additional request? (Optional)"
            value={state.data.additionalRequests}
            onChange={(e) => updateData("additionalRequests", e.target.value)}
            className="min-h-[80px]"
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto">
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
