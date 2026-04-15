"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Star,
  MessageSquare,
  Trash2,
  Eye,
  EyeOff,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { formatDate } from "@/lib/utils";
import {
  replyToReview,
  deleteReply,
  togglePublishReview,
  deleteReview,
} from "@/actions/review.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ReviewWithRelations {
  id: string;
  rating: number;
  comment: string;
  adminReply: string | null;
  isPublished: boolean;
  createdAt: Date;
  user: {
    name: string | null;
    firstName: string | null;
    lastName: string | null;
    image: string | null;
  };
  order: { orderId: string; createdAt: Date };
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200",
          )}
        />
      ))}
    </div>
  );
}

export const AdminReviewCard = ({
  review,
}: {
  review: ReviewWithRelations;
}) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState(review.adminReply ?? "");
  const [loading, setLoading] = useState<string | null>(null);

  const customerName =
    (review.user.name ??
      `${review.user.firstName ?? ""} ${review.user.lastName ?? ""}`.trim()) ||
    "Anonymous";

  const initials = customerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  async function handleReply() {
    setLoading("reply");
    const res = await replyToReview(review.id, replyText);
    if (res.success) {
      toast.success("Reply saved");
      setReplyOpen(false);
    } else {
      toast.error(res.error ?? "Failed to save reply");
    }
    setLoading(null);
  }

  async function handleDeleteReply() {
    setLoading("delete-reply");
    const res = await deleteReply(review.id);
    if (res.success) {
      toast.success("Reply removed");
      setReplyText("");
    } else {
      toast.error(res.error ?? "Failed to remove reply");
    }
    setLoading(null);
  }

  async function handleTogglePublish() {
    setLoading("publish");
    const res = await togglePublishReview(review.id);
    if (res.success) {
      toast.success(review.isPublished ? "Review hidden" : "Review published");
    } else {
      toast.error(res.error ?? "Failed to update");
    }
    setLoading(null);
  }

  async function handleDelete() {
    if (!confirm("Delete this review permanently?")) return;
    setLoading("delete");
    const res = await deleteReview(review.id);
    if (!res.success) toast.error(res.error ?? "Failed to delete");
    setLoading(null);
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 space-y-4 transition-opacity",
        !review.isPublished && "opacity-60",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={review.user.image ?? undefined} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{customerName}</p>
            <p className="text-xs text-muted-foreground">
              Order {review.order.orderId} · {formatDate(review.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!review.isPublished && (
            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">
              Hidden
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-muted-foreground"
            onClick={handleTogglePublish}
            disabled={loading !== null}
            title={review.isPublished ? "Hide review" : "Publish review"}
          >
            {loading === "publish" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : review.isPublished ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={loading !== null}
            title="Delete review"
          >
            {loading === "delete" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Rating + comment */}
      <div className="space-y-2">
        <StarRow rating={review.rating} />
        <p className="text-sm text-foreground leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Existing reply */}
      {review.adminReply && !replyOpen && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide">
              Your Reply
            </p>
            <div className="flex items-center gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-7 px-2 text-xs"
                onClick={() => setReplyOpen(true)}
              >
                Edit
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-7 w-7 text-destructive"
                onClick={handleDeleteReply}
                disabled={loading !== null}
              >
                {loading === "delete-reply" ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Trash2 className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
          <p className="text-sm text-foreground">{review.adminReply}</p>
        </div>
      )}

      {/* Reply form */}
      {replyOpen ? (
        <div className="space-y-2">
          <Textarea
            placeholder="Write your reply…"
            className="resize-none text-sm"
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setReplyOpen(false);
                setReplyText(review.adminReply ?? "");
              }}
              disabled={loading !== null}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleReply}
              disabled={!replyText.trim() || loading !== null}
            >
              {loading === "reply" && (
                <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
              )}
              Save Reply
            </Button>
          </div>
        </div>
      ) : (
        !review.adminReply && (
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            onClick={() => setReplyOpen(true)}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Reply
          </Button>
        )
      )}
    </div>
  );
};
