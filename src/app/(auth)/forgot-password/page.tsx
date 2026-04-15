import type { Metadata } from "next";
import ForgotPasswordPage from "@/components/auth/ForgotPasswordPage";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Laundrie account password.",
  robots: { index: false, follow: false },
};

export default function page() {
  return <ForgotPasswordPage />;
}
