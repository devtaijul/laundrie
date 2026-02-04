"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SMSConfiguration } from "@/generated/prisma";
import { Save } from "lucide-react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  SMSConfigurationFormData,
  smsConfigurationSchema,
} from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateSmsConfigurationSetting } from "@/actions/setting.actions";

export const SmsConfigurationForm = ({
  smsConfiguration,
}: {
  smsConfiguration: SMSConfiguration | null;
}) => {
  const { isProcessing, runAction } = useAsyncAction(
    updateSmsConfigurationSetting,
    {
      successMessage: "Settings updated successfully",
      errorMessage: "Failed to update settings",
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SMSConfigurationFormData>({
    resolver: zodResolver(smsConfigurationSchema),
    defaultValues: {
      provider: smsConfiguration?.provider ?? "",
      api_key: smsConfiguration?.api_key ?? "",
      auth_token: smsConfiguration?.auth_token ?? "",
      from_number: smsConfiguration?.from_number ?? "",
    },
  });

  const onSubmit = async (data: SMSConfigurationFormData) => {
    console.log("SMS CONFIG FORM DATA:", data);

    runAction(data, smsConfiguration?.id as string);

    // Server action call:
    // await updateSmsConfigAction(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Provider */}
      <div className="space-y-2">
        <Label htmlFor="smsProvider">SMS Provider</Label>
        <Input
          id="smsProvider"
          placeholder="Twilio"
          {...register("provider")}
        />
        {errors.provider && (
          <p className="text-sm text-red-500">{errors.provider.message}</p>
        )}
      </div>

      {/* API Key */}
      <div className="space-y-2">
        <Label htmlFor="smsApiKey">API Key</Label>
        <Input id="smsApiKey" placeholder="AC..." {...register("api_key")} />
        {errors.api_key && (
          <p className="text-sm text-red-500">{errors.api_key.message}</p>
        )}
      </div>

      {/* Auth Token */}
      <div className="space-y-2">
        <Label htmlFor="smsAuthToken">Auth Token</Label>
        <Input
          id="smsAuthToken"
          type="password"
          placeholder="••••••••"
          {...register("auth_token")}
        />
        {errors.auth_token && (
          <p className="text-sm text-red-500">{errors.auth_token.message}</p>
        )}
      </div>

      {/* From Number */}
      <div className="space-y-2">
        <Label htmlFor="smsFromNumber">From Number</Label>
        <Input
          id="smsFromNumber"
          placeholder="+1(555)000-0000"
          {...register("from_number")}
        />
        {errors.from_number && (
          <p className="text-sm text-red-500">{errors.from_number.message}</p>
        )}
      </div>

      <Button
        className="w-full md:w-auto"
        type="submit"
        disabled={isProcessing}
      >
        <Save className="w-4 h-4 mr-2" />
        {isProcessing ? "Saving..." : "Save SMS Settings"}
      </Button>
    </form>
  );
};
