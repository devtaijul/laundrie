import type { Metadata } from "next";
import LoginClient from "@/components/auth/LoginClient";
import { isGoogleAuthEnabled } from "@/actions/setting.actions";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to your Laundrie account to manage orders, track pickups, and access your laundry history.",
  robots: { index: false, follow: false },
};

export default async function Login() {
  const googleAuthStatus = await isGoogleAuthEnabled();
  const showGoogleLogin =
    googleAuthStatus.success && googleAuthStatus.data
      ? googleAuthStatus.data.enabled
      : false;

  return <LoginClient showGoogleLogin={showGoogleLogin} />;
}
