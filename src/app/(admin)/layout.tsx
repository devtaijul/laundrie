import { auth } from "@/auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session?.user) {
    redirect(PAGES.LOGIN);
  }

  if (session.user.role !== "ADMIN") {
    if (session.user.role === "DRIVER") {
      redirect(PAGES.DRIVER.ROOT);
    }

    redirect(PAGES.ORDERS);
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
