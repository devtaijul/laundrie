"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Eye, EyeOff } from "lucide-react";
import { EmailConfiguration } from "@/generated/prisma";
import {
  EmailConfigurationFormData,
  emailConfigurationSchema,
} from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { updateEmailConfigurationSetting } from "@/actions/setting.actions";
import { useState } from "react";

export function EmailConfigurationForm({
  emailConfig,
}: {
  emailConfig: EmailConfiguration;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const { isProcessing, runAction } = useAsyncAction(
    updateEmailConfigurationSetting,
    {
      successMessage: "Email configuration saved",
      errorMessage: "Failed to save email configuration",
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailConfigurationFormData>({
    resolver: zodResolver(emailConfigurationSchema),
    defaultValues: {
      host: emailConfig.host,
      port: emailConfig.port,
      username: emailConfig.username,
      password: emailConfig.password,
      from: emailConfig.from,
      name: emailConfig.name,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => runAction(data, emailConfig.id))}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>SMTP Host</Label>
          <Input placeholder="smtp.gmail.com" {...register("host")} />
          {errors.host && (
            <p className="text-xs text-red-500">{errors.host.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>SMTP Port</Label>
          <Input type="number" placeholder="587" {...register("port", { valueAsNumber: true })} />
          {errors.port && (
            <p className="text-xs text-red-500">{errors.port.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>SMTP Username</Label>
        <Input placeholder="your-email@gmail.com" {...register("username")} />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>SMTP Password</Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="pr-10"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>From Email</Label>
          <Input placeholder="noreply@laundrie.com" {...register("from")} />
          {errors.from && (
            <p className="text-xs text-red-500">{errors.from.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>From Name</Label>
          <Input placeholder="Laundrie" {...register("name")} />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full md:w-auto" disabled={isProcessing}>
        <Save className="w-4 h-4 mr-2" />
        {isProcessing ? "Saving..." : "Save Email Settings"}
      </Button>
    </form>
  );
}
