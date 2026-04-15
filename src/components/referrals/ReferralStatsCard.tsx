"use client";

import { formatMoney } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Gift, Users, Wallet } from "lucide-react";
import { format } from "date-fns";

type Referral = {
  id: string;
  refereeName: string | null;
  refereeJoinedAt: Date;
  referreeCreditCents: number;
  referrerCreditCents: number;
  createdAt: Date;
};

type SignedUpVia = {
  code: string;
  creditCents: number;
  at: Date;
} | null;

export function ReferralStatsCard({
  creditCents,
  referrals,
  signedUpVia,
}: {
  creditCents: number;
  referrals: Referral[];
  signedUpVia: SignedUpVia;
}) {
  return (
    <div className="space-y-6">
      {/* Credit balance */}
      <Card className="bg-primary/10 border-none shadow-none p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
            <Wallet className="h-7 w-7 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Your referral credit</p>
            <p className="text-3xl font-bold text-primary">
              {formatMoney(creditCents / 100)}
            </p>
          </div>
        </div>
      </Card>

      {/* Signed up via referral */}
      {signedUpVia && (
        <Card className="border-none shadow-none bg-emerald-50 dark:bg-emerald-950/20 p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-5 w-5 text-emerald-600 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-emerald-700 dark:text-emerald-400">
                You joined via referral
              </p>
              <p className="text-muted-foreground">
                Received {formatMoney(signedUpVia.creditCents / 100)} credit on{" "}
                {format(new Date(signedUpVia.at), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Referrals made */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">
            People you referred ({referrals.length})
          </h3>
        </div>

        {referrals.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No referrals yet. Share your code to earn credits!
          </p>
        ) : (
          <div className="space-y-3">
            {referrals.map((r) => (
              <Card
                key={r.id}
                className="border-border shadow-none p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{r.refereeName ?? "User"}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined {format(new Date(r.refereeJoinedAt), "MMM d, yyyy")}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    {r.referrerCreditCents > 0 ? (
                      <span className="text-emerald-600 font-semibold">
                        +{formatMoney(r.referrerCreditCents / 100)}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        They got {formatMoney(r.referreeCreditCents / 100)}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
