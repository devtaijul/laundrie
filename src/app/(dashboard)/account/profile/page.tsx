import type { Metadata } from "next";
import { me } from "@/actions/user.actions";

export const metadata: Metadata = {
  title: "My Profile",
  description: "View and update your Laundrie profile information.",
};
import { TopNavigation } from "@/components/layout/TopNavigation";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { ProfileForm } from "@/components/accounts/profile-form";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const res = await me();

  if (!res.success || !res.data) {
    redirect("/login");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = res.data as any;

  return (
    <div className="min-h-screen pb-24">
      <TopNavigation title="My Profile" />
      <ProfileForm user={user} />
      <BottomNavigation />
    </div>
  );
}
