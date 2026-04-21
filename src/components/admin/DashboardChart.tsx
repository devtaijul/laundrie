"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartPoint = { label: string; total: number; delivered: number };

export function DashboardChart({ data }: { data: ChartPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis
          dataKey="label"
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 11 }}
          interval="preserveStartEnd"
        />
        <YAxis
          stroke="hsl(var(--muted-foreground))"
          tick={{ fontSize: 11 }}
          allowDecimals={false}
          width={30}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          name="Total Orders"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="delivered"
          name="Delivered"
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
