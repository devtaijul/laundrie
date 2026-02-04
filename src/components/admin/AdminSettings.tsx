import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BusinessTab } from "./settings/BusinessTab";
import { NotificationTab } from "./settings/NotificationTab";
import { PaymentTab } from "./settings/PaymentTab";
import { SecurityTab } from "./settings/SecurityTab";

export default function AdminSettings() {
  return (
    <div className="p-6  mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure system settings and preferences
        </p>
      </div>

      <Tabs className="w-full" defaultValue="notifications">
        <TabsList className="grid w-full max-w-md grid-cols-4 mb-6">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Business Tab */}
        <BusinessTab />

        {/* Payments Tab */}
        <PaymentTab />

        {/* Notifications Tab */}
        <NotificationTab />

        {/* Security Tab */}
        <SecurityTab />
      </Tabs>
    </div>
  );
}
