"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const DriversGridSkeleton = () => {
  // You can tweak the number of skeleton cards here
  const skeletonItems = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {skeletonItems.map((_, index) => (
        <Card
          key={index}
          className={index === 5 ? "border-2 border-primary" : ""}
        >
          <CardContent className="p-6 space-y-4">
            {/* Header: Avatar + name + vehicle + action button */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <Skeleton className="h-12 w-12 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" /> {/* name */}
                  <Skeleton className="h-3 w-24" /> {/* vehicle */}
                </div>
              </div>

              {/* More button */}
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>

            {/* Location */}
            <div className="space-y-1">
              <Skeleton className="h-3 w-16" /> {/* label: Location */}
              <Skeleton className="h-4 w-40" /> {/* location value */}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
