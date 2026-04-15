import type { Metadata } from "next";
import { auth } from "@/auth";
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
    redirect("/login");
  }

  return <>{children}</>;
}
