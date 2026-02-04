import { PAGES } from "@/config/pages.config";
import { ClipboardList, Shirt, User, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export const BottomNavigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-6 py-4">
      <div className="flex justify-around max-w-md mx-auto">
        <Link
          href={PAGES.LAUNDRIE}
          className="flex flex-col items-center space-y-1 text-primary"
        >
          <Shirt className="h-6 w-6" />
          <span className="text-xs font-medium">Laundry</span>
        </Link>

        <Link
          href={PAGES.ORDERS}
          className="flex flex-col items-center space-y-1 text-muted-foreground"
        >
          <ClipboardList className="h-6 w-6" />
          <span className="text-xs font-medium">Orders</span>
        </Link>

        <Link
          href={PAGES.ACCOUNT.ROOT}
          className="flex flex-col items-center space-y-1 text-muted-foreground"
        >
          <User className="h-6 w-6" />
          <span className="text-xs font-medium">Account</span>
        </Link>

        <Link
          href={PAGES.REFERRALS}
          className="flex flex-col items-center space-y-1 text-muted-foreground"
        >
          <Zap className="h-6 w-6" />
          <span className="text-xs font-medium">Referrals</span>
        </Link>
      </div>
    </div>
  );
};
