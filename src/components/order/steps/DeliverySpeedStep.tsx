import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { speedOptions } from "@/lib/data";
import { Check } from "lucide-react";
import { useState } from "react";

export const DeliverySpeedStep = () => {
  const { state, dispatch } = useOrder();
  const [selectedSpeed, setSelectedSpeed] = useState(state.data.deliverySpeed);

  const handleContinue = () => {
    dispatch({
      type: "UPDATE_DATA",
      field: "deliverySpeed",
      value: selectedSpeed,
    });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          DELIVERY SPEED
        </h2>
        <p className="text-muted-foreground">
          Please choose your desired delivery speed.
        </p>
      </div>

      <div className="space-y-4 bg-[#EEF5F8] p-10 rounded-xl">
        {speedOptions.map((option) => (
          <div
            key={option.id}
            onClick={() =>
              setSelectedSpeed(option.id as "standard" | "express")
            }
            className={`border-3 rounded-lg p-4 cursor-pointer transition-colors relative ${
              selectedSpeed === option.id
                ? "border-primary "
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-foreground">
                    {option.title}
                  </h3>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {option.subtitle}
                  </p>
                  <p className="text-sm text-muted-foreground mb-2">
                    {option.details}
                  </p>
                  <p className="text-xs text-muted-foreground whitespace-pre-line">
                    {option.availability}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold text-primary">
                    {option.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {option.priceUnit}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {selectedSpeed === option.id ? (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 bg-[#5C5C5C94] rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  );
};
