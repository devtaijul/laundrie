import { SignupForm } from "@/components/auth/SignupForm";

export default async function SignupWithReferral({
  params,
}: {
  params: Promise<{ ref: string }>;
}) {
  const { ref } = await params;
  return <SignupForm referralCode={ref} />;
}
