import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Laundrie account using a referral link and earn credits on your first order.",
  robots: { index: false, follow: false },
};

export default async function SignupWithReferral({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <SignupForm referralCode={ref} />;
}
