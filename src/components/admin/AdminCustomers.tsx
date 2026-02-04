import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const customers = [
  {
    id: "CUS-005678",
    name: "Duncan England",
    phone: "+15679012345",
    date: "August 24, 2024",
    status: "Active",
    orders: 29,
    spent: "$1,250.75",
  },
  {
    id: "CUS-008912",
    name: "Deborah Joyner",
    phone: "+17890123456",
    date: "August 24, 2024",
    status: "Active",
    orders: 31,
    spent: "$2,312.95",
  },
  {
    id: "CUS-010345",
    name: "Kendrick Burch",
    phone: "+15678901234",
    date: "August 24, 2024",
    status: "Inactive",
    orders: 21,
    spent: "$1,009.25",
  },
  {
    id: "CUS-015234",
    name: "Deegan Crane",
    phone: "+16780123456",
    date: "August 24, 2024",
    status: "Active",
    orders: 12,
    spent: "$982.85",
  },
  {
    id: "CUS-019456",
    name: "Karlie Craft",
    phone: "+14568901234",
    date: "August 24, 2024",
    status: "Active",
    orders: 45,
    spent: "$5,837.95",
  },
  {
    id: "CUS-013789",
    name: "Mina Knowles",
    phone: "+10124567890",
    date: "August 23, 2024",
    status: "Active",
    orders: 24,
    spent: "$1,143.75",
  },
  {
    id: "CUS-014901",
    name: "Boston Brennan",
    phone: "+14567890123",
    date: "August 23, 2024",
    status: "Active",
    orders: 43,
    spent: "$5,342.65",
  },
  {
    id: "CUS-017890",
    name: "Kobe Lane",
    phone: "+11234567890",
    date: "August 23, 2024",
    status: "Inactive",
    orders: 35,
    spent: "$3,465.65",
  },
  {
    id: "CUS-002567",
    name: "London Thornton",
    phone: "+13456789012",
    date: "August 23, 2024",
    status: "Active",
    orders: 22,
    spent: "$1,102.35",
  },
  {
    id: "CUS-019123",
    name: "Ximena Dodson",
    phone: "+12345679901",
    date: "August 23, 2024",
    status: "Active",
    orders: 11,
    spent: "$876.95",
  },
];

const AdminCustomers = () => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customers</h1>
            <p className="text-sm text-muted-foreground">
              Monitor and manage all customer orders in one place.
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
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
                    ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Customer Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Phone Number
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Registration Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Total Orders
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Total Spend
                  </th>
                  <th className="text-left py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="bg-background">
                {customers.map((customer, index) => (
                  <tr
                    key={customer.id}
                    className={`border-b border-border hover:bg-muted/50 ${index === 1 ? "bg-blue-50/50" : ""}`}
                  >
                    <td className="py-3 px-4">
                      <Checkbox checked={index === 1} />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {customer.id}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`}
                          />
                          <AvatarFallback>{customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{customer.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{customer.phone}</td>
                    <td className="py-3 px-4 text-sm">{customer.date}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{customer.orders}</td>
                    <td className="py-3 px-4 text-sm font-medium">
                      {customer.spent}
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

export default AdminCustomers;
