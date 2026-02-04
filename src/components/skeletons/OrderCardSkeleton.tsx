"use client";

import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const OrderCardSkeleton = () => {
  return (
    <Card className="bg-background/95 backdrop-blur-sm">
      <div className="!p-4 space-y-4">
        {/* Top Section */}
        <div className="flex items-center justify-between">
          {/* Left side: Icon + texts */}
          <div className="flex items-center gap-3">
            {/* Icon Box */}
            <Skeleton className="w-12 h-12 rounded-xl" />

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" /> {/* order id */}
              <Skeleton className="h-3 w-24" /> {/* date */}
            </div>
          </div>

          {/* Status Badge */}
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Items section */}
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-40" />

        {/* Bottom Section: Total + Arrow */}
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-5 w-16" /> {/* total */}
          <Skeleton className="h-5 w-5 rounded-md" /> {/* chevron */}
        </div>
      </div>
    </Card>
  );
};
