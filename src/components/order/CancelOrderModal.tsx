"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CancelOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const cancelReasons = [
  "My Laundry Pro wasn't available",
  "Order not accepted in time",
  "Couldn't meet my requests",
  "Cost concerns",
  "Need to adjust my order details",
  "Other",
];

export const CancelOrderModal = ({
  open,
  onOpenChange,
  onConfirm,
}: CancelOrderModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");

  const handleConfirm = () => {
    if (selectedReason) {
      onConfirm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Cancel Order
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

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Why do you want to cancel your order?
          </p>

          <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
            {cancelReasons.map((reason) => (
              <div key={reason} className="flex items-center space-x-3 py-2">
                <RadioGroupItem value={reason} id={reason} />
                <Label htmlFor={reason} className="text-sm cursor-pointer">
                  {reason}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <div className="space-y-3">
            <Button
              onClick={handleConfirm}
              disabled={!selectedReason}
              className="w-full bg-primary/60 hover:bg-primary/70 disabled:opacity-50"
            >
              CONFIRM AND CANCEL ORDER
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="w-full"
            >
              BACK
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
