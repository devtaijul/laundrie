import type { Metadata } from "next";
import { auth } from "@/auth";
import { PAGES } from "@/config/pages.config";
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
    if (session.user.role === "ADMIN") {
      redirect(PAGES.ADMIN.ROOT);
    }

    if (session.user.role === "DRIVER") {
      redirect(PAGES.DRIVER.ROOT);
    }

    redirect(PAGES.ORDERS);
  }

  return <>{children}</>;
};

export default layout;
