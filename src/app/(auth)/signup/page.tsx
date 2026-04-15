import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create your Laundrie account and get fresh, clean laundry delivered to your door.",
  robots: { index: false, follow: false },
};

export default function Signup() {
  return <SignupForm />;
}
