import { auth } from "@/auth";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { PAGES } from "@/config/pages.config";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (session && session.user.role !== "DRIVER") {
    // redirect to home if logged in
    redirect(PAGES.HOME);
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
