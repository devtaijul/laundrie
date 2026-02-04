import { X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EstimatedCostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EstimatedCostModal = ({
  open,
  onOpenChange,
}: EstimatedCostModalProps) => {
  const costBreakdown = {
    estimatedWeight: {
      label: "Estimated 11 lbs • Standard $2.00/lbs",
      amount: "$22.00",
    },
    oversizedItem: { label: "1 Oversized Item • $8.00", amount: "$8.00" },
    laundryCharges: { label: "Laundry Charges", amount: "$30.00" },
    protectionPlan: { label: "Basic Poplin Protection Plan", amount: "FREE" },
    trustSafetyFee: { label: "Trust and safety fee", amount: "$3.00" },
    subtotal: "$33.00",
    total: "$33.00",
    recommendedTip: "$8.00",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Estimated Cost
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Below is an estimated cost based on your order details. Your actual
            cost is based on the weight of your laundry.
          </p>

          <div className="space-y-3">
            {/* Estimated Weight */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {costBreakdown.estimatedWeight.label}
              </span>
              <span className="text-sm font-medium">
                {costBreakdown.estimatedWeight.amount}
              </span>
            </div>

            {/* Oversized Item */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {costBreakdown.oversizedItem.label}
              </span>
              <span className="text-sm font-medium">
                {costBreakdown.oversizedItem.amount}
              </span>
            </div>

            {/* Laundry Charges */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {costBreakdown.laundryCharges.label}
                </span>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium">
                {costBreakdown.laundryCharges.amount}
              </span>
            </div>

            {/* Protection Plan */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {costBreakdown.protectionPlan.label}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {costBreakdown.protectionPlan.amount}
              </span>
            </div>

            {/* Trust and Safety Fee */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {costBreakdown.trustSafetyFee.label}
              </span>
              <span className="text-sm font-medium">
                {costBreakdown.trustSafetyFee.amount}
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-border pt-3">
              {/* Subtotal */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-sm font-medium">
                  {costBreakdown.subtotal}
                </span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold">{costBreakdown.total}</span>
              </div>
            </div>

            {/* Recommended Tip */}
            <div className="bg-primary/10 rounded-lg px-4 py-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Recommended tip
              </span>
              <span className="text-sm font-medium">
                {costBreakdown.recommendedTip}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
