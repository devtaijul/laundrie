"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, ChevronRight } from "lucide-react";
import { logoutAction } from "@/actions/auth.actions";
import { AccountFormValues, accountFormSchema } from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { saveAccountDetails } from "@/actions/user.actions";
import { UserDTO } from "@/types/user.type";
import { ResendVerificationEmailAccount } from "./resend-varification-email.account";

export const AccountsDetailsForm: React.FC<{
  /** Optionally hydrate from session or DB */
  defaults?: Partial<UserDTO>;
}> = ({ defaults }) => {
  const router = useRouter();
  const { isProcessing, runAction } = useAsyncAction(saveAccountDetails, {
    successMessage: "Account details updated successfully",
    errorMessage: "Failed to update account details",
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<AccountFormValues>({
    mode: "onChange",
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      firstName: defaults?.firstName ?? "",
      lastName: defaults?.lastName ?? "",
      phone: defaults?.phone ?? "",
      email: defaults?.email ?? "",
      theme: defaults?.theme ?? "SYSTEM",
    },
  });

  const onSubmit = async (values: AccountFormValues) => {
    await runAction(values, defaults?.id as string);
    // Optionally redirect or show toast
    // router.refresh();
  };

  return (
    <div className="px-4 py-24 max-w-lg mx-auto">
      <Card className="border-none shadow-none">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-6 p-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  {...register("firstName")}
                  className="border-border bg-background"
                  placeholder="First name"
                  aria-label="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  {...register("lastName")}
                  className="border-border bg-background"
                  placeholder="Last name"
                  aria-label="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Field */}
            <div>
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <PhoneInput
                    placeholder="Phone number"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-muted-foreground" />
              <Input
                type="email"
                {...register("email")}
                className="border-border bg-background pl-10"
                placeholder="Email address"
                aria-label="Email address"
                inputMode="email"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Email Verification */}
            {!defaults?.emailVerified && (
              <ResendVerificationEmailAccount user={defaults as UserDTO} />
            )}

            {/* Theme Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="theme">
                Theme
              </label>

              <Controller
                control={control}
                name="theme"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="theme"
                      className="border-border bg-background"
                    >
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SYSTEM">Use System Theme</SelectItem>
                      <SelectItem value="LIGHT">Light</SelectItem>
                      <SelectItem value="DARK">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.theme && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.theme.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 space-y-3">
              <Button
                type="button"
                variant="ghost"
                className="w-full justify-between text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => router.push("/account/delete")}
              >
                <span>Delete Account</span>
                <ChevronRight className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full justify-between text-primary hover:bg-primary/10 hover:text-primary"
                onClick={() => router.push("/account/change-password")}
              >
                <span>Change Password</span>
                <ChevronRight className="h-5 w-5" />
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full justify-between text-primary hover:bg-primary/10 hover:text-primary"
                onClick={logoutAction}
              >
                <span>Logout</span>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
