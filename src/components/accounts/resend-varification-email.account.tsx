"use client";

import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { UserDTO } from "@/types/user.type";
import { useAsyncAction } from "@/hooks/use-async-action";
import { resendVerificationEmailAction } from "@/actions/auth.actions";
import { toast } from "sonner";

export const ResendVerificationEmailAccount = ({ user }: { user: UserDTO }) => {
  const { isProcessing, runAction } = useAsyncAction(
    resendVerificationEmailAction,
    {
      successMessage: "Verification email sent successfully",
      errorMessage: "Failed to send verification email",
    }
  );

  const handleSendVerificationEmail = async () => {
    try {
      await runAction(user.email!);
    } catch (error) {
      console.log(error);
      toast.error(error as string);
    }
  };

  if (!user) return null;

  return (
    <Card className="border-primary/20 bg-primary/10">
      <div className="p-4">
        <h3 className="mb-2 font-semibold">Verify Your Email</h3>
        <p className="mb-2 text-sm text-muted-foreground">
          Follow the instructions we&apos;ve sent
        </p>
        <p className="text-sm">
          to{" "}
          <span className="text-primary">
            {/* watch is not necessary; shows default/edited value on submit UI */}
            {/* If you prefer live display, you can use watch("email") */}
            {user.email}
          </span>
          <span className="text-primary">
            {/* simple inline since we don't use watch here */}
          </span>
        </p>
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-sm text-primary"
          onClick={handleSendVerificationEmail}
          disabled={isProcessing}
        >
          {isProcessing ? "Resending..." : "Resend verification email"}
        </Button>
      </div>
    </Card>
  );
};
