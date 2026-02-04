import { me } from "@/actions/user.actions";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { AccountDetailsServer } from "@/server/account-details.server";

export default async function AccountDetailsPage() {
  me();

  return (
    <div className="min-h-screen  pb-20">
      {/* Header */}
      <TopNavigation title="Account" />
      {/* Content */}

      <AccountDetailsServer />

      <BottomNavigation />
    </div>
  );
}
