"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PaymentSetting } from "@/generated/prisma";
import { Save } from "lucide-react";

import { useForm, Controller } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentSettingFormData, paymentSettingSchema } from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updatePaymentSetting } from "@/actions/setting.actions";

export const PaymentTabForm = ({
  paymentSetting,
}: {
  paymentSetting: PaymentSetting | null;
}) => {
  const { runAction, isProcessing } = useAsyncAction(updatePaymentSetting, {
    successMessage: "Settings updated successfully",
    errorMessage: "Failed to update settings",
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSettingFormData>({
    resolver: zodResolver(paymentSettingSchema),
    defaultValues: {
      cash_on_delivery: paymentSetting?.cash_on_delivery ?? true,
      credit_devit: paymentSetting?.credit_devit ?? true,
      digital_wallet: paymentSetting?.digital_wallet ?? true,
      bank_transfer: paymentSetting?.bank_transfer ?? false,
      stripe_publishable_key: paymentSetting?.stripe_publishable_key ?? "",
      stripe_secret_key: paymentSetting?.stripe_secret_key ?? "",
    },
  });

  const onSubmit = async (data: PaymentSettingFormData) => {
    console.log("PAYMENT SETTING FORM DATA:", data);

    runAction(data, paymentSetting?.id as string);

    // 👇 Here you call your server action / API
    // await updatePaymentSettingAction(data);

    // If backend expects null instead of "" for empty keys:
    // const payload = {
    //   ...data,
    //   stripe_publishable_key: data.stripe_publishable_key || null,
    //   stripe_secret_key: data.stripe_secret_key || null,
    // };
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4">
        {/* Cash on Delivery */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h4 className="font-medium">Cash on Delivery</h4>
            <p className="text-sm text-muted-foreground">
              Accept cash payments
            </p>
          </div>
          <Controller
            name="cash_on_delivery"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Credit / Debit (credit_devit) */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h4 className="font-medium">Credit/Debit Card</h4>
            <p className="text-sm text-muted-foreground">
              Stripe payment gateway
            </p>
          </div>
          <Controller
            name="credit_devit"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Digital Wallets */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h4 className="font-medium">Digital Wallets</h4>
            <p className="text-sm text-muted-foreground">
              PayPal, Apple Pay, Google Pay
            </p>
          </div>
          <Controller
            name="digital_wallet"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {/* Bank Transfer */}
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h4 className="font-medium">Bank Transfer</h4>
            <p className="text-sm text-muted-foreground">Direct bank payment</p>
          </div>
          <Controller
            name="bank_transfer"
            control={control}
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </div>

      {/* Stripe keys */}
      <div className="space-y-4 pt-4 border-t border-border">
        <div className="space-y-2">
          <Label htmlFor="stripePublishable">Stripe Publishable Key</Label>
          <Input
            id="stripePublishable"
            placeholder="pk_live_..."
            {...register("stripe_publishable_key")}
          />
          {errors.stripe_publishable_key && (
            <p className="text-sm text-red-500">
              {errors.stripe_publishable_key.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="stripeSecret">Stripe Secret Key</Label>
          <Input
            id="stripeSecret"
            type="password"
            placeholder="sk_live_..."
            {...register("stripe_secret_key")}
          />
          {errors.stripe_secret_key && (
            <p className="text-sm text-red-500">
              {errors.stripe_secret_key.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isProcessing}
      >
        <Save className="w-4 h-4 mr-2" />
        {isProcessing ? "Saving..." : "Save Payment Settings"}
      </Button>
    </form>
  );
};
