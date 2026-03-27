import {
  Calendar,
  ClipboardList,
  Home,
  MapPin,
  Shield,
  Shirt,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { OrderDetailsAction } from "./OrderDetailsAction";
import { getOrderByOrderId } from "@/actions/order.actions";
import { Suspense } from "react";
import OrderDetailsSkeleton from "../skeletons/OrderDetailsSkeleton";
import { formatDate, formatMoney } from "@/lib/utils";
import { OrderExtends } from "@/types/global-type";

export const OrderDetailsServer = async ({ orderId }: { orderId: string }) => {
  const res = await getOrderByOrderId(orderId);

  const orderData = {
    orderId: "#PZ59853CF4MJ",
    status: "Searching for a Laundry Pro",
    orderedDate: "Nov 26, 7:43am",
    deliveryBy: "8pm Thursday",
    pickupAddress: "47 W 13th St, New York, NY, 10011, US",
    pickupSpot: "Front Door",
    pickupDate: "November 26",
    pickupTime: "8 PM",
    deliveryDate: "November 27",
    deliveryTime: "8 PM",
    detergent: "Classic Scented",
    hangDryItems: true,
    includeHangers: true,
    bagCount: "1 small",
    coverage: {
      type: "BASIC",
      perGarment: "$50/garment",
      maxOrder: "$300/order",
      included: true,
    },
  };

  if (!res?.success) {
    return <div>Order not found</div>;
  }

  const order = res?.data;
  return (
    <Suspense fallback={<OrderDetailsSkeleton />}>
      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {/* Order Status Header */}
        <div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <ClipboardList className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                ORDER PLACED
              </p>
              <h2 className="text-lg font-semibold text-foreground">
                {order?.status}
              </h2>
            </div>
          </div>

          <p className="text-sm text-primary mb-3">
            <strong className="text-black">ORDER ID:-</strong> {order?.orderId}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Ordered</span>
              <span className="text-sm text-primary">
                {formatDate(order?.createdAt)}
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

          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              We're finding you the perfect Laundry Pro based on your
              preferences. This usually happens within 60 minutes.
            </p>
          </div>
        </div>

        {/* Pickup Location */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold">Pickup Location</h3>
          </div>
          <div className="space-y-2 pl-2">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
              <span className="text-sm">{order?.pickupAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{order?.pickupSpot}</span>
            </div>
          </div>
        </div>

        {/* Delivery Speed */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Truck className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold">Delivery Speed</h3>
          </div>
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Pickup by {orderData.pickupTime} on
              </span>
              <span className="text-sm text-primary font-medium">
                {orderData.pickupDate}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="h-4 w-4 text-primary" />
              <span className="text-sm">
                Delivery by {orderData.deliveryTime} on
              </span>
              <span className="text-sm text-primary font-medium">
                {orderData.deliveryDate}
              </span>
            </div>
          </div>
        </div>

        {/* Laundry Care */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold">Laundry Care</h3>
          </div>
          <div className="space-y-2 pl-2">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-foreground rounded-full" />
              <span className="text-sm">{order?.detergent}</span>
            </div>
            {order?.washingTemp && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span className="text-sm">{order.washingTemp}°C wash</span>
              </div>
            )}
            {order?.foldingOption && (
              <div className="flex items-center gap-3">
                <Shirt className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm capitalize">
                  {order.foldingOption === "no-fold"
                    ? "Do not fold"
                    : order.foldingOption === "hangers"
                      ? "Everything on hangers"
                      : "Fold"}
                </span>
              </div>
            )}
            {order?.ironPieces != null && order.ironPieces > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-foreground rounded-full" />
                <span className="text-sm">
                  Ironing: {order.ironPieces} piece
                  {order.ironPieces > 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Machine Count */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold">Machine Count</h3>
          </div>
          <div className="pl-2">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {order?.machineCount ?? 1} washing machine
                {(order?.machineCount ?? 1) > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Coverage */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-base font-semibold">Coverage</h3>
          </div>
          <div className="pl-2 space-y-2">
            <p className="text-xs text-muted-foreground uppercase">
              {order?.coverageType}
            </p>
            <div className="flex items-center gap-3">
              <Shirt className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Covers {formatMoney(order?.coverageCost || 0)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">
                $
              </span>
              <span className="text-sm">
                Maximum {formatMoney(order?.coverageCost || 0)} / order
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span className="text-sm">Included FREE</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <OrderDetailsAction order={order as OrderExtends} />
      </div>
    </Suspense>
  );
};
