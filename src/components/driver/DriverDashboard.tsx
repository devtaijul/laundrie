"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Package,
  TrendingUp,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Header } from "../layout/header";

const DriverDashboard = () => {
  const navigate = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<Record<string, string>>(
    {}
  );

  // Mock data - replace with actual API calls
  const stats = {
    totalDeliveries: 145,
    pending: 8,
    completedToday: 12,
    earnings: 1250,
  };

  const assignedParcels = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      customerName: "John Doe",
      customerPhone: "+1 234 567 8901",
      pickupAddress: "123 Main St, New York, NY 10001",
      deliveryAddress: "456 Oak Ave, Brooklyn, NY 11201",
      status: "pending",
      priority: "express",
      scheduledTime: "2:00 PM - 4:00 PM",
      bags: 3,
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      customerName: "Jane Smith",
      customerPhone: "+1 234 567 8902",
      pickupAddress: "789 Pine St, Queens, NY 11354",
      deliveryAddress: "321 Elm St, Manhattan, NY 10002",
      status: "picked_up",
      priority: "standard",
      scheduledTime: "4:00 PM - 6:00 PM",
      bags: 2,
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      customerName: "Mike Johnson",
      customerPhone: "+1 234 567 8903",
      pickupAddress: "654 Maple Dr, Bronx, NY 10451",
      deliveryAddress: "987 Cedar Ln, Staten Island, NY 10301",
      status: "in_transit",
      priority: "express",
      scheduledTime: "6:00 PM - 8:00 PM",
      bags: 5,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "picked_up":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "in_transit":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === "express"
      ? "bg-red-500/10 text-red-500 border-red-500/20"
      : "bg-muted text-muted-foreground border-border";
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
    // Here you would make an API call to update the status
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Driver Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your assigned deliveries and track your performance
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 md:mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Total Deliveries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.totalDeliveries}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-yellow-500">
                {stats.pending}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-green-500">
                {stats.completedToday}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-bold text-primary">
                ${stats.earnings}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assigned Parcels */}
        <Card>
          <CardHeader>
            <CardTitle>Assigned Parcels</CardTitle>
            <CardDescription>Your current delivery assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignedParcels.map((parcel) => (
                <Card key={parcel.id} className="border-2">
                  <CardContent className="p-4 md:p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">
                            {parcel.orderNumber}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{parcel.customerName}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{parcel.customerPhone}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge className={getPriorityColor(parcel.priority)}>
                            {parcel.priority}
                          </Badge>
                          <Badge
                            className={getStatusColor(
                              selectedStatus[parcel.id] || parcel.status
                            )}
                          >
                            {(
                              selectedStatus[parcel.id] || parcel.status
                            ).replace("_", " ")}
                          </Badge>
                        </div>
                      </div>

                      {/* Addresses */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-1 text-blue-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Pickup
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {parcel.pickupAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Delivery
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {parcel.deliveryAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Details and Actions */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{parcel.scheduledTime}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            <span>{parcel.bags} bags</span>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Select
                            value={selectedStatus[parcel.id] || parcel.status}
                            onValueChange={(value) =>
                              handleStatusChange(parcel.id, value)
                            }
                          >
                            <SelectTrigger className="w-full sm:w-[180px]">
                              <SelectValue placeholder="Update status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="picked_up">
                                Picked Up
                              </SelectItem>
                              <SelectItem value="in_transit">
                                In Transit
                              </SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 sm:flex-none"
                            onClick={() =>
                              navigate.push(`/driver/orders/${parcel.id}`)
                            }
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DriverDashboard;
