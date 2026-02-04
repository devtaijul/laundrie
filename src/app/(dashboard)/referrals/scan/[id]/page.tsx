import { validateReferralCode } from "@/actions/refer.actions";
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
