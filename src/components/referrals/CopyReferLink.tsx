"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { PAGES } from "@/config/pages.config";
import { formatMoney } from "@/lib/utils";

export const CopyReferLink = ({
  referalCode,
  amount,
}: {
  referalCode: string;
  amount: number;
}) => {
  const [copied, setCopied] = useState(false);
  const referralUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${PAGES.SIGNUP_REFERRAL(referalCode)}`
      : `${PAGES.SIGNUP_REFERRAL(referalCode)}`;

  const handleSend = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Get $10 on your first order",
          text: "Use my referral link and we both get $10 credit.",
          url: referralUrl,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(referralUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // ignore cancel/denied
    }
  };
  return (
    <Button
      onClick={handleSend}
      className="w-full bg-primary py-6 text-lg text-primary-foreground hover:bg-primary/90"
    >
      {copied
        ? "Link copied!"
        : `SEND ${formatMoney(amount === 10 ? 10 : 20)} REFERRAL LINK`}
    </Button>
  );
};
