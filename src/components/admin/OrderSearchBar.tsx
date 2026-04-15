"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { OrderStatus } from "@/generated/prisma";

interface Props {
  currentSearch?: string;
  currentStatus?: OrderStatus | "ALL";
}

export const OrderSearchBar = ({ currentSearch, currentStatus }: Props) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const q = e.target.value;
      const params = new URLSearchParams();
      if (q) params.set("search", q);
      if (currentStatus && currentStatus !== "ALL")
        params.set("status", currentStatus);
      startTransition(() => {
        router.push(`/admin/orders?${params.toString()}`);
      });
    },
    [router, currentStatus],
  );

  return (
    <div className="relative w-full sm:w-64 shrink-0">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input
        type="search"
        placeholder="Search order ID or customer…"
        className="pl-9"
        defaultValue={currentSearch}
        onChange={handleSearch}
      />
    </div>
  );
};
