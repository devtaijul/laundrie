"use client";

import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  currentRating?: number;
  currentPublished?: string;
}

const RATINGS = [
  { label: "All", value: undefined },
  { label: "5★", value: 5 },
  { label: "4★", value: 4 },
  { label: "3★", value: 3 },
  { label: "2★", value: 2 },
  { label: "1★", value: 1 },
];

const VISIBILITY = [
  { label: "All", value: undefined },
  { label: "Published", value: "true" },
  { label: "Hidden", value: "false" },
];

export const AdminReviewFilter = ({ currentRating, currentPublished }: Props) => {
  const router = useRouter();

  function buildUrl(rating?: number, published?: string) {
    const params = new URLSearchParams();
    if (rating) params.set("rating", String(rating));
    if (published !== undefined) params.set("published", published);
    return `/admin/reviews?${params.toString()}`;
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      {/* Rating filter */}
      <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1">
        {RATINGS.map(({ label, value }) => (
          <button
            key={String(value)}
            onClick={() => router.push(buildUrl(value, currentPublished))}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
              currentRating === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Visibility filter */}
      <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1">
        {VISIBILITY.map(({ label, value }) => (
          <button
            key={String(value)}
            onClick={() => router.push(buildUrl(currentRating, value))}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
              currentPublished === value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
