"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, subDays, addMonths, subMonths } from "date-fns";
import type { DashboardPeriod } from "@/lib/dashboard-period";

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const YEARS = Array.from({ length: 7 }, (_, i) => CURRENT_YEAR - 3 + i);

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function periodToParams(period: DashboardPeriod): Record<string, string> {
  if (period.mode === "day") return { mode: "day", date: period.date };
  if (period.mode === "month")
    return { mode: "month", year: String(period.year), month: String(period.month) };
  return { mode: "year", year: String(period.year) };
}

type Mode = DashboardPeriod["mode"];

export function DashboardPeriodSelector({
  period,
}: {
  period: DashboardPeriod;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function push(p: DashboardPeriod) {
    const params = periodToParams(p);
    const sp = new URLSearchParams(params);
    router.push(`${pathname}?${sp.toString()}`);
  }

  function setMode(newMode: Mode) {
    if (newMode === "day") {
      const today = toDateStr(NOW);
      push({ mode: "day", date: today });
    } else if (newMode === "month") {
      push({ mode: "month", year: CURRENT_YEAR, month: NOW.getMonth() + 1 });
    } else {
      push({ mode: "year", year: CURRENT_YEAR });
    }
  }

  function prev() {
    if (period.mode === "day") {
      push({ mode: "day", date: toDateStr(subDays(new Date(period.date + "T12:00:00"), 1)) });
    } else if (period.mode === "month") {
      const d = subMonths(new Date(period.year, period.month - 1, 1), 1);
      push({ mode: "month", year: d.getFullYear(), month: d.getMonth() + 1 });
    } else {
      push({ mode: "year", year: period.year - 1 });
    }
  }

  function next() {
    if (period.mode === "day") {
      push({ mode: "day", date: toDateStr(addDays(new Date(period.date + "T12:00:00"), 1)) });
    } else if (period.mode === "month") {
      const d = addMonths(new Date(period.year, period.month - 1, 1), 1);
      push({ mode: "month", year: d.getFullYear(), month: d.getMonth() + 1 });
    } else {
      push({ mode: "year", year: period.year + 1 });
    }
  }

  const isFuture = (() => {
    if (period.mode === "day") return period.date > toDateStr(NOW);
    if (period.mode === "month")
      return (
        period.year > CURRENT_YEAR ||
        (period.year === CURRENT_YEAR && period.month > NOW.getMonth() + 1)
      );
    return period.year >= CURRENT_YEAR;
  })();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
      {/* Mode tabs */}
      <div className="flex items-center bg-muted rounded-lg p-1 gap-0.5">
        {(["day", "month", "year"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={cn(
              "px-4 py-1.5 text-sm rounded-md font-medium transition-all capitalize",
              period.mode === m
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Navigator */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={prev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {period.mode === "day" && (
          <input
            type="date"
            value={period.date}
            max={toDateStr(NOW)}
            onChange={(e) =>
              e.target.value && push({ mode: "day", date: e.target.value })
            }
            className="h-8 px-3 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary min-w-[140px]"
          />
        )}

        {period.mode === "month" && (
          <div className="flex items-center gap-1.5">
            <Select
              value={String(period.month)}
              onValueChange={(v) =>
                push({ mode: "month", year: period.year, month: Number(v) })
              }
            >
              <SelectTrigger className="h-8 w-[130px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTH_NAMES.map((name, i) => (
                  <SelectItem key={i} value={String(i + 1)}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={String(period.year)}
              onValueChange={(v) =>
                push({ mode: "month", year: Number(v), month: period.month })
              }
            >
              <SelectTrigger className="h-8 w-[90px] text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {period.mode === "year" && (
          <Select
            value={String(period.year)}
            onValueChange={(v) => push({ mode: "year", year: Number(v) })}
          >
            <SelectTrigger className="h-8 w-[90px] text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {YEARS.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={next}
          disabled={isFuture}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
