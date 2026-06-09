import type { Metadata } from "next";
import { auth } from "@/auth";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    default: "Laundrie",
    template: "%s | Laundrie",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    // redirect to sign-in if not logged in
    redirect(PAGES.LOGIN);
  }

  if (session.user.role === "ADMIN") {
    redirect(PAGES.ADMIN.ROOT);
  }

  if (session.user.role === "DRIVER") {
    redirect(PAGES.DRIVER.ROOT);
  }

  return <>{children}</>;
}
