import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEmailConfigurationSetting } from "@/actions/setting.actions";
import { EmailConfigurationForm } from "./EmailConfigurationForm";

export const EmailConfiguration = async () => {
  const data = await getEmailConfigurationSetting();

  if (!data.success || !data.data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Email Configuration</CardTitle>
          <CardDescription>
            Configure SMTP settings for sending emails
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{data.message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure SMTP settings for sending emails
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EmailConfigurationForm emailConfig={data.data} />
      </CardContent>
    </Card>
  );
};
