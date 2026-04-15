import { TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { AdminNotification } from "./AdminNotification";
import { CustomerNotification } from "./CustomerNotification";
import { EmailConfiguration } from "./EmailConfiguration";
import { SMSConfiguration } from "./SMSConfiguration";

const CardSkeleton = () => (
  <div className="animate-pulse rounded-lg border border-border p-6 space-y-4">
    <div className="h-5 bg-muted rounded w-48" />
    <div className="h-4 bg-muted rounded w-64" />
    <div className="space-y-3 mt-2">
      <div className="h-10 bg-muted rounded" />
      <div className="h-10 bg-muted rounded" />
    </div>
  </div>
);

export const NotificationTab = () => {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <Suspense fallback={<CardSkeleton />}>
        <AdminNotification />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <EmailConfiguration />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <SMSConfiguration />
      </Suspense>

      <Suspense fallback={<CardSkeleton />}>
        <CustomerNotification />
      </Suspense>
    </TabsContent>
  );
};
