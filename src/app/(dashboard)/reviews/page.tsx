import { getMyReviews } from "@/actions/review.actions";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200",
          )}
        />
      ))}
    </div>
  );
}

export default async function ReviewsPage() {
  const res = await getMyReviews();
  const reviews = res.success ? (res.data ?? []) : [];

  return (
    <div className="min-h-screen pb-24">
      <TopNavigation title="My Reviews" />

      <div className="max-w-lg mx-auto px-4 py-8 space-y-4">
        {reviews.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
              <Star className="h-8 w-8 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-semibold text-foreground">No reviews yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                After an order is delivered, you can leave a review.
              </p>
            </div>
            <Link
              href="/orders"
              className="text-sm text-primary underline-offset-4 hover:underline"
            >
              View my orders
            </Link>
          </div>
        ) : (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-5 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <StarRow rating={review.rating} />
                    <p className="text-xs text-muted-foreground">
                      Order {review.order.orderId} · {formatDate(review.createdAt)}
                    </p>
                  </div>
                  {review.adminReply ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs shrink-0">
                      Replied
                    </Badge>
                  ) : (
                    <Badge className="bg-muted text-muted-foreground hover:bg-muted text-xs shrink-0">
                      Pending reply
                    </Badge>
                  )}
                </div>

                {/* Comment */}
                <p className="text-sm text-foreground leading-relaxed">
                  {review.comment}
                </p>

                {/* Admin reply */}
                {review.adminReply && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-1">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">
                      Response from Laundrie
                    </p>
                    <p className="text-sm text-foreground">{review.adminReply}</p>
                  </div>
                )}

                <Link
                  href={`/orders/${review.orderId}`}
                  className="text-xs text-primary underline-offset-4 hover:underline"
                >
                  View order →
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
