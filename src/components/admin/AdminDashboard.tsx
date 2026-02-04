"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreVertical, TrendingDown, TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "Jan", total: 35, delivered: 30 },
  { month: "Feb", total: 45, delivered: 38 },
  { month: "Mar", total: 42, delivered: 35 },
  { month: "Apr", total: 48, delivered: 40 },
  { month: "May", total: 52, delivered: 45 },
  { month: "Jun", total: 50, delivered: 42 },
  { month: "Jul", total: 48, delivered: 40 },
  { month: "Aug", total: 55, delivered: 48 },
  { month: "Sep", total: 58, delivered: 52 },
];

const recentOrders = [
  {
    id: "#83947218",
    customer: "Boston Brennan",
    date: "October 15, 2025",
    payment: "Unpaid",
    items: "2 items",
    value: "$125.60",
    status: "Unfulfillment",
  },
  {
    id: "#29283147",
    customer: "Mina Knowles",
    date: "October 5, 2025",
    payment: "Paid",
    items: "3 items",
    value: "$45.10",
    status: "In-Progress",
  },
  {
    id: "#59384720",
    customer: "Deborah Joyner",
    date: "October 22, 2025",
    payment: "Paid",
    items: "3 items",
    value: "$82.50",
    status: "Unfulfillment",
  },
  {
    id: "#17492083",
    customer: "Karlie Craft",
    date: "October 30, 2025",
    payment: "Paid",
    items: "8 items",
    value: "$102.30",
    status: "In-Progress",
  },
  {
    id: "#64538729",
    customer: "Kendrick Burch",
    date: "October 12, 2025",
    payment: "Paid",
    items: "8 items",
    value: "$163.40",
    status: "In-Progress",
  },
  {
    id: "#28409371",
    customer: "London Thornton",
    date: "October 18, 2025",
    payment: "Paid",
    items: "9 items",
    value: "$278.90",
    status: "In-Progress",
  },
];

const AdminDashboard = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Here is the summary of overall data
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Total Orders Today
                </p>
                <p className="text-3xl font-bold">45</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>12.87%</span>
                  <span className="text-muted-foreground">than yesterday</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Delivered</p>
                <p className="text-3xl font-bold">1,245</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>12.87%</span>
                  <span className="text-muted-foreground">than last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold">$15,698</p>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>12.87%</span>
                  <span className="text-muted-foreground">than last month</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Total Customer</p>
                <p className="text-3xl font-bold">817</p>
                <div className="flex items-center gap-1 text-sm text-destructive">
                  <TrendingDown className="h-4 w-4" />
                  <span>10.65%</span>
                  <span className="text-muted-foreground">than last month</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Orders</CardTitle>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">
                    Total Orders
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-amber-500" />
                  <span className="text-sm text-muted-foreground">
                    Total Delivered
                  </span>
                </div>
              </div>
            </div>
            <Select defaultValue="year">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="delivered"
                  stroke="#f59e0b"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <div className="flex items-center gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="link" className="text-primary">
                See More
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2">
                      <Checkbox />
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Customer Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Order Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Payment
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Items
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Order Value
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-left py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-border hover:bg-muted/50"
                    >
                      <td className="py-3 px-2">
                        <Checkbox />
                      </td>
                      <td className="py-3 px-4 text-sm">{order.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.customer}`}
                            />
                            <AvatarFallback>{order.customer[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{order.customer}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{order.date}</td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            order.payment === "Paid" ? "default" : "secondary"
                          }
                          className={
                            order.payment === "Paid"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }
                        >
                          {order.payment}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm">{order.items}</td>
                      <td className="py-3 px-4 text-sm font-medium">
                        {order.value}
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          variant={
                            order.status === "In-Progress"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            order.status === "In-Progress"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
