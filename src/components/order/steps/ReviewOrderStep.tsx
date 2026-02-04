"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOrder } from "@/contexts/OrderContext";
import { useOrderCalculation } from "@/hooks/use-order-calculation";
import { Icons } from "@/icons";
import { Box, Clock, MapPin, Shirt } from "lucide-react";
import { useState } from "react";
import { TotalBlock } from "./TotalBlock";
import { formatMoney } from "@/lib/utils";

export const ReviewOrderStep = () => {
  const { state, dispatch } = useOrder();

  const [promoCode, setPromoCode] = useState("");
  const [giftCard, setGiftCard] = useState("");

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const {
    machinesCost,
    oversizedCost,
    deliveryFee,
    subtotal,
    tax,
    minimumCharge,
    total,
    coverageCost,
    isExpress,
  } = useOrderCalculation();
  const {
    smallBags,
    regularBags,
    largeBags,
    delicateCycle,
    returnOnHangers,
    coverageType,
    oversizedItems,
  } = state.data;

  // Get bag description
  const getBagDescription = () => {
    if (smallBags > 0)
      return `${smallBags} Small Bag${smallBags > 1 ? "s" : ""}`;
    if (regularBags > 0)
      return `${regularBags} Regular Bag${regularBags > 1 ? "s" : ""}`;
    if (largeBags > 0)
      return `${largeBags} Large Bag${largeBags > 1 ? "s" : ""}`;
    return "No bags selected";
  };

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
            <p className="font-medium">{getBagDescription()}</p>
            <p className="text-sm text-muted-foreground">
              {isExpress ? "€30 per machine" : "€25 per machine"} (approx. 4-5
              kg)
            </p>
            {oversizedItems > 0 && (
              <p className="text-sm text-muted-foreground">
                + {oversizedItems} oversized item{oversizedItems > 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t pt-4 space-y-4">
        <h3 className="font-medium">Laundry Care details</h3>
        <ul className="text-sm text-primary space-y-1">
          <li>• Detergent: {state.data.detergent}</li>
          {delicateCycle && <li>• Delicate cycle requested</li>}
          {returnOnHangers && <li>• Return on hangers</li>}
          {state.data.additionalRequests && (
            <li>• {state.data.additionalRequests}</li>
          )}
        </ul>
      </div>

      {/*  <div className="space-y-4">
        <div className="space-y-4 border border-gray-200 rounded-md p-5">
          <div className="flex items-center space-x-3">
            <Icons name="PROMO" />
            <span className="font-medium text-primary">Apply Promo Code</span>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              className="border-primary text-white bg-primary"
            >
              Apply
            </Button>
          </div>
        </div>
        <div className="space-y-4 border border-gray-200 rounded-md p-5">
          <div className="flex items-center space-x-3">
            <Icons name="GIFT" />
            <span className="font-medium text-primary">Use Gift Card</span>
          </div>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Gift Card Code"
              value={giftCard}
              onChange={(e) => setGiftCard(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              className="border-primary text-white bg-primary"
            >
              Apply
            </Button>
          </div>
        </div>
      </div> */}

      <div className="border border-gray-200 p-5 rounded-md pt-4">
        <h3 className="font-medium mb-3 flex items-center">
          {" "}
          <span className="mr-2">
            <Icons name="DOLLER" />
          </span>{" "}
          Estimated Cost
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Laundry Service</span>
            <span>€{machinesCost.toFixed(2)}</span>
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
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Vat (21%)</span>
            <span className="font-medium">{formatMoney(tax)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {coverageType} Poplin Protection Plan
            </span>
            <span className="font-medium">{formatMoney(coverageCost)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-lg font-semibold">
            <span>Estimated Total</span>
            <span className="text-primary">{formatMoney(total)}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Minimum charge: {formatMoney(minimumCharge)}
          </p>
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
