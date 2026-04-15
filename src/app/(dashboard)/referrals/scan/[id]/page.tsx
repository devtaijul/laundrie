import type { Metadata } from "next";
import { validateReferralCode } from "@/actions/refer.actions";

export const metadata: Metadata = {
  title: "Referral",
  description:
    "You've been invited to Laundrie! Sign up and get credits on your first order.",
};
import { ScanPage } from "@/components/referrals/ScanPage";
import { ScanPageSkeleton } from "@/components/skeletons/ScanPageSkeleton";
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  validateReferralCode(id);

  return (
    <Suspense fallback={<ScanPageSkeleton />}>
      <ScanPage code={id} />
    </Suspense>
  );
}
