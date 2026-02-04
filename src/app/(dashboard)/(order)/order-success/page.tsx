"use client";

import { useState } from "react";
import {
  ArrowLeft,
  HelpCircle,
  Calendar,
  Clock,
  Truck,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { OrderHeader } from "@/components/order/OrderHeader";

const OrderSuccess = () => {
  const router = useRouter();
  const [showReminder, setShowReminder] = useState(true);

  const orderData = {
    orderId: "#PZ59853CF4MJ",
    orderedDate: "Nov 26, 7:43am",
    pickupBy: "8pm Wednesday",
    deliveryBy: "8pm Thursday",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <OrderHeader />

      {/* Content */}
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Order Status Card */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <ClipboardList className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">
              ORDER PLACED
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              Searching for a Laundry Pro
            </h2>
          </div>
        </div>

        {/* Order ID */}
        <p className="text-sm text-muted-foreground mb-4">
          ORDER {orderData.orderId}
        </p>

        {/* Order Timeline */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Ordered</span>
            <span className="text-sm text-muted-foreground">
              {orderData.orderedDate}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Pickup</span>
            <span className="text-sm text-muted-foreground">
              by {orderData.pickupBy}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Delivery</span>
            <span className="text-sm text-muted-foreground">
              by {orderData.deliveryBy}
            </span>
          </div>
        </div>

        {/* Info Message */}
        <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
          <p className="text-sm text-muted-foreground">
            We&apos;re finding you the perfect Laundry Pro based on your
            preferences. This usually happens within 60 minutes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/order-details/${orderData.orderId}`)}
            className="flex-1"
          >
            MORE DETAILS
          </Button>
          <Button
            onClick={() => router.push("/order-flow")}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            Order Again
          </Button>
        </div>
      </div>

      {/* One More Thing Modal */}
      <Dialog open={showReminder} onOpenChange={setShowReminder}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              One more thing
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Please put your laundry at the pick up spot.
            </p>
            <p className="text-muted-foreground">
              Then congratulate yourself for conquering laundry today.
            </p>
            <Button
              onClick={() => setShowReminder(false)}
              className="w-full bg-primary hover:bg-primary/90"
            >
              OKAY
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OrderSuccess;
