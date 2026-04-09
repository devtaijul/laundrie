// components/steps/PickupLocationStep.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

import { AddressSelectDialog } from "@/components/dialogs/AddressSelectDialog";
import { useOrder } from "@/contexts/OrderContext";
import { SERVICE_AREA_ERROR } from "@/lib/service-area";
import { pickupSpot } from "@/lib/data";
import { Pencil, Plus } from "lucide-react";

export const PickupLocationStep = () => {
  const { state, dispatch } = useOrder();

  const [open, setOpen] = useState(false);

  const saved = state.data.savedAddress;
  const hasAddress = Boolean(saved && saved.line1);
  const isServiceAreaAllowed = Boolean(saved?.isServiceAreaAllowed);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleContinue = () => {
    const newErrors: Record<string, string> = {};

    if (!hasAddress) {
      newErrors.hasAddress = "Pickup address is required";
    } else if (!isServiceAreaAllowed) {
      newErrors.hasAddress = SERVICE_AREA_ERROR;
    }

    if (!state.data.pickupSpot) {
      newErrors.pickupSpot = "Pickup spot is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          PICKUP LOCATION
        </h2>
        <p className="text-muted-foreground">
          Where would you like your laundry picked up?
        </p>
      </div>

      <div className="space-y-4">
        {/* Address selector */}
        <div>
          <div
            className={`border rounded-lg p-4 flex items-center justify-between hover:bg-primary hover:text-white cursor-pointer ${
              errors.hasAddress ? "border-red-500" : "border-input"
            }`}
            onClick={() => setOpen(true)}
          >
            <div className="min-w-0">
              <p className="text-sm">
                {hasAddress ? "Pickup address" : "Select an address"}
              </p>
              {hasAddress && (
                <p className="truncate">{state.data.pickupAddress}</p>
              )}
            </div>
            {hasAddress ? (
              <Pencil className="h-5 w-5 shrink-0" />
            ) : (
              <Plus className="h-5 w-5 shrink-0" />
            )}
          </div>
          {errors.hasAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.hasAddress}</p>
          )}
        </div>

        {/* Pickup spot */}
        <div>
          <Select
            value={state.data.pickupSpot || ""}
            onValueChange={(v) => {
              dispatch({ type: "UPDATE_DATA", field: "pickupSpot", value: v });
              setErrors((p) => ({ ...p, pickupSpot: "" }));
            }}
          >
            <SelectTrigger
              className={`w-full py-3 ${errors.pickupSpot ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder="Choose a spot" />
            </SelectTrigger>
            <SelectContent>
              {pickupSpot.map((spot) => (
                <SelectItem key={spot.value} value={spot.value}>
                  {spot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.pickupSpot && (
            <p className="text-xs text-red-500 mt-1">{errors.pickupSpot}</p>
          )}
        </div>
      </div>

      {/* Bottom sticky actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-4">
          <div className="bg-blue-50 rounded-lg p-3 flex items-center space-x-3">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs">€</span>
            </div>
            <div>
              <p className="font-medium text-primary">€10 Bonus Credits</p>
              <p className="text-xs text-muted-foreground">Expires in 06:28</p>
            </div>
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Continue
          </Button>
        </div>
      </div>

      <AddressSelectDialog open={open} setOpen={setOpen} />
    </div>
  );
};
