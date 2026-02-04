"use client";

import { useState } from "react";

import {
  ArrowLeft,
  Phone,
  MapPin,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import { Header } from "../layout/header";

export default function DriverOrderDetail({ id }: { id: string }) {
  const navigate = useRouter();
  const [status, setStatus] = useState("picked-up");

  // Mock data - would come from API
  const order = {
    id: id || "ORD-001",
    customerName: "Sarah Johnson",
    customerPhone: "+1 (555) 123-4567",
    pickupAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    pickupSpot: "Front desk",
    pickupInstructions:
      "Please call upon arrival. Building has secure entrance.",
    deliveryAddress: "123 Main Street, Apt 4B, New York, NY 10001",
    deliveryInstructions: "Leave at door if no answer",
    pickupTime: "2:00 PM - 4:00 PM",
    deliveryTime: "4:00 PM - 6:00 PM",
    date: "March 15, 2024",
    bags: {
      small: 0,
      regular: 2,
      large: 1,
    },
    oversizedItems: 1,
    detergent: "Classic Scented",
    delicateCycle: true,
    returnOnHangers: true,
    additionalRequests: "Please fold all items neatly",
    total: "$89.50",
    paymentStatus: "Paid",
    status: "picked-up",
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "picked-up":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "in-progress":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "out-for-delivery":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    // Would update via API
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate.push("/driver/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.date}
                  </p>
                </div>
                <Badge className={statusColor(status)}>
                  {status
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {order.customerName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.customerPhone}
                    </p>
                  </div>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                </div>

                <Separator />

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Update Status
                  </label>
                  <Select value={status} onValueChange={handleStatusUpdate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="picked-up">Picked Up</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="out-for-delivery">
                        Out for Delivery
                      </SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pickup Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Pickup Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Address
                </p>
                <p className="font-medium">{order.pickupAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Pickup Spot
                </p>
                <p>{order.pickupSpot}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Time Window
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {order.pickupTime}
                </p>
              </div>
              {order.pickupInstructions && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">
                    Special Instructions
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.pickupInstructions}
                  </p>
                </div>
              )}
              <Button className="w-full" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </CardContent>
          </Card>

          {/* Delivery Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-500" />
                Delivery Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Address
                </p>
                <p className="font-medium">{order.deliveryAddress}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Time Window
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {order.deliveryTime}
                </p>
              </div>
              {order.deliveryInstructions && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">
                    Delivery Instructions
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.deliveryInstructions}
                  </p>
                </div>
              )}
              <Button className="w-full" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Open in Maps
              </Button>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.bags.small > 0 && (
                <div className="flex justify-between">
                  <span>Small Bags</span>
                  <span className="font-semibold">{order.bags.small}</span>
                </div>
              )}
              {order.bags.regular > 0 && (
                <div className="flex justify-between">
                  <span>Regular Bags</span>
                  <span className="font-semibold">{order.bags.regular}</span>
                </div>
              )}
              {order.bags.large > 0 && (
                <div className="flex justify-between">
                  <span>Large Bags</span>
                  <span className="font-semibold">{order.bags.large}</span>
                </div>
              )}
              {order.oversizedItems > 0 && (
                <div className="flex justify-between">
                  <span>Oversized Items</span>
                  <span className="font-semibold">{order.oversizedItems}</span>
                </div>
              )}

              <Separator className="my-4" />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Laundry Care
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Detergent:</span>{" "}
                    {order.detergent}
                  </p>
                  {order.delicateCycle && (
                    <p className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Delicate Cycle
                    </p>
                  )}
                  {order.returnOnHangers && (
                    <p className="flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="h-4 w-4" />
                      Return on Hangers
                    </p>
                  )}
                </div>
              </div>

              {order.additionalRequests && (
                <div className="bg-muted p-3 rounded-lg mt-4">
                  <p className="text-sm font-medium mb-1">
                    Additional Requests
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.additionalRequests}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-primary">
                  {order.total}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {order.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
