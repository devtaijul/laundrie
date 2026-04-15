import { validateReferralCode } from "@/actions/refer.actions";
import { Card } from "@/components/ui/card";
import { Gift, QrCode, User } from "lucide-react";
import { BottomNavigation } from "../layout/BottomNavigation";
import { TopNavigation } from "../layout/TopNavigation";
import { CopyReferLink } from "./CopyReferLink";
import { QRCode } from "./QRCode";

export const ScanPage = async ({ code }: { code: string }) => {
  // Stable placeholder pattern so it doesn't change every render

  const res = await validateReferralCode(code);

  console.log(res, "res");

  if (!res.success) {
    return <div>Invalid code</div>;
  }

  return (
    <div className="min-h-screen  pb-20">
      {/* Header */}
      <TopNavigation title="Scan" />

      {/* Content */}
      <div className="px-4 py-24 mt-10 max-w-lg mx-auto">
        <Card className="bg-primary/5 border-none shadow-none">
          <div className="space-y-8 p-6">
            {/* QR Code Icon */}
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                <QrCode className="h-8 w-8 text-primary" />
              </div>
              <p className="text-muted-foreground">
                Show this QR code or tap to send the referral link.
              </p>
            </div>

            {/* QR Code (placeholder) */}
            <div className="flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-border bg-white">
                <QRCode code={code} />
              </div>
            </div>

            {/* Reward Info */}
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Reward</div>
                  <div className="text-muted-foreground">
                    {res.data?.amount === 10
                      ? "You get $10 / They get $10"
                      : "You get $0 / They get $20"}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Laundry Pro</div>
                  <div className="text-muted-foreground">None</div>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <CopyReferLink referalCode={code} amount={res.data?.amount ?? 10} />
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};
