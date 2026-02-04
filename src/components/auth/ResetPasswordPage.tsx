"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TopNavigation } from "../layout/TopNavigation";
import { toast } from "../ui/use-toast";
import { useAsyncAction } from "@/hooks/use-async-action";
import { changePassword } from "@/actions/user.actions";

const ResetPasswordPage = ({ token, uid }: { token: string; uid: string }) => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isProcessing, runAction } = useAsyncAction(changePassword, {
    onSuccess: () => {
      toast("Password updated!");
      router.push("/login");
    },
    onError: (error) => {
      toast(error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      toast("Password too short");
      return;
    }

    await runAction(token, uid, password);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopNavigation title="Reset Password" />
      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Create new password
              </h2>
              <p className="text-muted-foreground">
                Your new password must be different from previously used
                passwords.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
