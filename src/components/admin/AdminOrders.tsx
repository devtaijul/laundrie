import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ORDER_STATUS_OPTIONS } from "@/types/enums";
import { Calendar, Filter, Search, Upload } from "lucide-react";
import { OrderStatusTab } from "./OrderStatusTab";
import { OrderTable } from "./OrderTable";
import { Suspense } from "react";
import { OrdersTableSkeleton } from "../skeletons/OrdersTableSkeleton";
import { OrderStatus } from "@/generated/prisma";

const AdminOrders = async ({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) => {
  return (
    <>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Order List</h1>
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

        <Tabs defaultValue="ALL" className="w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <OrderStatusTab />

            <div className="flex gap-2">
              <div className="relative flex-1 sm:flex-initial sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transaction"
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {[{ label: "All", value: "ALL" }, ...ORDER_STATUS_OPTIONS].map(
            (option) => (
              <TabsContent key={option.value} value={option.value}>
                <Suspense fallback={<OrdersTableSkeleton />}>
                  <OrderTable
                    status={option.value as OrderStatus}
                    search={search}
                    page={page}
                  />
                </Suspense>
              </TabsContent>
            )
          )}
        </Tabs>
      </div>
    </>
  );
};

export default AdminOrders;
