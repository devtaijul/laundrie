"use client";
import { OrderExtends } from "@/types/global-type";
import { useState } from "react";
import { Button } from "../ui/button";
import { OrderSummary } from "./OrderSummary";
import { OrderData } from "@/contexts/OrderContext";
import { EstimatedCostModal } from "./EstimatedCostModal";

export const OrderDetailsAction = ({ order }: { order: OrderExtends }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCostModal, setShowCostModal] = useState(false);
  return (
    <>
      <EstimatedCostModal
        open={showCostModal}
        onOpenChange={setShowCostModal}
        order={order}
      />
      <div className="space-y-3 pt-4">
        <Button
          onClick={() => setShowCostModal(true)}
          className="w-full bg-primary hover:bg-primary/90"
        >
          VIEW ESTIMATED COST
        </Button>
        <Button
          variant="ghost"
          onClick={() => setShowCancelModal(true)}
          className="w-full text-muted-foreground"
        >
          CANCEL ORDER
        </Button>
      </div>
    </>
  );
};
