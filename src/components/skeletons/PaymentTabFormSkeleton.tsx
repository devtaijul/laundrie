import { Skeleton } from "@/components/ui/skeleton";

export const PaymentTabFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Payment Methods Section */}
      <div className="space-y-4">
        {/* 1. Cash on Delivery */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Title */}
            <Skeleton className="h-3 w-40" /> {/* Subtitle */}
          </div>
          <Skeleton className="h-6 w-12 rounded-full" /> {/* Switch */}
        </div>

        {/* 2. Credit/Debit Card */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* 3. Digital Wallets */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-44" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        {/* 4. Bank Transfer */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>

      {/* Stripe Keys Section */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Save Button */}
      <Skeleton className="h-10 w-full md:w-48 rounded-md" />
    </div>
  );
};
