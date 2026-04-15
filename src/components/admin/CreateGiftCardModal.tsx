"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createGiftCardAdmin } from "@/actions/gift-card.actions";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateGiftCardModal() {
  const [open, setOpen] = useState(false);
  const [amountEur, setAmountEur] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCreate() {
    const euros = parseFloat(amountEur);
    if (!euros || euros < 1) {
      toast.error("Enter a valid amount (min €1)");
      return;
    }

    setLoading(true);
    const res = await createGiftCardAdmin({
      amountCents: Math.round(euros * 100),
      recipientEmail: recipientEmail.trim() || undefined,
      recipientName: recipientName.trim() || undefined,
      personalMessage: personalMessage.trim() || undefined,
    });

    if (res.success) {
      toast.success(`Gift card created: ${res.data?.code}`);
      setOpen(false);
      setAmountEur("");
      setRecipientEmail("");
      setRecipientName("");
      setPersonalMessage("");
      router.refresh();
    } else {
      toast.error(!res.success && "error" in res ? String(res.error) : "Failed to create gift card");
    }
    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Issue Gift Card
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Issue Gift Card</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Amount (EUR) *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">€</span>
              <Input
                inputMode="decimal"
                placeholder="e.g. 50"
                value={amountEur}
                onChange={(e) => setAmountEur(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Recipient email (optional)</label>
            <Input
              type="email"
              placeholder="recipient@example.com"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Recipient name (optional)</label>
            <Input
              placeholder="Jane Doe"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">Message (optional)</label>
            <Textarea
              placeholder="A personal note…"
              rows={3}
              className="resize-none"
              value={personalMessage}
              onChange={(e) => setPersonalMessage(e.target.value)}
              maxLength={300}
            />
          </div>

          <Button className="w-full" onClick={handleCreate} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {loading ? "Creating…" : "Create Gift Card"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
