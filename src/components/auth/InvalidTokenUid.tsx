"use client";

import { AlertCircle, Home, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { PAGES } from "@/config/pages.config";

export function InvalidTokenUid({ type }: { type: "reset" | "verification" }) {
  const router = useRouter();
  const getContent = () => {
    switch (type) {
      case "reset":
        return {
          title: "Invalid Reset Link",
          description: "This password reset link is invalid or has expired.",
          suggestion: "Please request a new password reset link to continue.",
          action: "Request New Link",
          actionPath: PAGES.FORGOT_PASSWORD,
        };
      case "verification":
      default:
        return {
          title: "Invalid Verification Link",
          description: "This verification link is invalid or has expired.",
          suggestion:
            "Please check your email for the correct link or request a new one.",
          action: "Resend Verification",
          actionPath: PAGES.LOGIN,
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">{content.title}</CardTitle>
            <CardDescription className="text-base">
              {content.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground text-center">
            {content.suggestion}
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => router.push(content.actionPath)}
            >
              <Mail className="w-4 h-4 mr-2" />
              {content.action}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={() => router.push("/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            If you continue to experience issues, please contact our support
            team.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
