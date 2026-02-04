"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const OrdersTableSkeleton = () => {
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              {Array.from({ length: 9 }).map((_, i) => (
                <th key={i} className="text-left py-3 px-4">
                  <Skeleton className="h-4 w-24" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="bg-background">
            {Array.from({ length: 6 }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                {/* Checkbox */}
                <td className="py-3 px-4">
                  <Skeleton className="h-5 w-5 rounded-sm" />
                </td>

                {/* Order ID */}
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-28" />
                </td>

                {/* Customer Name + Avatar */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </td>

                {/* Order Date */}
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-24" />
                </td>

                {/* Payment Badge */}
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-16 rounded-md" />
                </td>

                {/* Items */}
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-20" />
                </td>

                {/* Order Value */}
                <td className="py-3 px-4">
                  <Skeleton className="h-4 w-16" />
                </td>

                {/* Status Badge */}
                <td className="py-3 px-4">
                  <Skeleton className="h-6 w-20 rounded-md" />
                </td>

                {/* Action Button */}
                <td className="py-3 px-4">
                  <Skeleton className="h-8 w-8 rounded-md" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4 border-t border-border">
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
        <Skeleton className="h-9 w-9 rounded-md" />
      </div>
    </div>
  );
};
