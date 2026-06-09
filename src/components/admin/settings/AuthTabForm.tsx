"use client";

import { updateAuthSetting } from "@/actions/setting.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthSetting } from "@/generated/prisma";
import { useAsyncAction } from "@/hooks/use-async-action";
import { AuthSettingFormData, authSettingSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

export const AuthTabForm = ({ authSetting }: { authSetting: AuthSetting }) => {
  const { isProcessing, runAction } = useAsyncAction(updateAuthSetting, {
    successMessage: "Auth settings updated successfully",
    errorMessage: "Failed to update auth settings",
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AuthSettingFormData>({
    resolver: zodResolver(authSettingSchema),
    defaultValues: {
      google_client_id: authSetting.google_client_id ?? "",
      google_client_secret: authSetting.google_client_secret ?? "",
    },
  });

  const hasGoogleCredentials = Boolean(
    watch("google_client_id")?.trim() && watch("google_client_secret")?.trim(),
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const normalizedAppUrl = appUrl.replace(/\/$/, "");
  const redirectUri = `${normalizedAppUrl}/api/auth/callback/google`;

  return (
    <form
      onSubmit={handleSubmit((data) => runAction(data, authSetting.id))}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label>Google Client ID</Label>
        <Input
          placeholder="Enter Google OAuth Client ID"
          {...register("google_client_id")}
        />
        {errors.google_client_id && (
          <p className="text-xs text-red-500">
            {errors.google_client_id.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Google Client Secret</Label>
        <Input
          type="password"
          placeholder="Enter Google OAuth Client Secret"
          {...register("google_client_secret")}
        />
        {errors.google_client_secret && (
          <p className="text-xs text-red-500">
            {errors.google_client_secret.message}
          </p>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Status:{" "}
        {hasGoogleCredentials
          ? "Continue with Google is active"
          : "Continue with Google is hidden"}
      </p>

      <div className="rounded-md border border-border p-3 space-y-1">
        <p className="text-sm font-medium">Google Console Setup</p>
        <p className="text-xs text-muted-foreground">
          Authorized JavaScript origin: {normalizedAppUrl}
        </p>
        <p className="text-xs text-muted-foreground break-all">
          Authorized redirect URI: {redirectUri}
        </p>
      </div>

      <Button
        type="submit"
        className="w-full md:w-auto"
        disabled={isProcessing}
      >
        <Save className="w-4 h-4 mr-2" />
        {isProcessing ? "Saving..." : "Save Credentials"}
      </Button>
    </form>
  );
};
