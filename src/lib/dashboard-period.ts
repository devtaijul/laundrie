import { addDays, subDays, addMonths, subMonths } from "date-fns";

export type DashboardPeriod =
  | { mode: "day"; date: string }
  | { mode: "month"; year: number; month: number }
  | { mode: "year"; year: number };

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export function periodLabel(period: DashboardPeriod): string {
  if (period.mode === "day") {
    const [y, m, d] = period.date.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  }
  if (period.mode === "month") return `${MONTHS[period.month - 1]} ${period.year}`;
  return String(period.year);
}

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function getNextPeriod(period: DashboardPeriod): DashboardPeriod {
  if (period.mode === "day") {
    return { mode: "day", date: toDateStr(addDays(new Date(period.date + "T12:00:00"), 1)) };
  }
  if (period.mode === "month") {
    const d = addMonths(new Date(period.year, period.month - 1, 1), 1);
    return { mode: "month", year: d.getFullYear(), month: d.getMonth() + 1 };
  }
  return { mode: "year", year: period.year + 1 };
}

export function getPrevPeriod(period: DashboardPeriod): DashboardPeriod {
  if (period.mode === "day") {
    return { mode: "day", date: toDateStr(subDays(new Date(period.date + "T12:00:00"), 1)) };
  }
  if (period.mode === "month") {
    const d = subMonths(new Date(period.year, period.month - 1, 1), 1);
    return { mode: "month", year: d.getFullYear(), month: d.getMonth() + 1 };
  }
  return { mode: "year", year: period.year - 1 };
}

export function periodToSearchParams(period: DashboardPeriod): string {
  const sp = new URLSearchParams({ mode: period.mode });
  if (period.mode === "day") sp.set("date", period.date);
  if (period.mode === "month") {
    sp.set("year", String(period.year));
    sp.set("month", String(period.month));
  }
  if (period.mode === "year") sp.set("year", String(period.year));
  return sp.toString();
}
