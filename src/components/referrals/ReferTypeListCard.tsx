"use client";

import { getReferralCode } from "@/actions/refer.actions";
import { useAsyncAction } from "@/hooks/use-async-action";
import { Icons } from "@/icons";
import { ReferralOption } from "@/types/global-type";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card } from "../ui/card";
import { PAGES } from "@/config/pages.config";

const ReferTypeListCard = ({ option }: { option: ReferralOption }) => {
  const router = useRouter();

  const { runAction, isProcessing } = useAsyncAction(getReferralCode, {
    onSuccess: (data) => {
      console.log("user data", data);
      const referralCode = data.data?.code;

      if (referralCode) {
        router.push(PAGES.SCAN(referralCode));
      }
    },
    onError: (error) => {
      console.error("Error fetching user data", error);
    },
  });

  const handleGenerateReferral = () => {
    // Logic to generate referral code or link can be added here
    runAction(option.giftAmount);
  };

  return (
    <Card
      className={` hover:bg-primary/20 cursor-pointer border-border overflow-hidden transition-shadow `}
      onClick={handleGenerateReferral}
    >
      <div className="flex items-stretch justify-between">
        <div className="flex items-center space-x-4 w-full">
          <div className="flex h-full w-20 items-center justify-center  bg-primary/10">
            <Icons name={option.icon} />
          </div>
          <div className="p-4 flex items-center justify-between flex-1 !w-full">
            <div>
              <h3 className="font-semibold">{option.title}</h3>
              <p className="text-sm text-muted-foreground">{option.subtitle}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ReferTypeListCard;
