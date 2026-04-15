import { getCustomers } from "@/actions/customer.actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pagination } from "@/components/admin/Pagination";
import { CustomerBanButton } from "@/components/admin/CustomerBanButton";
import { CustomerFilters } from "@/components/admin/CustomerFilters";
import { PAGES } from "@/config/pages.config";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import { Users } from "lucide-react";
import Link from "next/link";

const PAGE_SIZE = 10;

const AdminCustomers = async ({
  search = "",
  status = "all",
  page = 1,
}: {
  search?: string;
  status?: "all" | "active" | "banned";
  page?: number;
}) => {
  const res = await getCustomers({ search, status, page, pageSize: PAGE_SIZE });

  const isEmpty = !res.success || !res.data || res.data.customers.length === 0;
  const customers = res.success && res.data ? res.data.customers : [];
  const totalPages = res.success && res.data ? res.data.totalPages : 1;
  const totalCount = res.success && res.data ? res.data.totalCount : 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">
            {totalCount} customer{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <CustomerFilters currentSearch={search} currentStatus={status} />

      {/* Table */}
      {isEmpty ? (
        <Card className="p-12 flex flex-col items-center gap-3 text-center">
          <Users className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm font-medium text-muted-foreground">
            No customers found
          </p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search or filter.
          </p>
        </Card>
      ) : (
        <div className="border border-border rounded-xl bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Customer
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                    Joined
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Orders
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
                    Total Spent
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {customers.map((c) => {
                  const isBanned = !!c.bannedAt;
                  const initials = (c.name || "?")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase();

                  return (
                    <tr
                      key={c.id}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="text-xs">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <Link
                              href={PAGES.ADMIN.CUSTOMER_DETAIL(c.id)}
                              className="font-medium hover:text-primary truncate block"
                            >
                              {c.name}
                            </Link>
                            <span className="text-xs text-muted-foreground truncate block">
                              {c.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-muted-foreground hidden md:table-cell">
                        {c.phone ?? "—"}
                      </td>

                      <td className="py-3 px-4 text-muted-foreground hidden lg:table-cell whitespace-nowrap">
                        {format(new Date(c.createdAt), "MMM d, yyyy")}
                      </td>

                      <td className="py-3 px-4">
                        {isBanned ? (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-0">
                            Banned
                          </Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">
                            Active
                          </Badge>
                        )}
                      </td>

                      <td className="py-3 px-4 hidden sm:table-cell">
                        {c.totalOrders}
                      </td>

                      <td className="py-3 px-4 font-medium hidden sm:table-cell">
                        {formatMoney(c.totalSpentCents / 100)}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={PAGES.ADMIN.CUSTOMER_DETAIL(c.id)}
                            className="text-xs text-primary hover:underline font-medium"
                          >
                            View
                          </Link>
                          <CustomerBanButton
                            customerId={c.id}
                            isBanned={isBanned}
                            variant="outline"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath="/admin/customers"
            search={search}
            status={status !== "all" ? status : undefined}
          />
        </div>
      )}
    </div>
  );
};

export default AdminCustomers;
