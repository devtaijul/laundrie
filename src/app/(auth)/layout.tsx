import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Laundrie",
    template: "%s | Laundrie",
  },
};

const layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session?.user) {
    // redirect to home if logged in
    redirect("/");
  }

  return <>{children}</>;
};

export default layout;
