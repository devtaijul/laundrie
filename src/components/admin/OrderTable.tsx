import { getOrders } from "@/actions/order.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { OrderStatus } from "@/generated/prisma";
import { OrderExtends } from "@/types/global-type";
import { Card } from "../ui/card";
import { OrderRow } from "./OrderRow";
import { Pagination } from "./Pagination";

export const OrderTable = async ({
  status,
  search,
  page = 1,
  pageSize = 10,
}: {
  status?: OrderStatus | "ALL";
  search?: string;
  page?: number;
  pageSize?: number;
}) => {
  /*   const orders = [
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
    {
      id: "#93758246",
      customer: "Ximena Dodson",
      date: "October 3, 2025",
      payment: "Paid",
      items: "6 items",
      value: "$149.90",
      status: "In-Progress",
    },
    {
      id: "#48567293",
      customer: "Kobe Lane",
      date: "October 27, 2025",
      payment: "Unpaid",
      items: "2 items",
      value: "$30.50",
      status: "Unfulfillment",
    },
    {
      id: "#17489352",
      customer: "Duncan England",
      date: "October 9, 2025",
      payment: "Paid",
      items: "5 items",
      value: "$88.20",
      status: "In-Progress",
    },
    {
      id: "#65029184",
      customer: "Deegan Crane",
      date: "October 25, 2025",
      payment: "Paid",
      items: "7 items",
      value: "$99.90",
      status: "Delivered",
    },
  ];
 */
  const res = await getOrders({ search, status, page, pageSize });

  if (!res?.success) {
    return (
      <div className="px-4 py-6 -mt-4 space-y-4 max-w-lg mx-auto">
        <Card className="p-6 bg-background/95 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">Order not found</p>
        </Card>
      </div>
    );
  }

  const { orders, totalPages, totalCount } = res.data as {
    orders: OrderExtends[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };

  const currentPage = page;

  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
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
              {/*        <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Items
              </th> */}
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Order Value
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="bg-background">
            {orders?.length > 0 ? (
              orders?.map((order, idx) => (
                <OrderRow
                  key={order.id}
                  order={order as OrderExtends}
                  index={idx}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="text-center py-4">
                  <p className="text-sm text-muted-foreground">
                    No orders found
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/admin/orders"
        search={search}
        status={status}
      />
    </div>
  );
};
