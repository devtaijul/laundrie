"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Package,
  Phone,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

const AdminDriverDetail = ({ id }: { id?: string }) => {
  const navigate = useRouter();

  // Mock driver data
  const driver = {
    id: id || "1",
    name: "Kaiya Curtis",
    email: "kaiya.curtis@laundrie.com",
    phone: "+1 234 567 8900",
    vehicle: "Bike - XYZ-5678",
    location: "TY35 Avenue GG London Center",
    status: "active",
    currentParcels: 5,
    completedDeliveries: 142,
    totalEarnings: "€3,450",
    rating: 4.8,
  };

  // Mock current parcels
  const currentParcels = [
    {
      id: "#12345",
      customer: "John Doe",
      pickup: "123 Main St",
      delivery: "456 Oak Ave",
      status: "picked_up",
    },
    {
      id: "#12346",
      customer: "Jane Smith",
      pickup: "789 Elm St",
      delivery: "321 Pine Rd",
      status: "in_transit",
    },
    {
      id: "#12347",
      customer: "Bob Johnson",
      pickup: "555 Maple Dr",
      delivery: "777 Cedar Ln",
      status: "picked_up",
    },
    {
      id: "#12348",
      customer: "Alice Brown",
      pickup: "999 Birch Ct",
      delivery: "111 Ash St",
      status: "pending_pickup",
    },
    {
      id: "#12349",
      customer: "Charlie Wilson",
      pickup: "222 Spruce Way",
      delivery: "888 Walnut Blvd",
      status: "in_transit",
    },
  ];

  // Mock recent deliveries
  const recentDeliveries = [
    {
      id: "#12340",
      customer: "Sarah Davis",
      date: "2024-01-20",
      amount: "€45.00",
    },
    {
      id: "#12341",
      customer: "Mike Taylor",
      date: "2024-01-20",
      amount: "€62.00",
    },
    {
      id: "#12342",
      customer: "Emma Wilson",
      date: "2024-01-19",
      amount: "€38.50",
    },
    {
      id: "#12343",
      customer: "David Lee",
      date: "2024-01-19",
      amount: "€55.00",
    },
    {
      id: "#12344",
      customer: "Lisa Anderson",
      date: "2024-01-18",
      amount: "€41.00",
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      picked_up: {
        label: "Picked Up",
        className: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
      },
      in_transit: {
        label: "In Transit",
        className: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
      },
      pending_pickup: {
        label: "Pending",
        className: "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20",
      },
    };
    return variants[status] || variants.pending_pickup;
  };

  return (
    <div>
      <div className="p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate.push("/admin/drivers")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">
              Driver Details
            </h1>
            <p className="text-sm text-muted-foreground">
              View and manage driver information
            </p>
          </div>
        </div>

        {/* Driver Info Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24 shrink-0">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.name}`}
                />
                <AvatarFallback className="text-2xl">
                  {driver.name[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {driver.name}
                    </h2>
                    <p className="text-primary font-medium">{driver.vehicle}</p>
                  </div>
                  <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 w-fit">
                    Active
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{driver.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{driver.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{driver.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-orange-500/10">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Current Parcels
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {driver.currentParcels}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {driver.completedDeliveries}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-foreground">
                    {driver.rating}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Total Earnings
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {driver.totalEarnings}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Parcels */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Current Parcels ({driver.currentParcels})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Pickup
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Delivery
                    </TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentParcels.map((parcel) => {
                    const statusInfo = getStatusBadge(parcel.status);
                    return (
                      <TableRow key={parcel.id}>
                        <TableCell className="font-medium">
                          {parcel.id}
                        </TableCell>
                        <TableCell>{parcel.customer}</TableCell>
                        <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                          {parcel.pickup}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {parcel.delivery}
                        </TableCell>
                        <TableCell>
                          <Badge className={statusInfo.className}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Recent Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDeliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">
                        {delivery.id}
                      </TableCell>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {delivery.date}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {delivery.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDriverDetail;
