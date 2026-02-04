"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";
import { CheckIcon, Home, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckIcon className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Verify Email</CardTitle>
            <CardDescription className="text-base">
              Your email has been verified successfully.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground text-center">
            You can now login to your account.
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                router.push(PAGES.LOGIN);
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Login
            </Button>

            <Button variant="outline" className="w-full" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Resend Verification Email
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
