"use client";

import { banCustomer, unbanCustomer } from "@/actions/customer.actions";
import { useAsyncAction } from "@/hooks/use-async-action";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShieldBan, ShieldCheck } from "lucide-react";

export function CustomerBanButton({
  customerId,
  isBanned,
  variant = "default",
}: {
  customerId: string;
  isBanned: boolean;
  variant?: "default" | "ghost" | "outline";
}) {
  const { isProcessing: banning, runAction: ban } = useAsyncAction(banCustomer, {
    successMessage: "Customer banned successfully",
    errorMessage: "Failed to ban customer",
  });

  const { isProcessing: unbanning, runAction: unban } = useAsyncAction(
    unbanCustomer,
    {
      successMessage: "Customer unbanned successfully",
      errorMessage: "Failed to unban customer",
    }
  );

  const isProcessing = banning || unbanning;

  if (isBanned) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={variant}
            size="sm"
            disabled={isProcessing}
            className="gap-1.5 text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          >
            <ShieldCheck className="h-4 w-4" />
            {unbanning ? "Unbanning..." : "Unban"}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unban this customer?</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore the customer&apos;s access to the platform. They
              will be able to log in and place orders again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => unban(customerId)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Yes, unban
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          disabled={isProcessing}
          className="gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
        >
          <ShieldBan className="h-4 w-4" />
          {banning ? "Banning..." : "Ban"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ban this customer?</AlertDialogTitle>
          <AlertDialogDescription>
            The customer will immediately lose access to their account and won&apos;t
            be able to log in or place new orders. This action can be undone at
            any time.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => ban(customerId)}
            className="bg-destructive hover:bg-destructive/90"
          >
            Yes, ban customer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
