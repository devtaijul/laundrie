"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function OrderDetailsSkeleton() {
  return (
    <div className="max-w-md mx-auto px-6 py-8 space-y-8">
      {/* Order Status Header */}
      <div>
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center flex-shrink-0">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>

        <Skeleton className="h-4 w-32 mb-3" />

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      {/* Pickup Location */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-2 pl-2">
          <div className="flex items-start gap-3">
            <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Delivery Speed */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-2 pl-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Laundry Care */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="space-y-2 pl-2">
          <div className="flex items-center gap-3">
            <Skeleton className="w-2 h-2 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="bg-muted rounded-lg px-4 py-3 mt-3 flex items-center gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Bag Count */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="pl-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>

      {/* Coverage */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="pl-2 space-y-2">
          <Skeleton className="h-3 w-24" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
    </div>
  );
}
