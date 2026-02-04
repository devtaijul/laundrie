"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AdminNotification } from "@/generated/prisma";
import { Save } from "lucide-react";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AdminNotificationFormData,
  adminNotificationSchema,
} from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateAdminNotificationSetting } from "@/actions/setting.actions";

export const AdminNotificationForm = ({
  adminNotification,
}: {
  adminNotification: AdminNotification | null;
}) => {
  const { isProcessing, runAction } = useAsyncAction(
    updateAdminNotificationSetting,
    {
      successMessage: "Settings updated successfully",
      errorMessage: "Failed to update settings",
    }
  );
  const { control, handleSubmit } = useForm<AdminNotificationFormData>({
    resolver: zodResolver(adminNotificationSchema),
    defaultValues: {
      new_orders: adminNotification?.new_orders ?? true,
      customer_reviews: adminNotification?.customer_reviews ?? true,
      support_tickets: adminNotification?.support_tickets ?? true,
      //low_stock_alerts: false, // DB te nai holeo UI te onno bhabe handle korte parba
    },
  });

  const onSubmit = async (data: AdminNotificationFormData) => {
    console.log("ADMIN NOTIFICATION SETTINGS:", data);

    runAction(data, adminNotification?.id as string);

    // ekhane tumi server action / API call korba
    // await updateAdminNotificationAction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">New Orders</Label>
            <p className="text-sm text-muted-foreground">
              Get notified when new orders are placed
            </p>
          </div>
          <Controller
            name="new_orders"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Customer Reviews</Label>
            <p className="text-sm text-muted-foreground">
              Notifications when order status changes
            </p>
          </div>
          <Controller
            name="customer_reviews"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Support Tickets</Label>
            <p className="text-sm text-muted-foreground">
              Notifications from support tickets
            </p>
          </div>
          <Controller
            name="support_tickets"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/*  <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Low Stock Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Get notified about low inventory
            </p>
          </div>
          <Controller
            name="low_stock_alerts"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div> */}

        <Button
          type="submit"
          className="w-full md:w-auto mt-4"
          disabled={isProcessing}
        >
          <Save className="w-4 h-4 mr-2" />
          {isProcessing ? "Saving..." : "Save Preferences"}
        </Button>
      </CardContent>
    </form>
  );
};
