import { getAllReviews } from "@/actions/review.actions";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { AdminReviewCard } from "./AdminReviewCard";
import { AdminReviewFilter } from "./AdminReviewFilter";
import { cn } from "@/lib/utils";

interface Props {
  rating?: number;
  published?: string;
  page?: number;
}

const AdminReviews = async ({ rating, published, page = 1 }: Props) => {
  const publishedFilter =
    published === "true" ? true : published === "false" ? false : undefined;

  const res = await getAllReviews({
    rating,
    published: publishedFilter,
    page,
    pageSize: 10,
  });

  if (!res.success) {
    return <p className="p-6 text-sm text-muted-foreground">Failed to load reviews.</p>;
  }

  const { reviews, avgRating, totalReviews, ratingCounts, totalPages } = res.data!;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reviews</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage and respond to customer feedback.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Average rating */}
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              <p className="text-xs text-muted-foreground">
                Average · {totalReviews} review{totalReviews !== 1 ? "s" : ""}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Rating breakdown */}
        {[5, 4, 3].map((r) => {
          const found = ratingCounts.find((rc) => rc.rating === r);
          const count = found?._count.id ?? 0;
          const pct = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
          return (
            <Card key={r}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{r}</span>
                  </div>
                  <span className="text-sm font-semibold">{count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">{pct}%</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters */}
      <AdminReviewFilter currentRating={rating} currentPublished={published} />

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <Card className="p-12 flex flex-col items-center gap-3 text-center">
          <Star className="h-10 w-10 text-muted-foreground/30" />
          <p className="text-sm font-medium text-muted-foreground">No reviews found</p>
          <p className="text-xs text-muted-foreground">Try adjusting your filters.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <AdminReviewCard key={review.id} review={review as any} />
          ))}
        </div>
      )}

      {/* Simple pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/admin/reviews?page=${p}${rating ? `&rating=${rating}` : ""}${published !== undefined ? `&published=${published}` : ""}`}
              className={cn(
                "h-8 w-8 rounded-md flex items-center justify-center text-sm border transition-colors",
                p === page
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border hover:bg-muted",
              )}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
