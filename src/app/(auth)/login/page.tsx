import type { Metadata } from "next";
import LoginClient from "@/components/auth/LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Laundrie account to manage orders, track pickups, and access your laundry history.",
  robots: { index: false, follow: false },
};

export default function Login() {
  return <LoginClient />;
}
