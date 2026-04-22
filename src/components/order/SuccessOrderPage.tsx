"use client";

import { useState } from "react";
import { CheckCircle2, Calendar, Zap, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/utils";
import { PAGES } from "@/config/pages.config";
import { format } from "date-fns";

type OrderSuccessData = {
  id: string;
  orderId: string;
  createdAt: Date;
  totalCents: number;
  deliverySpeed: string | null;
  status: string;
};

export const SuccessOrderPage = ({
  order,
  urlOrderId,
}: {
  order: OrderSuccessData;
  urlOrderId: string;
}) => {
  const router = useRouter();
  const [showReminder, setShowReminder] = useState(true);

  const isExpress = order.deliverySpeed === "express";

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-background flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start max-w-md mx-auto w-full px-6 pt-16 pb-10">

        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">Order Confirmed!</h1>
        <p className="text-sm text-muted-foreground mb-8">
          We&apos;re finding you the perfect Laundry Pro
        </p>

        {/* Order card */}
        <div className="w-full bg-white rounded-2xl border border-border shadow-sm p-5 space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Order ID
            </span>
            <span className="text-sm font-mono font-semibold text-foreground">
              #{order.orderId.slice(-8).toUpperCase()}
            </span>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ordered on</p>
              <p className="text-sm font-medium">
                {format(new Date(order.createdAt), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              {isExpress ? (
                <Zap className="w-4 h-4 text-primary" />
              ) : (
                <Package className="w-4 h-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delivery speed</p>
              <p className="text-sm font-medium capitalize">
                {isExpress ? "Express" : "Standard"}
              </p>
            </div>
          </div>

          <div className="h-px bg-border" />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Total charged</span>
            <span className="text-lg font-bold text-primary">
              {formatMoney(order.totalCents, true)}
            </span>
          </div>
        </div>

        {/* Info banner */}
        <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-8">
          <p className="text-sm text-amber-800">
            A Laundry Pro is usually assigned within <strong>60 minutes</strong>. You&apos;ll
            receive a notification when your order is picked up.
          </p>
        </div>

        {/* Actions */}
        <div className="w-full space-y-3">
          <Button
            onClick={() => router.push(`/orders/${urlOrderId}`)}
            className="w-full h-12 bg-gradient-primary hover:bg-primary/90"
          >
            View Order Details
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push(PAGES.LAUNDRIE)}
            className="w-full h-12"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Place Another Order
          </Button>
        </div>
      </div>

      {/* Reminder dialog */}
      <Dialog open={showReminder} onOpenChange={setShowReminder}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">One more thing</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              Please put your laundry at the pick-up spot before the driver arrives.
            </p>
            <p className="text-muted-foreground">
              Then congratulate yourself for conquering laundry today!
            </p>
            <Button
              onClick={() => setShowReminder(false)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
