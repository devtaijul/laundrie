"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Gift, CreditCard } from "lucide-react";

interface Props {
  activeTab: "buy" | "mine";
}

export function GiftCardsTabs({ activeTab }: Props) {
  const tabs = [
    { key: "buy", label: "Buy a Gift Card", icon: Gift, href: "/gift-cards?tab=buy" },
    { key: "mine", label: "My Gift Cards", icon: CreditCard, href: "/gift-cards?tab=mine" },
  ] as const;

  return (
    <div className="flex rounded-xl bg-muted p-1 gap-1">
      {tabs.map(({ key, label, icon: Icon, href }) => (
        <Link
          key={key}
          href={href}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors",
            activeTab === key
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      ))}
    </div>
  );
}
