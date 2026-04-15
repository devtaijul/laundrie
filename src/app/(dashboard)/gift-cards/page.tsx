import { Suspense } from "react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { GiftCardsTabs } from "@/components/gift-cards/GiftCardsTabs";
import { MyGiftCards } from "@/components/gift-cards/MyGiftCards";
import { PurchaseGiftCardForm } from "@/components/gift-cards/PurchaseGiftCardForm";

export default function GiftCardsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  return (
    <div className="min-h-screen pb-24">
      <TopNavigation title="Gift Cards" />

      <div className="px-4 py-8 max-w-lg mx-auto">
        <Suspense>
          <GiftCardsPageContent searchParams={searchParams} />
        </Suspense>
      </div>

      <BottomNavigation />
    </div>
  );
}

async function GiftCardsPageContent({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab === "mine" ? "mine" : "buy";

  return (
    <div className="space-y-6">
      <GiftCardsTabs activeTab={activeTab} />

      {activeTab === "buy" ? (
        <PurchaseGiftCardForm />
      ) : (
        <Suspense fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading…</div>}>
          <MyGiftCards />
        </Suspense>
      )}
    </div>
  );
}
