"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

type StatusFilter = "all" | "succeeded" | "canceled" | "processing";

export function FinanceFilters({
  currentSearch,
  currentStatus,
}: {
  currentSearch: string;
  currentStatus: StatusFilter;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const push = useCallback(
    (search: string, status: string) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status !== "all") params.set("status", status);
      startTransition(() => {
        router.push(`${pathname}${params.toString() ? `?${params}` : ""}`);
      });
    },
    [router, pathname],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by customer, order ID, or payment intent…"
          className="pl-9"
          defaultValue={currentSearch}
          onChange={(e) => push(e.target.value, currentStatus)}
        />
      </div>
      <Select
        defaultValue={currentStatus}
        onValueChange={(v) => push(currentSearch, v)}
      >
        <SelectTrigger className="w-44">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="succeeded">Succeeded</SelectItem>
          <SelectItem value="processing">Processing</SelectItem>
          <SelectItem value="canceled">Canceled</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
