"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { Mail, Eye, EyeOff } from "lucide-react";
import { SignupData, signupSchema } from "@/lib/zodSchema";
import { useAsyncAction } from "@/hooks/use-async-action";
import { registerUserAction } from "@/actions/auth.actions";
import { TYPE_OF_USE_OPTIONS } from "@/types/enums";
import { toast } from "sonner";

// ---------- FIXED-HEIGHT ERROR SLOT ----------
const ErrorSlot = ({ message }: { message?: string }) => (
  <div className="h-5 mt-1">
    {message ? <p className="text-xs text-red-500">{message}</p> : null}
  </div>
);

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "password" | "profile">("email");
  const [showPassword, setShowPassword] = useState(false);

  const { isProcessing, runAction } = useAsyncAction(registerUserAction, {
    onSuccess: () => router.push("/orders"),
    onError: (error) => {
      console.log("error", error);
      toast(error);
    },
  });

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      useType: "PERSONAL",
      isOver65: "no",
      marketing: true,
      notifications: true,
    },
  });

  const password = watch("password");
  const useType = watch("useType");
  const isOver65 = watch("isOver65");

  const passwordRequirements = [
    { text: "1 Number", met: /\d/.test(password) },
    { text: "1 Lowercase Letter", met: /[a-z]/.test(password) },
    { text: "1 Uppercase Letter", met: /[A-Z]/.test(password) },
    {
      text: "1 Special Character",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    { text: "8+ Characters", met: (password || "").length >= 8 },
  ];

  // --------- Step handlers ----------
  const nextFromEmail = async () => {
    const ok = await trigger(["email"]);
    if (ok) setStep("password");
  };

  const nextFromPassword = async () => {
    const ok = await trigger(["password"]);
    if (ok) setStep("profile");
  };

  const onSubmit = async (data: SignupData) => {
    // TODO: call your signup API / NextAuth flow here
    console.log("SIGNUP DATA", data);

    //router.push("/dashboard");

    // ✅ FIXED: Await the action and handle navigation in onSuccess

    await runAction(data);
  };

  // ---------------- RENDERERS ----------------
  const renderEmailStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Continue with email</h1>
        <p className="text-muted-foreground">
          Enter your email to continue and never do laundry again
        </p>
      </div>

      <div className="space-y-2">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              placeholder="Enter your email address"
              {...register("email")}
              className="pl-10 h-12"
            />
          </div>
          <ErrorSlot message={errors.email?.message} />
        </div>

        <Button
          type="button"
          onClick={nextFromEmail}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
        >
          Continue
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By clicking &quot;continue&quot; you agree to marketing emails and our
        Terms & Privacy Policy.
      </p>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Choose a password</h1>
        <p className="text-muted-foreground">
          Secure your information by providing a password
        </p>
      </div>

      <div className="space-y-3">
        <Input
          type="email"
          value={watch("email")}
          disabled
          className="h-12 bg-muted"
        />

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              {...register("password")}
              className="pr-10 h-12"
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
          <ErrorSlot message={errors.password?.message} />
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Password must include:</p>
          {passwordRequirements.map((req, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  req.met ? "bg-emerald-500" : "bg-muted-foreground"
                }`}
              />
              <span
                className={`text-sm ${
                  req.met ? "text-emerald-600" : "text-muted-foreground"
                }`}
              >
                {req.text}
              </span>
            </div>
          ))}
        </div>

        <Button
          type="button"
          onClick={nextFromPassword}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
        >
          Continue
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By clicking &quot;continue&quot; you agree to marketing emails and our
        Terms & Privacy Policy.
      </p>
    </div>
  );

  // ✅ FIXED: Profile step inputs restored + validated with RHF/Zod
  const renderProfileStep = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-semibold">Introduce yourself</h1>
        <p className="text-muted-foreground">
          Who do we have the pleasure of serving?
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              placeholder="First Name"
              className="h-12"
              {...register("firstName")}
            />
            <ErrorSlot message={errors.firstName?.message} />
          </div>
          <div>
            <Input
              placeholder="Last Name"
              className="h-12"
              {...register("lastName")}
            />
            <ErrorSlot message={errors.lastName?.message} />
          </div>
        </div>

        <div>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <PhoneInput
                defaultCountry="US"
                placeholder="Enter your phone number"
                className="h-12"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <ErrorSlot message={errors.phone?.message} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">
            Are you using Poplin for personal use or business?
          </p>
          <div className="grid grid-cols-2 gap-4">
            {TYPE_OF_USE_OPTIONS.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={useType === option.value ? "default" : "outline"}
                onClick={() => setValue("useType", option.value)}
                className="h-12"
              >
                {option.label}
              </Button>
            ))}
          </div>
          <ErrorSlot message={errors.useType?.message} />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Are you 65 or over?</p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant={isOver65 === "yes" ? "default" : "outline"}
              onClick={() =>
                setValue("isOver65", "yes", { shouldValidate: true })
              }
              className="h-12"
            >
              YES
            </Button>
            <Button
              type="button"
              variant={isOver65 === "no" ? "default" : "outline"}
              onClick={() =>
                setValue("isOver65", "no", { shouldValidate: true })
              }
              className="h-12"
            >
              NO
            </Button>
          </div>
          <ErrorSlot message={errors.isOver65?.message} />
        </div>

        <div className="space-y-3">
          <Controller
            control={control}
            name="marketing"
            render={({ field }) => (
              <label className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                  className="mt-1"
                />
                <span className="text-sm">
                  I want to receive marketing/promotional notifications via text
                  messages
                </span>
              </label>
            )}
          />

          <Controller
            control={control}
            name="notifications"
            render={({ field }) => (
              <label className="flex items-start gap-3">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(c) => field.onChange(Boolean(c))}
                  className="mt-1"
                />
                <span className="text-sm">
                  I want to receive account notifications via text messages
                </span>
              </label>
            )}
          />
        </div>

        <Button
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
          onClick={handleSubmit(onSubmit)}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Continue"}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        Message and data rates may apply. Reply HELP for help or STOP to cancel.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen">
      <TopNavigation title="Signup" />

      <div className="w-full max-w-lg py-24 mx-auto">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {step === "email"
                ? "Signup with email"
                : step === "password"
                ? "Password"
                : "Profile Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "email" && renderEmailStep()}
            {step === "password" && renderPasswordStep()}
            {step === "profile" && renderProfileStep()}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
