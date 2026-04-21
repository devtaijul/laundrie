"use server";

import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { OrderStatus, Role, StripePaymentIntentStatus } from "@/generated/prisma";
import {
  startOfDay,
  endOfDay,
  subDays,
  startOfMonth,
  endOfMonth,
  subMonths,
  startOfYear,
  endOfYear,
} from "date-fns";
import type { DashboardPeriod } from "@/lib/dashboard-period";

export type { DashboardPeriod };

function parseDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function getRange(period: DashboardPeriod): [Date, Date] {
  if (period.mode === "day") {
    const d = parseDate(period.date);
    return [startOfDay(d), endOfDay(d)];
  }
  if (period.mode === "month") {
    const d = new Date(period.year, period.month - 1, 1);
    return [startOfMonth(d), endOfMonth(d)];
  }
  const d = new Date(period.year, 0, 1);
  return [startOfYear(d), endOfYear(d)];
}

function getPrevRange(period: DashboardPeriod): [Date, Date] {
  if (period.mode === "day") {
    const d = subDays(parseDate(period.date), 1);
    return [startOfDay(d), endOfDay(d)];
  }
  if (period.mode === "month") {
    const d = subMonths(new Date(period.year, period.month - 1, 1), 1);
    return [startOfMonth(d), endOfMonth(d)];
  }
  const d = new Date(period.year - 1, 0, 1);
  return [startOfYear(d), endOfYear(d)];
}

function trendLabel(mode: DashboardPeriod["mode"]) {
  if (mode === "day") return "vs previous day";
  if (mode === "month") return "vs last month";
  return "vs last year";
}

function pct(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

export async function getDashboardStats(period: DashboardPeriod) {
  try {
    const [start, end] = getRange(period);
    const [prevStart, prevEnd] = getPrevRange(period);

    const dateFilter = { gte: start, lte: end };
    const prevDateFilter = { gte: prevStart, lte: prevEnd };

    const [
      currentOrders,
      prevOrders,
      currentDelivered,
      prevDelivered,
      currentRevenue,
      prevRevenue,
      currentCustomers,
      prevCustomers,
    ] = await Promise.all([
      prisma.order.count({ where: { createdAt: dateFilter } }),
      prisma.order.count({ where: { createdAt: prevDateFilter } }),
      prisma.order.count({
        where: { status: OrderStatus.DELIVERED, createdAt: dateFilter },
      }),
      prisma.order.count({
        where: { status: OrderStatus.DELIVERED, createdAt: prevDateFilter },
      }),
      prisma.payment.aggregate({
        where: {
          status: StripePaymentIntentStatus.succeeded,
          createdAt: dateFilter,
        },
        _sum: { amountCents: true },
      }),
      prisma.payment.aggregate({
        where: {
          status: StripePaymentIntentStatus.succeeded,
          createdAt: prevDateFilter,
        },
        _sum: { amountCents: true },
      }),
      prisma.user.count({
        where: { role: Role.USER, deletedAt: null, createdAt: dateFilter },
      }),
      prisma.user.count({
        where: { role: Role.USER, deletedAt: null, createdAt: prevDateFilter },
      }),
    ]);

    const revenueCents = currentRevenue._sum.amountCents ?? 0;
    const prevRevenueCents = prevRevenue._sum.amountCents ?? 0;

    return actionResponse({
      orders: currentOrders,
      ordersVsPrev: pct(currentOrders, prevOrders),
      delivered: currentDelivered,
      deliveredVsPrev: pct(currentDelivered, prevDelivered),
      revenueCents,
      revenueVsPrev: pct(revenueCents, prevRevenueCents),
      customers: currentCustomers,
      customersVsPrev: pct(currentCustomers, prevCustomers),
      trendSuffix: trendLabel(period.mode),
    });
  } catch {
    return actionError("Failed to load dashboard stats");
  }
}

export async function getDashboardChart(period: DashboardPeriod) {
  try {
    const [start, end] = getRange(period);

    const [orders, delivered] = await Promise.all([
      prisma.order.findMany({
        where: { createdAt: { gte: start, lte: end } },
        select: { createdAt: true },
      }),
      prisma.order.findMany({
        where: {
          status: OrderStatus.DELIVERED,
          createdAt: { gte: start, lte: end },
        },
        select: { createdAt: true },
      }),
    ]);

    if (period.mode === "day") {
      const buckets = Array.from({ length: 24 }, (_, i) => ({
        label:
          i === 0
            ? "12am"
            : i < 12
              ? `${i}am`
              : i === 12
                ? "12pm"
                : `${i - 12}pm`,
        total: 0,
        delivered: 0,
      }));
      for (const o of orders)
        buckets[new Date(o.createdAt).getHours()].total += 1;
      for (const o of delivered)
        buckets[new Date(o.createdAt).getHours()].delivered += 1;
      return actionResponse(buckets);
    }

    if (period.mode === "month") {
      const daysInMonth = new Date(period.year, period.month, 0).getDate();
      const buckets = Array.from({ length: daysInMonth }, (_, i) => ({
        label: String(i + 1),
        total: 0,
        delivered: 0,
      }));
      for (const o of orders) {
        const idx = new Date(o.createdAt).getDate() - 1;
        if (idx >= 0 && idx < daysInMonth) buckets[idx].total += 1;
      }
      for (const o of delivered) {
        const idx = new Date(o.createdAt).getDate() - 1;
        if (idx >= 0 && idx < daysInMonth) buckets[idx].delivered += 1;
      }
      return actionResponse(buckets);
    }

    // year mode
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec",
    ];
    const buckets = months.map((label) => ({ label, total: 0, delivered: 0 }));
    for (const o of orders) buckets[new Date(o.createdAt).getMonth()].total += 1;
    for (const o of delivered)
      buckets[new Date(o.createdAt).getMonth()].delivered += 1;
    return actionResponse(buckets);
  } catch {
    return actionError("Failed to load chart data");
  }
}

export async function getRecentOrders(limit = 8) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      include: {
        payments: true,
        events: true,
        user: { omit: { passwordHash: true } },
        rider: true,
      },
    });
    return actionResponse(orders);
  } catch {
    return actionError("Failed to load recent orders");
  }
}
