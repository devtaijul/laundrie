import { Card } from "@/components/ui/card";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import HowDoRefWorkModal from "@/components/modals/HowDoRefWorkModal";
import ReferTypeListCard from "@/components/referrals/ReferTypeListCard";
import { referralOptions } from "@/lib/data";

export default function ReferralsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <TopNavigation title="Referrals" />

      {/* Content */}
      <div className="px-4 py-20 mt-28 max-w-lg mx-auto">
        <h2 className="mb-8 text-center text-2xl font-bold">
          Share Laundry Earn Credits!
        </h2>
        <Card className="bg-[#C5DBE42B] border-none shadow-none">
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              {referralOptions.map((option, index) => (
                <ReferTypeListCard key={index} option={option} />
              ))}
            </div>
          </div>
        </Card>
        <div className="pt-8 text-center">
          <HowDoRefWorkModal />
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
