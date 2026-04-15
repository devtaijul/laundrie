"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cancelGiftCardAdmin } from "@/actions/gift-card.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, XCircle } from "lucide-react";

interface Props {
  id: string;
  status: string;
}

export function GiftCardAdminActions({ id, status }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const canCancel = status === "ACTIVE";

  async function handleCancel() {
    if (!confirm("Cancel this gift card? The remaining balance will be forfeited.")) return;
    setLoading(true);
    const res = await cancelGiftCardAdmin(id);
    if (res.success) {
      toast.success("Gift card canceled");
      router.refresh();
    } else {
      toast.error(!res.success && "error" in res ? String(res.error) : "Failed to cancel");
    }
    setLoading(false);
  }

  if (!canCancel) return <span className="text-xs text-muted-foreground">—</span>;

  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 px-2"
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
      <span className="ml-1 text-xs">Cancel</span>
    </Button>
  );
}
