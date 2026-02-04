import { Skeleton } from "@/components/ui/skeleton";

export const NewOrderSectionSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 space-y-8">
      {/* Circle Button Skeleton */}
      <div className="text-center space-y-6">
        <div className="w-64 h-64 rounded-full border-4 border-border bg-muted flex flex-col items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-3">
            <Skeleton className="h-5 w-32" /> {/* NEW ORDER text */}
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-28" /> {/* do my laundry */}
              <Skeleton className="h-4 w-4 rounded-full" /> {/* arrow icon */}
            </div>
          </div>
        </div>

        {/* Credits Banner Skeleton */}
        <div className="inline-block">
          <div className="bg-muted rounded-full px-6 py-2">
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
      </div>
    </div>
  );
};
