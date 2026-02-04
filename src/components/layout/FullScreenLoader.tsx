import { Loader2 } from "lucide-react";

interface FullScreenLoaderProps {
  message?: string;
  submessage?: string;
}

export function FullScreenLoader({
  message = "Please wait...",
  submessage,
}: FullScreenLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{message}</h2>
          {submessage && (
            <p className="text-sm text-muted-foreground max-w-md">
              {submessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
