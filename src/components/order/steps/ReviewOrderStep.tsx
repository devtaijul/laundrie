"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { useOrderCalculation } from "@/hooks/use-order-calculation";
import { Icons } from "@/icons";
import { formatMoney } from "@/lib/utils";
import { Box, Clock, MapPin, Shirt } from "lucide-react";
import { TotalBlock } from "./TotalBlock";

const DETERGENT_LABELS: Record<string, string> = {
  none: "No detergent",
  classic: "Classic detergent",
  "classic-softener": "Classic detergent + softener",
};

const FOLDING_LABELS: Record<string, string> = {
  fold: "Fold",
  "no-fold": "Do not fold",
  hangers: "Everything on hangers",
};

export const ReviewOrderStep = () => {
  const { state, dispatch } = useOrder();

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const {
    machinesCost,
    oversizedCost,
    softenerCost,
    hangersCost,
    ironCost,
    deliveryFee,
    subtotal,
    tax,
    total,
    coverageCost,
    isExpress,
  } = useOrderCalculation();

  const {
    machineCount,
    oversizedItems,
    pillowItems,
    duvetItems,
    detergent,
    washingTemp,
    foldingOption,
    ironPieces,
    delicateCycle,
    coverageType,
    additionalRequests,
  } = state.data;

  const totalOversized = oversizedItems + pillowItems + duvetItems;

  return (
    <div className="px-6 py-8 space-y-6 max-w-lg mx-auto">
      <div className="bg-blue-50 rounded-lg p-3 flex items-center space-x-3">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-primary text-xs">
            <Icons name="GLASE" />
          </span>
        </div>
        <p className="text-sm text-primary">
          Customers love us! Over 13k+ rating in the last 7 days
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Icons name="REVIEW_CHECKED" />
        <span className="font-medium">Review Order</span>
      </div>

      <div className="space-y-4 grid grid-cols-2 items-start">
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">
              {isExpress ? "Express" : "Standard"} Delivery
            </p>
            <p className="text-sm text-muted-foreground">
              {isExpress
                ? "Same-day or next-day delivery"
                : "Delivery within 48 hours"}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Box className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">Delivery</p>
            <p className="text-sm text-muted-foreground">2pm Tomorrow</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">
              {state.data.pickupAddress || "Address not set"}
            </p>
            {state.data.pickupSpot && (
              <p className="text-sm text-muted-foreground">
                {state.data.pickupSpot}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Shirt className="h-5 w-5 text-muted-foreground mt-1" />
          <div>
            <p className="font-medium">
              {machineCount} machine{machineCount > 1 ? "s" : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {isExpress ? "€30 first machine" : "€25 first machine"}, +€20 each
              additional
            </p>
            {totalOversized > 0 && (
              <p className="text-sm text-muted-foreground">
                + {totalOversized} oversized item{totalOversized > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Laundry Care Summary */}
      <div className="border-t pt-4 space-y-2">
        <h3 className="font-medium">Laundry Care</h3>
        <ul className="text-sm text-primary space-y-1">
          <li>• Detergent: {DETERGENT_LABELS[detergent] ?? detergent}</li>
          <li>• Temperature: {washingTemp}°C</li>
          <li>• Finishing: {FOLDING_LABELS[foldingOption] ?? foldingOption}</li>
          {delicateCycle && <li>• Delicate cycle</li>}
          {ironPieces > 0 && (
            <li>
              • Ironing: {ironPieces} piece{ironPieces > 1 ? "s" : ""} (+€
              {(ironPieces * 3).toFixed(2)})
            </li>
          )}
          {additionalRequests && <li>• {additionalRequests}</li>}
        </ul>
      </div>

      {/* Oversized items breakdown */}
      {totalOversized > 0 && (
        <div className="border-t pt-4 space-y-2">
          <h3 className="font-medium">Oversized Items</h3>
          <ul className="text-sm text-primary space-y-1">
            {oversizedItems > 0 && (
              <li>
                • Oversized: {oversizedItems} item
                {oversizedItems > 1 ? "s" : ""}
              </li>
            )}
            {pillowItems > 0 && (
              <li>
                • Pillow: {pillowItems} item{pillowItems > 1 ? "s" : ""}
              </li>
            )}
            {duvetItems > 0 && (
              <li>
                • Duvet: {duvetItems} item{duvetItems > 1 ? "s" : ""}
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Cost breakdown */}
      <div className="border border-gray-200 p-5 rounded-md">
        <h3 className="font-medium mb-3 flex items-center">
          <span className="mr-2">
            <Icons name="DOLLER" />
          </span>
          Estimated Cost
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>
              Laundry Service ({machineCount} machine
              {machineCount > 1 ? "s" : ""})
            </span>
            <span>{formatMoney(machinesCost)}</span>
          </div>

          {oversizedCost > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Oversized Items ({totalOversized})
              </span>
              <span className="font-medium">{formatMoney(oversizedCost)}</span>
            </div>
          )}

          {softenerCost > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Softener addon</span>
              <span className="font-medium">{formatMoney(softenerCost)}</span>
            </div>
          )}

          {hangersCost > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Hangers finishing</span>
              <span className="font-medium">{formatMoney(hangersCost)}</span>
            </div>
          )}

          {ironCost > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Ironing ({ironPieces} pc)
              </span>
              <span className="font-medium">{formatMoney(ironCost)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="font-medium">{formatMoney(deliveryFee)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatMoney(subtotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">VAT (21%)</span>
            <span className="font-medium">{formatMoney(tax)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {coverageType} Protection Plan
            </span>
            <span className="font-medium">{formatMoney(coverageCost)}</span>
          </div>

          <div className="border-t pt-2 flex justify-between text-lg font-semibold">
            <span>Estimated Total</span>
            <span className="text-primary">{formatMoney(total)}</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-4">
          <TotalBlock />

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Proceed to checkout
          </Button>
        </div>
      </div>
    </div>
  );
};
