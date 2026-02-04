import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomerNotificationForm } from "./CustomerNotificationForm";
import { getCustomerNotificationSetting } from "@/actions/setting.actions";

export const CustomerNotification = async () => {
  const data = await getCustomerNotificationSetting();
  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const customerNotification = data.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Notifications</CardTitle>
        <CardDescription>Configure what customers receive</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CustomerNotificationForm customerNotification={customerNotification} />
      </CardContent>
    </Card>
  );
};
