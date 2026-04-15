import type { Metadata } from "next";
import AccountMenuClient from "@/components/account/AccountMenuClient";

export const metadata: Metadata = {
  title: "Account",
  description: "Manage your Laundrie account, profiles, and gift cards.",
};

export default function ProfilePage() {
  return <AccountMenuClient />;
}
