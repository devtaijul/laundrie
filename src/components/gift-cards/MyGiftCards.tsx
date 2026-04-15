import { getMyGiftCards } from "@/actions/gift-card.actions";
import { formatDate, formatMoney } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const STATUS_STYLE: Record<string, string> = {
  ACTIVE: "bg-green-100 text-green-700",
  EXHAUSTED: "bg-gray-100 text-gray-500",
  EXPIRED: "bg-red-100 text-red-600",
  CANCELED: "bg-red-100 text-red-600",
};

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: "Active",
  EXHAUSTED: "Used",
  EXPIRED: "Expired",
  CANCELED: "Canceled",
};

export const MyGiftCards = async () => {
  const res = await getMyGiftCards();
  const cards = res.success ? (res.data ?? []) : [];

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <Gift className="h-8 w-8 text-muted-foreground/40" />
        </div>
        <div>
          <p className="font-semibold text-foreground">No gift cards yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Gift cards you purchase or receive will appear here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cards.map((card) => {
        const used = card.amountCents - card.balanceCents;
        const pct = card.amountCents > 0 ? (card.balanceCents / card.amountCents) * 100 : 0;

        return (
          <Card key={card.id}>
            <CardContent className="p-5 space-y-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="font-mono font-semibold tracking-widest text-sm text-foreground">
                    {card.code}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Issued {formatDate(card.createdAt)}
                    {card.expiresAt && ` · Expires ${formatDate(card.expiresAt)}`}
                  </p>
                </div>
                <Badge
                  className={cn(
                    "shrink-0 text-xs hover:opacity-100",
                    STATUS_STYLE[card.status] ?? "bg-muted text-muted-foreground",
                  )}
                >
                  {STATUS_LABEL[card.status] ?? card.status}
                </Badge>
              </div>

              {/* Balance bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-semibold">
                    {formatMoney(card.balanceCents, true)}
                    <span className="text-muted-foreground font-normal">
                      {" "}/ {formatMoney(card.amountCents, true)}
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                {used > 0 && (
                  <p className="text-xs text-muted-foreground text-right">
                    {formatMoney(used, true)} used
                  </p>
                )}
              </div>

              {/* Recipient */}
              {card.recipientEmail && (
                <p className="text-xs text-muted-foreground">
                  {card.sendToSelf ? "Sent to yourself" : `Sent to ${card.recipientName ?? card.recipientEmail}`}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
