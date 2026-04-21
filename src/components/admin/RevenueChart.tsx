"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type MonthlyData = { month: string; revenue: number; count: number };

export function RevenueChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.25} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="month"
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 12 }}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#revenueGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
