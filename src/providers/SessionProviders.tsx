import { SessionProvider } from "next-auth/react";
import React from "react";
import { auth } from "@/auth";

export const SessionProviders = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
