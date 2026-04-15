import { getUserReferralStats } from "@/actions/refer.actions";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import HowDoRefWorkModal from "@/components/modals/HowDoRefWorkModal";
import ReferTypeListCard from "@/components/referrals/ReferTypeListCard";
import { ReferralStatsCard } from "@/components/referrals/ReferralStatsCard";
import { referralOptions } from "@/lib/data";

export default async function ReferralsPage() {
  const statsRes = await getUserReferralStats();
  const stats = statsRes.success ? statsRes.data : null;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <TopNavigation title="Referrals" />

      {/* Content */}
      <div className="px-4 py-20 mt-28 max-w-lg mx-auto space-y-8">
        <h2 className="text-center text-2xl font-bold">
          Share Laundry, Earn Credits!
        </h2>

        {/* Share options */}
        <Card className="bg-[#C5DBE42B] border-none shadow-none">
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              {referralOptions.map((option, index) => (
                <ReferTypeListCard key={index} option={option} />
              ))}
            </div>
          </div>
        </Card>

        <div className="text-center">
          <HowDoRefWorkModal />
        </div>

        {/* Stats & history */}
        {stats && (
          <ReferralStatsCard
            creditCents={stats.creditCents}
            referrals={stats.referrals}
            signedUpVia={stats.signedUpVia}
          />
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
