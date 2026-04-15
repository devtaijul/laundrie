"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Eye, EyeOff } from "lucide-react";
import { Security } from "@/generated/prisma";
import {
  SecurityFormData,
  securitySchema,
  AdminProfileFormData,
  adminProfileSchema,
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import {
  updateSecuritySetting,
  updateAdminProfile,
  changeAdminPassword,
} from "@/actions/setting.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

// ─── Admin Profile Form ───────────────────────────────────────────────────────

type AdminUser = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
};

export function AdminProfileForm({ admin }: { admin: AdminUser }) {
  const { isProcessing, runAction } = useAsyncAction(updateAdminProfile, {
    successMessage: "Profile updated successfully",
    errorMessage: "Failed to update profile",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminProfileFormData>({
    resolver: zodResolver(adminProfileSchema),
    defaultValues: {
      firstName: admin.firstName ?? "",
      lastName: admin.lastName ?? "",
      email: admin.email ?? "",
      phone: admin.phone ?? "",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Profile</CardTitle>
        <CardDescription>Update your profile information</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => runAction(data))}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input {...register("firstName")} />
              {errors.firstName && (
                <p className="text-xs text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input {...register("lastName")} />
              {errors.lastName && (
                <p className="text-xs text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input type="tel" {...register("phone")} />
            {errors.phone && (
              <p className="text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={isProcessing}>
            <Save className="w-4 h-4 mr-2" />
            {isProcessing ? "Saving..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Change Password Form ─────────────────────────────────────────────────────

export function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const { isProcessing, runAction } = useAsyncAction(changeAdminPassword, {
    successMessage: "Password changed successfully",
    errorMessage: "Failed to change password",
    onSuccess: () => reset(),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const newPassword = watch("newPassword") ?? "";
  const requirements = [
    { text: "8+ characters", met: newPassword.length >= 8 },
    { text: "1 number", met: /\d/.test(newPassword) },
    { text: "1 lowercase", met: /[a-z]/.test(newPassword) },
    { text: "1 uppercase", met: /[A-Z]/.test(newPassword) },
    { text: "1 special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) },
  ];

  const onSubmit = (data: ChangePasswordFormData) => {
    runAction(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Password</Label>
            <div className="relative">
              <Input
                type={showCurrent ? "text" : "password"}
                {...register("currentPassword")}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowCurrent((s) => !s)}
              >
                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.currentPassword && (
              <p className="text-xs text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>New Password</Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                {...register("newPassword")}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                onClick={() => setShowNew((s) => !s)}
              >
                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {newPassword.length > 0 && (
              <div className="space-y-1 pt-1">
                {requirements.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${r.met ? "bg-emerald-500" : "bg-muted-foreground"}`}
                    />
                    <span className={r.met ? "text-emerald-600" : "text-muted-foreground"}>
                      {r.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
            {errors.newPassword && (
              <p className="text-xs text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Confirm New Password</Label>
            <Input type="password" {...register("confirmPassword")} />
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={isProcessing}>
            <Save className="w-4 h-4 mr-2" />
            {isProcessing ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// ─── Security Settings Form ───────────────────────────────────────────────────

export function SecuritySettingsForm({ security }: { security: Security }) {
  const { isProcessing, runAction } = useAsyncAction(updateSecuritySetting, {
    successMessage: "Security settings saved",
    errorMessage: "Failed to save security settings",
  });

  const { register, control, handleSubmit, watch, formState: { errors } } =
    useForm<SecurityFormData>({
      resolver: zodResolver(securitySchema),
      defaultValues: {
        two_factor_auth: security.two_factor_auth,
        session_timeout: security.session_timeout,
        max_login_attempts: security.max_login_attempts,
        enable_ip_whitelist: security.enable_ip_whitelist,
        ip_whitelist: security.ip_whitelist.join(", "),
      },
    });

  const ipWhitelistEnabled = watch("enable_ip_whitelist");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Advanced security configuration</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit((data) => runAction(data, security.id))}
          className="space-y-5"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Controller
              name="two_factor_auth"
              control={control}
              render={({ field }) => (
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Session Timeout (seconds)</Label>
              <Input type="number" {...register("session_timeout", { valueAsNumber: true })} />
              {errors.session_timeout && (
                <p className="text-xs text-red-500">{errors.session_timeout.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Max Login Attempts</Label>
              <Input type="number" {...register("max_login_attempts", { valueAsNumber: true })} />
              {errors.max_login_attempts && (
                <p className="text-xs text-red-500">{errors.max_login_attempts.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">IP Whitelist</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict admin access to specific IPs
                </p>
              </div>
              <Controller
                name="enable_ip_whitelist"
                control={control}
                render={({ field }) => (
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            {ipWhitelistEnabled && (
              <div className="space-y-2">
                <Label>Allowed IPs</Label>
                <Input
                  placeholder="192.168.1.1, 10.0.0.1"
                  {...register("ip_whitelist")}
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated list of allowed IP addresses
                </p>
              </div>
            )}
          </div>

          <Button type="submit" className="w-full md:w-auto" disabled={isProcessing}>
            <Save className="w-4 h-4 mr-2" />
            {isProcessing ? "Saving..." : "Save Security Settings"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
