import { TabsContent } from "@/components/ui/tabs";
import { AdminNotification } from "./AdminNotification";
import { CustomerNotification } from "./CustomerNotification";
import { SMSConfiguration } from "./SMSConfiguration";
export const NotificationTab = () => {
  return (
    <TabsContent value="notifications" className="space-y-6">
      <AdminNotification />

      {/*  <EmailConfiguration /> */}

      <SMSConfiguration />

      <CustomerNotification />
    </TabsContent>
  );
};
