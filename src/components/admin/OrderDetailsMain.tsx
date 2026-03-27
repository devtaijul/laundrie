import { CheckCircle2, Clock, MapPin, Phone, Truck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { AssignDeliveryMan } from "./AssignDeliveryMan";
import { Order } from "@/generated/prisma";
import { OrderExtends } from "@/types/global-type";
import { formatMoney } from "@/lib/utils";

export const OrderDetailsMain = ({ order }: { order: OrderExtends | null }) => {
  console.log("order", order);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <div className="w-full">
            <div className="flex items-center justify-between p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-foreground">
                Review Order
              </h2>
            </div>
          </div>

          <div>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
              {/* Time Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Pickup Time
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get it today
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Delivery Time
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2pm Tomorrow
                    </p>
                  </div>
                </div>
              </div>

              {/* Address Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Pickup Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order?.pickupAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Delivery Address
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order?.pickupAddress}
                    </p>
                  </div>
                </div>
              </div>

              {/* Laundry Care Details */}
              <div className="pt-4 border-t border-border">
                <h3 className="text-base font-semibold text-foreground mb-3">
                  Laundry Care details
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                    <span>Detergent: {order?.detergent}</span>
                  </li>
                  {order?.washingTemp && (
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                      <span>Temperature: {order.washingTemp}°C</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                    <span>
                      {order?.delicateCycle ? "Delicate cycle" : "Normal cycle"}
                    </span>
                  </li>
                  {order?.foldingOption && (
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                      <span>
                        Finishing:{" "}
                        {order.foldingOption === "no-fold"
                          ? "Do not fold"
                          : order.foldingOption === "hangers"
                            ? "Everything on hangers"
                            : "Fold"}
                      </span>
                    </li>
                  )}
                  {order?.ironPieces != null && order.ironPieces > 0 && (
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                      <span>
                        Ironing: {order.ironPieces} piece
                        {order.ironPieces > 1 ? "s" : ""}
                      </span>
                    </li>
                  )}
                  {order?.additionalRequests && (
                    <li className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0"></span>
                      <span>{order.additionalRequests}</span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Delivery Information Card */}
        {order?.riderId && (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Delivery Information
              </h2>

              {/* Assigned Driver */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Assigned Driver
                  </p>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=john" />
                      <AvatarFallback>{order?.rider.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        {order?.rider.name}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {order?.rider.phone}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Delivery Status */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    Delivery Status
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          Order Picked Up
                        </p>
                        <p className="text-xs text-muted-foreground">
                          March 15, 2024 at 2:30 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Truck className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          In Transit
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Currently being processed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          Out for Delivery
                        </p>
                        <p className="text-xs text-muted-foreground">Pending</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      Estimated Delivery
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      2pm Tomorrow
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="space-y-4">
        {/* Cost List Card */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Cost List
            </h3>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">
                In Progress
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                Unfulfillment
              </Badge>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Delivered
              </Badge>
            </div>

            {/* Cost Details */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Weight:</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Overhead cost</span>
                <span className="font-medium">
                  {formatMoney(order?.oversizedCost || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">
                  Processing Fee (Premium)
                </span>
                <span className="font-medium">
                  {formatMoney(order?.deliveryFee || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">
                  {formatMoney(order?.subtotal || 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tax & Safety Fee</span>
                <span className="font-medium">
                  {formatMoney(order?.tax || 0)}
                </span>
              </div>
              {/*  <div className="flex justify-between items-center">
                <span className="text-cyan-600">Credits Applied</span>
                <span className="font-medium text-cyan-600">-$10.00</span>
              </div> */}
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <span className="font-semibold text-foreground">
                  Total Cost:
                </span>
                <span className="font-bold text-lg">
                  {formatMoney(order?.totalCents || 0, true)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Driver Card */}
        <AssignDeliveryMan />
      </div>
    </div>
  );
};
