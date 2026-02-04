import { validateResetToken } from "@/actions/user.actions";
import { InvalidTokenUid } from "@/components/auth/InvalidTokenUid";
import ResetPasswordPage from "@/components/auth/ResetPasswordPage";
import { FullScreenLoader } from "@/components/layout/FullScreenLoader";
import React, { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ token: string; uid: string }>;
}) {
  const query = await searchParams;

  const { token, uid } = query;

  const { data } = await validateResetToken(token as string, uid as string);

  if (!data?.ok) {
    return <InvalidTokenUid type="reset" />;
  }

  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ResetPasswordPage token={token} uid={uid} />
    </Suspense>
  );
}
