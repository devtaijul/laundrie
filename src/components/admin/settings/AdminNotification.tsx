import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminNotificationForm } from "./AdminNotificationForm";
import { getAdminNotificationSetting } from "@/actions/setting.actions";
import { Suspense } from "react";

export const AdminNotification = async () => {
  const data = await getAdminNotificationSetting();
  if (!data.success) {
    return <div>{data.message}</div>;
  }
  const adminNotification = data.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Notifications</CardTitle>
        <CardDescription>Manage how you receive notifications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={<div>Loading...</div>}>
          <AdminNotificationForm adminNotification={adminNotification} />
        </Suspense>
      </CardContent>
    </Card>
  );
};
