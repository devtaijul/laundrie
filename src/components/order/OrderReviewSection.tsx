import { getOrderReview } from "@/actions/review.actions";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReviewForm } from "./ReviewForm";
import { OrderStatus } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

interface Props {
  orderId: string;       // DB id
  orderStatus: OrderStatus;
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

export const OrderReviewSection = async ({ orderId, orderStatus }: Props) => {
  // Only show for delivered orders
  if (orderStatus !== OrderStatus.DELIVERED) return null;

  const res = await getOrderReview(orderId);
  const review = res.success ? res.data : null;

  return (
    <Card>
      <CardContent className="p-5 space-y-4">
        <h3 className="font-semibold text-foreground">
          {review ? "Your Review" : "Leave a Review"}
        </h3>

        {review ? (
          /* Already reviewed — show it */
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <StarRow rating={review.rating} />
              <span className="text-xs text-muted-foreground">
                {formatDate(review.createdAt)}
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {review.comment}
            </p>

            {review.adminReply && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-1">
                <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Response from Laundrie
                </p>
                <p className="text-sm text-foreground">{review.adminReply}</p>
              </div>
            )}
          </div>
        ) : (
          /* Not yet reviewed — show form */
          <ReviewForm orderId={orderId} />
        )}
      </CardContent>
    </Card>
  );
};
