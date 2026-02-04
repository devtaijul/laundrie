import { AccountsDetailsForm } from "@/components/accounts/accounts-details.form";
import React, { Suspense } from "react";
import { me } from "@/actions/user.actions";

export const AccountDetailsServer = async () => {
  const account = await me();

  if (!account.success) {
    return <div>Unauthorized</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountsDetailsForm defaults={account?.data} />
    </Suspense>
  );
};
