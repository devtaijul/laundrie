import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useOrder } from "@/contexts/OrderContext";
import { TotalBlock } from "./TotalBlock";

export const OversizedItemsStep = () => {
  const { state, dispatch } = useOrder();

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const updateOversizedItems = (increment: boolean) => {
    const currentCount = state.data.oversizedItems;
    const newCount = increment
      ? currentCount + 1
      : Math.max(0, currentCount - 1);
    dispatch({ type: "UPDATE_DATA", field: "oversizedItems", value: newCount });
  };

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            Oversized Items (Optional)
          </h2>
          <p className="text-muted-foreground mb-1">
            Oversized items like comforters and pillows require their own load
            and can be included for an
          </p>
          <p className="text-muted-foreground mb-1">
            additional $8 fee.{" "}
            <span className="text-primary cursor-pointer">Learn More</span>
          </p>
        </div>
        <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
          $2.00/LB
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <p className="font-semibold text-primary mb-1">$40 MINIMUM CHARGE</p>
        <p className="text-sm text-primary">
          Make the most of your order—add more laundry!
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">Oversized Items</h3>
            <p className="text-sm text-muted-foreground">
              4 item maximum for Express delivery
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => updateOversizedItems(false)}
              className="h-10 w-10 rounded-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="text-lg font-medium w-8 text-center">
              {state.data.oversizedItems}
            </span>

            <Button
              size="icon"
              onClick={() => updateOversizedItems(true)}
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
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
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
