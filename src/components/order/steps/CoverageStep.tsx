"use client";

import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { Check } from "lucide-react";
import { useState } from "react";
import { TotalBlock } from "./TotalBlock";
import { formatMoney } from "@/lib/utils";
import { coverageOptions } from "@/lib/data";

export const CoverageStep = () => {
  const { state, dispatch } = useOrder();
  const [selectedCoverage, setSelectedCoverage] = useState(
    state.data.coverageType,
  );

  const handleSelect = (id: "basic" | "premium" | "premium-plus") => {
    const selectedData = coverageOptions.find((option) => option.id === id);
    setSelectedCoverage(id);
    dispatch({ type: "UPDATE_DATA", field: "coverageType", value: id });
    dispatch({
      type: "UPDATE_DATA",
      field: "coverageCost",
      value: selectedData?.price || 0,
    });
  };

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">Coverage</h2>
          <p className="text-muted-foreground">
            Laundrie&apos;s Protection Plan covers you in the rare
          </p>
          <p className="text-muted-foreground">instance of damage or loss.</p>
        </div>
        {/*       <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
          $2.00/LB
        </div> */}
      </div>

      <div className="space-y-4">
        {coverageOptions.map((option) => (
          <div
            key={option.id}
            onClick={() =>
              handleSelect(option.id as "basic" | "premium" | "premium-plus")
            }
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedCoverage === option.id
                ? "border-primary bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                    selectedCoverage === option.id
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  }`}
                >
                  {selectedCoverage === option.id && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.maxCoverage}
                  </p>
                </div>
              </div>
              <div className="text-right bg-primary/20 rounded-md px-3 py-2">
                <span
                  className={`font-semibold ${
                    option.price <= 0 ? "text-green-600" : "text-primary"
                  }`}
                >
                  {option.price <= 0 ? "FREE" : formatMoney(option.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="">
        <p className="text-sm cursor-pointer">
          <span className="text-primary">Tap here</span> for more information
          about Laundrie&apos;s Protection Plan.
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="max-w-md mx-auto space-y-4">
          <TotalBlock />

          <Button
            onClick={handleContinue}
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            Review Order
          </Button>
        </div>
      </div>
    </div>
  );
};
