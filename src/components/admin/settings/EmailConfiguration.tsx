import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export const EmailConfiguration = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>
          Configure SMTP settings for sending emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpHost">SMTP Host</Label>
            <Input id="smtpHost" placeholder="smtp.gmail.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input id="smtpPort" placeholder="587" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpUsername">SMTP Username</Label>
          <Input id="smtpUsername" placeholder="your-email@gmail.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="smtpPassword">SMTP Password</Label>
          <Input id="smtpPassword" type="password" placeholder="••••••••" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromEmail">From Email</Label>
          <Input id="fromEmail" placeholder="noreply@cleanpro.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fromName">From Name</Label>
          <Input id="fromName" placeholder="CleanPro Laundry" />
        </div>

        <Button className="w-full md:w-auto">
          <Save className="w-4 h-4 mr-2" />
          Save Email Settings
        </Button>
      </CardContent>
    </Card>
  );
};
