import { SessionProvider } from "next-auth/react";
import React from "react";
import { auth } from "@/auth";

export const SessionProviders = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let session = null;

  try {
    session = await auth();
  } catch (error) {
    // Stale/invalid JWT cookies should not break rendering.
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to load session in SessionProviders", error);
    }
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
};
