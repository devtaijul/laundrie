import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SmsConfigurationForm } from "./SmsConfigurationForm";
import { getSmsConfigurationSetting } from "@/actions/setting.actions";

export const SMSConfiguration = async () => {
  const data = await getSmsConfigurationSetting();
  if (!data.success) {
    return <div>{data.message}</div>;
  }
  const SMSConfiguration = data.data;
  return (
    <Card>
      <CardHeader>
        <CardTitle>SMS Configuration</CardTitle>
        <CardDescription>
          Configure SMS gateway for notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <SmsConfigurationForm smsConfiguration={SMSConfiguration} />
      </CardContent>
    </Card>
  );
};
