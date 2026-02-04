export default function OrderSuccessSkeleton() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Icon Skeleton */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-muted-foreground/20" />
          </div>
        </div>

        {/* Title + Subtitle Skeleton */}
        <div className="flex flex-col items-center space-y-3">
          <div className="h-6 w-48 bg-muted rounded-md" /> {/* title */}
          <div className="h-4 w-64 bg-muted rounded-md" />{" "}
          {/* subtitle line 1 */}
          <div className="h-4 w-52 bg-muted rounded-md" />{" "}
          {/* subtitle line 2 */}
        </div>

        {/* Order Total Box Skeleton */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 bg-muted-foreground/20 rounded-md" />
            <div className="h-5 w-16 bg-muted-foreground/20 rounded-md" />
          </div>
        </div>

        {/* Redirect Placeholder Skeleton */}
        <div className="h-4 w-40 mx-auto bg-muted-foreground/20 rounded-md" />
      </div>
    </div>
  );
}
