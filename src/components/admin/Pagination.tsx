// components/common/Pagination.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/generated/prisma";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string; // default route, e.g. /admin/orders
  status?: OrderStatus | "ALL";
  search?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/admin/orders",
  status,
  search,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", String(page));
    if (status && status !== "ALL") params.set("status", status);
    if (search) params.set("search", search);

    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pagesToShow = (() => {
    const maxButtons = 3;

    if (totalPages <= maxButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    return [1, 2, 3];
  })();

  return (
    <div className="flex items-center justify-center gap-2 py-4 border-t border-border">
      {/* First « */}
      <Button
        asChild
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
      >
        <Link href={buildHref(1)}>«</Link>
      </Button>

      {/* Prev ‹ */}
      <Button
        asChild
        variant="outline"
        size="icon"
        disabled={currentPage === 1}
      >
        <Link href={buildHref(Math.max(1, currentPage - 1))}>‹</Link>
      </Button>

      {/* Page buttons */}
      {pagesToShow.map((p) => (
        <Button
          key={p}
          asChild
          variant={p === Number(currentPage) ? "default" : "outline"}
          size="icon"
          className={p === Number(currentPage) ? "bg-primary" : ""}
        >
          <Link href={buildHref(p)}>{p}</Link>
        </Button>
      ))}

      {/* ... + last page */}
      {totalPages > pagesToShow.length && (
        <>
          <span className="px-2">...</span>
          <Button
            asChild
            variant={currentPage === totalPages ? "default" : "outline"}
            size="icon"
            className={currentPage === totalPages ? "bg-primary" : ""}
          >
            <Link href={buildHref(totalPages)}>{totalPages}</Link>
          </Button>
        </>
      )}

      {/* Next › */}
      <Button
        asChild
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
      >
        <Link href={buildHref(Math.min(totalPages, currentPage + 1))}>›</Link>
      </Button>

      {/* Last » */}
      <Button
        asChild
        variant="outline"
        size="icon"
        disabled={currentPage === totalPages}
      >
        <Link href={buildHref(totalPages)}>»</Link>
      </Button>
    </div>
  );
}
