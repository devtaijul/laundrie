"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function AdminOrderDetailSkeleton() {
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <div className="flex items-center justify-between p-4 sm:p-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </div>

            <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
              {/* Time Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>

              {/* Address Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-full" />
              </div>

              {/* Laundry Care */}
              <div className="pt-4 border-t border-border space-y-3">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6">
              {/* Title */}
              <Skeleton className="h-5 w-40 mb-4" />

              <div className="space-y-4">
                {/* Assigned Driver */}
                <div>
                  <Skeleton className="h-4 w-32 mb-3" />{" "}
                  {/* "Assigned Driver" */}
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                    {/* Avatar */}
                    <Skeleton className="h-12 w-12 rounded-full" />

                    {/* Name + Phone */}
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" /> {/* Name */}
                      <Skeleton className="h-3 w-40" /> {/* Phone text */}
                    </div>

                    {/* Call Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="pointer-events-none"
                    >
                      <Skeleton className="h-4 w-4 rounded-sm" />
                    </Button>
                  </div>
                </div>

                {/* Delivery Status */}
                <div>
                  <Skeleton className="h-4 w-32 mb-3" />{" "}
                  {/* "Delivery Status" */}
                  <div className="space-y-3">
                    {/* Status row 1 */}
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>

                    {/* Status row 2 */}
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>

                    {/* Status row 3 */}
                    <div className="flex items-start gap-3">
                      <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-1">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Estimated Delivery */}
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">
          {/* Cost List */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Skeleton className="h-5 w-28" />

              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>

              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}

                <div className="flex justify-between pt-2 border-t">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Assign Driver */}
          <Card>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <Skeleton className="h-5 w-32" />

              {/* Search */}
              <Skeleton className="h-10 w-full" />

              {/* Driver List */}
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>

              <Skeleton className="h-10 w-full mt-6" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
