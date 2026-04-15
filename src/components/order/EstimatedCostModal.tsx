import { X, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/generated/prisma";
import { formatMoney } from "@/lib/utils";

interface EstimatedCostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: Order;
}

export const EstimatedCostModal = ({
  open,
  onOpenChange,
  order,
}: EstimatedCostModalProps) => {
  const {
    machinesCost,
    oversizedCost,
    softenerCost,
    hangersCost,
    ironCost,
    deliveryFee,
    subtotal,
    tax,
    coverageCost,
    coverageType,
    totalCents,
    machineCount,
    oversizedItems,
    pillowItems,
    duvetItems,
    ironPieces,
  } = order;

  const totalOversized =
    (oversizedItems ?? 0) + (pillowItems ?? 0) + (duvetItems ?? 0);
  const total = totalCents / 100;

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

          <div className="space-y-3 text-sm">
            {/* Machines */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                Laundry Service ({machineCount ?? 1} machine
                {(machineCount ?? 1) > 1 ? "s" : ""})
              </span>
              <span className="font-medium">{formatMoney(machinesCost)}</span>
            </div>

            {/* Oversized items */}
            {totalOversized > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Oversized Items ({totalOversized})
                </span>
                <span className="font-medium">{formatMoney(oversizedCost)}</span>
              </div>
            )}

            {/* Softener */}
            {softenerCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Softener addon</span>
                <span className="font-medium">{formatMoney(softenerCost)}</span>
              </div>
            )}

            {/* Hangers */}
            {hangersCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Hangers finishing</span>
                <span className="font-medium">{formatMoney(hangersCost)}</span>
              </div>
            )}

            {/* Ironing */}
            {ironCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Ironing ({ironPieces ?? 0} pc)
                </span>
                <span className="font-medium">{formatMoney(ironCost)}</span>
              </div>
            )}

            {/* Delivery fee */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delivery fee</span>
              <span className="font-medium">{formatMoney(deliveryFee)}</span>
            </div>

            {/* Laundry charges subtotal (before VAT) */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span className="font-medium">Laundry Charges</span>
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <span className="font-medium">{formatMoney(subtotal)}</span>
            </div>

            {/* Protection Plan */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                {coverageType ?? "Basic"} Protection Plan
              </span>
              {coverageCost > 0 ? (
                <span className="font-medium">{formatMoney(coverageCost)}</span>
              ) : (
                <span className="text-muted-foreground font-medium">FREE</span>
              )}
            </div>

            {/* VAT */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">VAT (21%)</span>
              <span className="font-medium">{formatMoney(tax)}</span>
            </div>

            {/* Divider */}
            <div className="border-t pt-3 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">
                  {formatMoney(subtotal + (coverageCost ?? 0))}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  {formatMoney(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
