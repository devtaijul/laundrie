"use client";

import {
  loginWithEmailAction,
  requestOtpAction,
  verifyOtpAndLoginAction,
} from "@/actions/auth.actions";
import { checkIfPhoneExists } from "@/actions/user.actions";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAsyncAction } from "@/hooks/use-async-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ---------- Zod client schemas ----------
const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?\d{8,15}$/, "Enter a valid phone number with country code"),
});

const otpSchema = z.object({
  phone: phoneSchema.shape.phone,
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type Step = "initial" | "otp" | "email";

// fixed-height error
const ErrorSlot = ({ message }: { message?: string }) => (
  <div className="h-5 mt-1">
    {message ? <p className="text-xs text-red-500">{message}</p> : null}
  </div>
);

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("initial");
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // phone form
  const {
    register: registerPhone,
    handleSubmit: handleSubmitPhone,
    formState: { errors: phoneErrors },
    watch,
    getValues: getPhoneValues,
  } = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "" },
    mode: "onBlur",
  });

  // otp form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    setValue: setOtpValue,
    getValues: getOtpValues,
    formState: { errors: otpErrors },
  } = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: { phone: "", otp: "" },
    mode: "onBlur",
  });

  // email form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<z.infer<typeof emailLoginSchema>>({
    resolver: zodResolver(emailLoginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onBlur",
  });

  const {
    runAction: checkPhoneNumberExist,
    isProcessing: checkingPhoneNumberExist,
  } = useAsyncAction(checkIfPhoneExists, {
    onSuccess: async () => {
      const fd = new FormData();
      fd.set("phone", getPhoneValues("phone"));
      const res = await requestOtpAction(fd);
      if (!res?.ok) {
        setServerError(res?.error ?? "Failed to send code");
        return;
      }
      // set phone into otp form default
      setOtpValue("phone", getPhoneValues("phone"));
      // success হলে otp step দেখাবো
      setStep("otp");
    },
    onError: (error) => {
      console.error("Error checking phone", error);
      router.push("/signup");
    },
  });

  const onRequestOtp = handleSubmitPhone((data) => {
    setServerError(null);
    checkPhoneNumberExist(data.phone);
  });

  const onVerifyOtp = handleSubmitOtp((data) => {
    setServerError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("phone", data.phone);
      fd.set("otp", data.otp);
      const res = await verifyOtpAndLoginAction(fd);
      if (!res?.ok && res?.error) setServerError(res.error);
      // success হলে action এর ভেতরেই redirect হবে
    });
  });

  const onEmailLogin = handleSubmitEmail((data) => {
    setServerError(null);
    startTransition(async () => {
      const fd = new FormData();
      fd.set("email", data.email);
      fd.set("password", data.password);
      const { ok, error } = await loginWithEmailAction(fd);
      if (!ok && error) {
        setServerError(error);
      }
      // success হলে action এর ভেতরেই redirect হবে
    });
  });

  const renderInitialStep = () => (
    <form className="space-y-6 max-w-lg mx-auto" onSubmit={onRequestOtp}>
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">
          Welcome to the laundry platform
        </h1>
        <p className="text-muted-foreground">
          Enter your phone number to continue
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <Input
            type="tel"
            placeholder="Enter your phone number"
            className="pl-10 h-12"
            {...registerPhone("phone")}
          />
        </div>
        <ErrorSlot message={phoneErrors.phone?.message} />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
        >
          {checkingPhoneNumberExist ? "Checking..." : "Request OTP"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">OR</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => setStep("email")}
          className="w-full h-12 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          CONTINUE WITH EMAIL
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By proceeding, you consent to receive SMS messages. Message and data
        rates may apply. Text &quot;STOP&quot; to opt out.
      </p>
    </form>
  );

  const renderOtpStep = () => (
    <form className="space-y-6 max-w-lg mx-auto" onSubmit={onVerifyOtp}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setStep("initial")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-medium">Verify phone</h2>
      </div>

      <p className="text-muted-foreground">
        We sent a 6-digit code to{" "}
        <span className="font-medium">{getPhoneValues("phone")}</span>
      </p>

      <input id="otp-phone-hidden" type="hidden" {...registerOtp("phone")} />

      <div className="space-y-4">
        <Input
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit code"
          className="h-12 tracking-widest text-center"
          {...registerOtp("otp")}
        />
        <ErrorSlot
          message={otpErrors.otp?.message || otpErrors.phone?.message}
        />

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
        >
          Verify & Continue
        </Button>

        <button
          type="button"
          onClick={() => onRequestOtp()}
          className="text-sm text-primary hover:underline"
        >
          Resend code
        </button>
      </div>
    </form>
  );

  const renderEmailStep = () => (
    <form className="space-y-6 max-w-lg mx-auto" onSubmit={onEmailLogin}>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setStep("initial")}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-lg font-medium">Continue with email</h2>
      </div>

      <div className="space-y-3">
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="email"
              placeholder="Enter your email address"
              className="pl-10 h-12"
              {...registerEmail("email")}
            />
          </div>
          <ErrorSlot message={emailErrors.email?.message} />
        </div>

        <div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="pr-10 h-12"
              {...registerEmail("password")}
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
          <ErrorSlot message={emailErrors.password?.message} />
        </div>

        {serverError && <p className="text-sm text-red-500">{serverError}</p>}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-gradient-primary hover:bg-primary-hover"
        >
          Log in
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed">
        By clicking &quot;Log in&quot; you agree to our Terms of Service and
        Privacy Policy.
      </p>
    </form>
  );

  return (
    <div className="min-h-screen">
      <TopNavigation title="Login" />
      <div className="w-full max-w-md py-24 mt-10 mx-auto">
        <Card className="border-none shadow-none">
          <CardHeader className="pb-6">
            <CardTitle className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {step === "initial"
                ? "Login"
                : step === "otp"
                  ? "Verify code"
                  : "Email Login"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === "initial" && renderInitialStep()}
            {step === "otp" && renderOtpStep()}
            {step === "email" && renderEmailStep()}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <span className="text-muted-foreground">
            Don&apos;t have an account?{" "}
          </span>
          <Link
            href="/signup"
            className="text-primary hover:underline font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
