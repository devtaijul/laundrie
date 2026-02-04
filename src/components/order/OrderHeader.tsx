"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "@/contexts/OrderContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { HelpDialog } from "./HelpDialog";
import { PAGES } from "@/config/pages.config";

export const OrderHeader = () => {
  const { state, dispatch } = useOrder();
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

  const handleBack = () => {
    if (state.currentStep === 1) {
      router.push(PAGES.LAUNDRIE);
    } else {
      dispatch({ type: "PREV_STEP" });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-100 to-blue-200 z-50 px-4 py-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-primary hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-semibold text-primary">Place an Order</h1>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHelp(true)}
            className="text-primary hover:bg-white/50"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <HelpDialog open={showHelp} onOpenChange={setShowHelp} />
    </>
  );
};
