"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { GiftCardVisual } from "./GiftCardVisual";
import { purchaseGiftCard } from "@/actions/gift-card.actions";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatMoney } from "@/lib/utils";

const PRESET_AMOUNTS = [25, 50, 75, 100]; // euros

export function PurchaseGiftCardForm() {
  const [selectedEur, setSelectedEur] = useState<number>(50);
  const [customEur, setCustomEur] = useState("");
  const [isCustom, setIsCustom] = useState(false);

  const [sendToSelf, setSendToSelf] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [createdCode, setCreatedCode] = useState("");

  const displayEur = isCustom
    ? parseFloat(customEur) || 0
    : selectedEur;

  const displayLabel = displayEur > 0 ? `€${displayEur}` : "€—";

  async function handleSubmit() {
    const euros = isCustom ? parseFloat(customEur) : selectedEur;
    if (!euros || euros < 10) {
      toast.error("Minimum amount is €10");
      return;
    }
    if (euros > 500) {
      toast.error("Maximum amount is €500");
      return;
    }
    if (!sendToSelf && !recipientEmail.trim()) {
      toast.error("Please enter the recipient's email");
      return;
    }

    setLoading(true);
    const res = await purchaseGiftCard({
      amountCents: Math.round(euros * 100),
      sendToSelf,
      recipientEmail: recipientEmail.trim() || undefined,
      recipientName: recipientName.trim() || undefined,
      senderName: senderName.trim() || undefined,
      personalMessage: personalMessage.trim() || undefined,
    });

    if (res.success && res.data) {
      setCreatedCode(res.data.code);
      setDone(true);
      toast.success("Gift card created!");
    } else {
      toast.error(!res.success && "error" in res ? String(res.error) : "Failed to create gift card");
    }
    setLoading(false);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 text-center">
        <CheckCircle2 className="h-14 w-14 text-green-500" />
        <div>
          <p className="text-xl font-semibold">Gift card created!</p>
          <p className="text-sm text-muted-foreground mt-1">
            {sendToSelf ? "It's saved to your account." : "An email has been sent to the recipient."}
          </p>
        </div>
        <div className="bg-muted rounded-xl px-8 py-4 text-center space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Gift Card Code</p>
          <p className="text-2xl font-mono font-bold tracking-widest text-foreground">{createdCode}</p>
        </div>
        <Button variant="outline" onClick={() => { setDone(false); setCreatedCode(""); }}>
          Buy Another
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Visual */}
      <div className="flex justify-center">
        <GiftCardVisual amount={displayLabel} />
      </div>

      {/* Amount picker */}
      <div>
        <p className="text-sm font-medium mb-3">Select amount</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_AMOUNTS.map((eur) => (
            <button
              key={eur}
              type="button"
              onClick={() => { setSelectedEur(eur); setIsCustom(false); }}
              className={cn(
                "flex-1 min-w-15 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors",
                !isCustom && selectedEur === eur
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:border-primary/50",
              )}
            >
              €{eur}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsCustom(true)}
            className={cn(
              "flex-1 min-w-17.5 rounded-lg border-2 py-2.5 text-sm font-medium transition-colors",
              isCustom
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background hover:border-primary/50",
            )}
          >
            Custom
          </button>
        </div>

        {isCustom && (
          <div className="mt-3 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
            <Input
              inputMode="decimal"
              placeholder="Enter amount (€10–€500)"
              value={customEur}
              onChange={(e) => setCustomEur(e.target.value)}
              className="pl-8"
            />
          </div>
        )}
      </div>

      {/* Send to myself toggle */}
      <div className="flex items-center justify-between rounded-xl bg-muted px-4 py-3">
        <span className="text-sm font-medium">Send to myself</span>
        <Switch checked={sendToSelf} onCheckedChange={setSendToSelf} />
      </div>

      {/* Recipient details */}
      {!sendToSelf && (
        <div className="space-y-3">
          <p className="text-sm font-medium">Recipient details</p>
          <Input
            placeholder="Recipient name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Recipient email address"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
          />
        </div>
      )}

      {/* Sender + message */}
      <div className="space-y-3">
        <p className="text-sm font-medium">Your details</p>
        <Input
          placeholder="Your name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <Textarea
          placeholder="Personal message (optional)"
          rows={3}
          className="resize-none"
          value={personalMessage}
          onChange={(e) => setPersonalMessage(e.target.value)}
          maxLength={300}
        />
        <p className="text-xs text-muted-foreground text-right">{personalMessage.length}/300</p>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium">Total</span>
        <span className="text-lg font-bold text-primary">{formatMoney(displayEur)}</span>
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        {loading ? "Creating…" : "Create Gift Card"}
      </Button>
    </div>
  );
}
