import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { bagTypes } from "@/lib/data";
import { Minus, Plus } from "lucide-react";
import { TotalBlock } from "./TotalBlock";

export const BagCountStep = () => {
  const { state, dispatch } = useOrder();

  console.log("state", state);

  const handleContinue = () => {
    dispatch({ type: "NEXT_STEP" });
  };

  const updateBagCount = (
    type: "smallBags" | "regularBags" | "largeBags",
    increment: boolean
  ) => {
    const currentCount = state.data[type];
    const newCount = increment
      ? currentCount + 1
      : Math.max(0, currentCount - 1);
    dispatch({ type: "UPDATE_DATA", field: type, value: newCount });
  };

  // Calculate which bag types are disabled (only one type can be selected)
  const hasSmall = state.data.smallBags > 0;
  const hasRegular = state.data.regularBags > 0;
  const hasLarge = state.data.largeBags > 0;

  return (
    <div className="px-6 py-8 space-y-8 max-w-lg mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-2">BAG COUNT</h2>
          <p className="text-muted-foreground">
            Place your laundry in any bag or hamper you&apos;d like. Be accurate
            with your bag counts so everything
          </p>
          <p className="text-muted-foreground">goes smoothly!</p>
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
        {bagTypes(state).map((bag) => {
          const isDisabled =
            (bag.id === "smallBags" && (hasRegular || hasLarge)) ||
            (bag.id === "regularBags" && (hasSmall || hasLarge)) ||
            (bag.id === "largeBags" && (hasSmall || hasRegular));
          return (
            <div
              key={bag.id}
              className={`flex items-center justify-between ${isDisabled ? "opacity-50" : ""}`}
            >
              <div>
                <h3 className="font-medium text-foreground">{bag.title}</h3>
                <p className="text-sm text-muted-foreground">{bag.subtitle}</p>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateBagCount(bag.id, false)}
                  disabled={bag.count === 0}
                  className="h-10 w-10 rounded-full border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="text-lg font-medium w-8 text-center">
                  {bag.count}
                </span>

                <Button
                  size="icon"
                  onClick={() => updateBagCount(bag.id, true)}
                  disabled={isDisabled}
                  className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
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
