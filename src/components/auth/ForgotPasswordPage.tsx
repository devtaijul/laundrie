"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TopNavigation } from "../layout/TopNavigation";
import { useAsyncAction } from "@/hooks/use-async-action";
import { sendConfirmationEmail } from "@/actions/user.actions";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState<{
    type: string;
    text: string;
    isSend: boolean;
  }>({
    type: "",
    text: "",
    isSend: false,
  });
  const [email, setEmail] = useState("");
  const { isProcessing, runAction } = useAsyncAction(sendConfirmationEmail, {
    onSuccess: () => {
      toast("Reset link sent!");
      setMessage({
        type: "success",
        text: `Reset link sent to ${email}`,
        isSend: true,
      });
    },
    onError: (error) => {
      toast(error || "Failed to send reset link!");

      setMessage({
        type: "error",
        text: error || "Failed to send reset link!",
        isSend: true,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await runAction(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <TopNavigation title="Forgot Password" />

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Reset your password
              </h2>
              <p className="text-muted-foreground">
                Enter your email address and we&apos;ll send you a link to reset
                your password.
              </p>
            </div>
            {message.isSend && (
              <div
                className={`bg-green-500/20 text-green-500 p-2 rounded-md ${message.type === "success" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
              >
                <p className="text-center">{message.text}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => router.push("/login")}
                className="text-primary"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
