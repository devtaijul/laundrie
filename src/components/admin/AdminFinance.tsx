import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, MoreVertical, Search, Upload } from "lucide-react";

const payments = [
  {
    id: "PAY-005678",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 15, 2025",
    amount: "$350.00",
    status: "Paid",
  },
  {
    id: "PAY-008912",
    orderId: "#8475783",
    payWith: "Bank",
    date: "October 22, 2025",
    amount: "$450.00",
    status: "Paid",
  },
  {
    id: "PAY-010345",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 5, 2025",
    amount: "$200.00",
    status: "Decline",
  },
  {
    id: "PAY-015234",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 30, 2025",
    amount: "$150.00",
    status: "Paid",
  },
  {
    id: "PAY-019456",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 12, 2025",
    amount: "$700.00",
    status: "Paid",
  },
  {
    id: "PAY-013789",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 18, 2025",
    amount: "$300.00",
    status: "Paid",
  },
  {
    id: "PAY-014901",
    orderId: "#8475783",
    payWith: "Bank",
    date: "October 2, 2025",
    amount: "$600.00",
    status: "Paid",
  },
  {
    id: "PAY-017890",
    orderId: "#8475783",
    payWith: "Bank",
    date: "October 27, 2025",
    amount: "$400.00",
    status: "Decline",
  },
  {
    id: "PAY-002567",
    orderId: "#8475783",
    payWith: "Card",
    date: "October 9, 2025",
    amount: "$250.00",
    status: "Paid",
  },
  {
    id: "PAY-019123",
    orderId: "#8475783",
    payWith: "Mobile Wallet",
    date: "October 24, 2025",
    amount: "$100.00",
    status: "Paid",
  },
];

const AdminFinance = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Payment History
            </h1>
            <p className="text-sm text-muted-foreground">
              Monitor and manage all Finance info
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              October 2025
            </Button>
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search customer"
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="decline">Decline</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4">
                    <Checkbox />
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Pay ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Pay With
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {payments.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className={`border-b border-border hover:bg-muted/50 ${index === 1 ? "bg-blue-50/50" : ""}`}
                  >
                    <td className="py-3 px-4">
                      <Checkbox checked={index === 1} />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {payment.id}
                    </td>
                    <td className="py-3 px-4 text-sm">{payment.orderId}</td>
                    <td className="py-3 px-4 text-sm">{payment.payWith}</td>
                    <td className="py-3 px-4 text-sm">{payment.date}</td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {payment.amount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          payment.status === "Paid"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {payment.status}
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

          <div className="flex items-center justify-center gap-2 py-4 border-t border-border">
            <Button variant="outline" size="icon">
              «
            </Button>
            <Button variant="outline" size="icon">
              ‹
            </Button>
            <Button variant="default" size="icon" className="bg-primary">
              1
            </Button>
            <Button variant="outline" size="icon">
              2
            </Button>
            <Button variant="outline" size="icon">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="icon">
              10
            </Button>
            <Button variant="outline" size="icon">
              ›
            </Button>
            <Button variant="outline" size="icon">
              »
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminFinance;
