import { Skeleton } from "@/components/ui/skeleton";

export const BusinessTabFormSkeleton = () => {
  return (
    <div className="space-y-4 animate-in fade-in-50">
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" /> {/* Label */}
          <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Row 3 */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>

      {/* Row 5 - Logo + Favicon Upload */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-28" /> {/* Label */}
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-4">
            <Skeleton className="h-16 w-16 mx-auto rounded-lg" /> {/* Icon */}
            <Skeleton className="h-9 w-32 mx-auto rounded-md" /> {/* Button */}
            <Skeleton className="h-3 w-40 mx-auto" /> {/* Text */}
          </div>
        </div>

        {/* Favicon */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />

          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center space-y-4">
            <Skeleton className="h-16 w-16 mx-auto rounded-lg" />
            <Skeleton className="h-9 w-36 mx-auto rounded-md" />
            <Skeleton className="h-3 w-44 mx-auto" />
          </div>
        </div>
      </div>

      {/* About Business */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" /> {/* Label */}
        <Skeleton className="h-24 w-full rounded-md" /> {/* Textarea */}
      </div>

      {/* Save Button */}
      <Skeleton className="h-10 w-full md:w-40 rounded-md" />
    </div>
  );
};
