"use client";

import { useRouter } from "next/navigation";
import { useCallback, useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUS_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Banned", value: "banned" },
] as const;

type StatusValue = "all" | "active" | "banned";

export function CustomerFilters({
  currentSearch = "",
  currentStatus = "all",
}: {
  currentSearch?: string;
  currentStatus?: StatusValue;
}) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const push = useCallback(
    (search: string, status: StatusValue) => {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (status !== "all") params.set("status", status);
      startTransition(() => {
        router.push(`/admin/customers?${params.toString()}`);
      });
    },
    [router]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    push(e.target.value, currentStatus);
  };

  const handleStatus = (status: StatusValue) => {
    push(currentSearch, status);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="Search name, email or phone…"
          className="pl-9"
          defaultValue={currentSearch}
          onChange={handleSearch}
        />
      </div>

      {/* Status filter */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit">
        {STATUS_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            size="sm"
            variant="ghost"
            onClick={() => handleStatus(opt.value)}
            className={cn(
              "h-7 px-3 text-xs rounded-md",
              currentStatus === opt.value
                ? "bg-background shadow-sm text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
