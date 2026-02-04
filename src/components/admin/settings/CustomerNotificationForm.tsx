"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CustomerNotification } from "@/generated/prisma";
import { Save } from "lucide-react";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomerNotificationFormData,
  customerNotificationSchema,
} from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateCustomerNotificationSetting } from "@/actions/setting.actions";

export const CustomerNotificationForm = ({
  customerNotification,
}: {
  customerNotification: CustomerNotification | null;
}) => {
  const { isProcessing, runAction } = useAsyncAction(
    updateCustomerNotificationSetting,
    {
      successMessage: "Settings updated successfully",
      errorMessage: "Failed to update settings",
    }
  );
  const { control, handleSubmit } = useForm<CustomerNotificationFormData>({
    resolver: zodResolver(customerNotificationSchema),
    defaultValues: {
      order_confirmation_email:
        customerNotification?.order_confirmation_email ?? true,
      driver_id_orders: customerNotification?.driver_id_orders ?? true,
      order_completed_email:
        customerNotification?.order_completed_email ?? true,
      promotional_message: customerNotification?.promotional_message ?? false,
    },
  });

  const onSubmit = async (data: CustomerNotificationFormData) => {
    console.log("CUSTOMER NOTIFICATION DATA:", data);

    runAction(data, customerNotification?.id as string);

    // Server action here:
    // await updateCustomerNotificationAction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        {/* Order Confirmation */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Order Confirmation Email</Label>
            <p className="text-sm text-muted-foreground">
              Send confirmation email/SMS
            </p>
          </div>
          <Controller
            name="order_confirmation_email"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Driver ID */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Driver ID Orders</Label>
            <p className="text-sm text-muted-foreground">
              Notify orders receipt
            </p>
          </div>
          <Controller
            name="driver_id_orders"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Order Completed */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Order Completed</Label>
            <p className="text-sm text-muted-foreground">
              Notify when order is completed
            </p>
          </div>
          <Controller
            name="order_completed_email"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Promotional Messages */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Promotional Messages</Label>
            <p className="text-sm text-muted-foreground">
              Send marketing emails/SMS
            </p>
          </div>
          <Controller
            name="promotional_message"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full md:w-auto mt-4"
          disabled={isProcessing}
        >
          <Save className="w-4 h-4 mr-2" />
          {isProcessing ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </form>
  );
};
