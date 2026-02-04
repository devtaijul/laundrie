import { verifyEmailService } from "@/actions/auth.actions";
import { InvalidTokenUid } from "@/components/auth/InvalidTokenUid";
import VerifyEmailPage from "@/components/auth/VerifyEmailPage";
import { FullScreenLoader } from "@/components/layout/FullScreenLoader";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string; email: string }>;
}) => {
  const query = await searchParams;
  const { token, email } = query;

  const { data } = await verifyEmailService(token!, email!);

  console.log("data", data);

  if (!data?.ok || !token || !email) {
    return <InvalidTokenUid type="verification" />;
  }

  return (
    <Suspense fallback={<FullScreenLoader message="Verifying your email..." />}>
      <VerifyEmailPage />
    </Suspense>
  );
};

export default page;
