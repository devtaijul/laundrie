import { PAGES } from "@/config/pages.config";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Laundrie = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 space-y-8">
      {/* Main Order Button */}
      <div className="text-center space-y-6">
        <Link
          href={PAGES.ORDER}
          className="w-64 h-64 rounded-full border-4 border-primary bg-white flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors shadow-lg"
        >
          <h2 className="text-xl font-bold text-foreground mb-1">NEW ORDER</h2>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span className="text-sm">Do my laundry</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        {/* Credits Banner */}
        <div className="bg-blue-100 rounded-full px-6 py-2 inline-block">
          <span className="text-sm font-medium text-primary">
            $0 CREDITS . REFER & EARN
          </span>
        </div>
      </div>
    </div>
  );
};
