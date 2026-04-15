"use client";

import { useState } from "react";
import { Star, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitReview } from "@/actions/review.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  orderId: string;
  onSubmitted?: () => void;
}

const LABELS = ["Terrible", "Bad", "OK", "Good", "Excellent"];

export const ReviewForm = ({ orderId, onSubmitted }: Props) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (rating === 0) { toast.error("Please select a rating"); return; }
    if (!comment.trim()) { toast.error("Please write a comment"); return; }

    setLoading(true);
    const res = await submitReview(orderId, rating, comment);
    if (res.success) {
      setSubmitted(true);
      toast.success("Thank you for your review!");
      onSubmitted?.();
    } else {
      toast.error(res.error ?? "Failed to submit review");
    }
    setLoading(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 py-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-500" />
        <p className="font-semibold text-foreground">Review submitted!</p>
        <p className="text-sm text-muted-foreground">
          Thanks for sharing your feedback.
        </p>
      </div>
    );
  }

  const display = hovered || rating;

  return (
    <div className="space-y-5">
      {/* Star picker */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(i)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={cn(
                  "h-9 w-9 transition-colors",
                  i <= display
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-200",
                )}
              />
            </button>
          ))}
        </div>
        {display > 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            {LABELS[display - 1]}
          </p>
        )}
      </div>

      {/* Comment */}
      <Textarea
        placeholder="Tell us about your experience with this order…"
        className="resize-none"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={1000}
        disabled={loading}
      />
      <p className="text-xs text-muted-foreground text-right">
        {comment.length}/1000
      </p>

      <Button
        className="w-full"
        onClick={handleSubmit}
        disabled={loading || rating === 0}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
        Submit Review
      </Button>
    </div>
  );
};
