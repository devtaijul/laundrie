"use client";

import { logoutAction } from "@/actions/auth.actions";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { Card } from "@/components/ui/card";
import { PAGES } from "@/config/pages.config";
import { Icons } from "@/icons";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";

export default function AccountMenuClient() {
  const [isPending, startTransition] = useTransition();

  const menuItems = [
    { title: "Account Details", path: PAGES.ACCOUNT.DETAILS },
    { title: "Profiles", path: PAGES.ACCOUNT.PROFILE },
    { title: "Gift Cards", path: PAGES.GIFT_CARDS },
  ];

  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <div className="min-h-screen">
      <TopNavigation title="Profile" />

      <div className="px-4 py-20 max-w-md mx-auto mt-10 space-y-3">
        <Card className="border-none shadow-none bg-primary/10">
          <div className="space-y-1 p-4 w-full">
            {menuItems.map((item) => (
              <Link
                href={item.path}
                key={item.path}
                className="p-2 w-full items-center justify-between hover:border-b-2 hover:border-primary flex transition-all duration-150 ease-in-out"
              >
                <span className="pl-3 font-medium">{item.title}</span>
                <Icons name="ARROW_RIGHT" />
              </Link>
            ))}
          </div>
        </Card>

        <Card className="border-none shadow-none bg-destructive/5">
          <div className="p-4">
            <button
              onClick={handleLogout}
              disabled={isPending}
              className="p-2 w-full items-center justify-between flex transition-all duration-150 ease-in-out text-destructive hover:opacity-80 disabled:opacity-50"
            >
              <span className="pl-3 font-medium">
                {isPending ? "Logging out…" : "Log Out"}
              </span>
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
