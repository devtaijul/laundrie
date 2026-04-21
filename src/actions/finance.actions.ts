"use server";

import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { StripePaymentIntentStatus } from "@/generated/prisma";

export async function getFinanceStats() {
  try {
    const [totalRevenue, totalPaid, totalFailed, totalProcessing] =
      await Promise.all([
        prisma.payment.aggregate({
          where: { status: StripePaymentIntentStatus.succeeded },
          _sum: { amountCents: true },
        }),
        prisma.payment.count({
          where: { status: StripePaymentIntentStatus.succeeded },
        }),
        prisma.payment.count({
          where: { status: StripePaymentIntentStatus.canceled },
        }),
        prisma.payment.count({
          where: { status: StripePaymentIntentStatus.processing },
        }),
      ]);

    return actionResponse({
      totalRevenueCents: totalRevenue._sum.amountCents ?? 0,
      totalPaid,
      totalFailed,
      totalProcessing,
    });
  } catch {
    return actionError("Failed to load finance stats");
  }
}

export async function getMonthlyRevenue() {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        status: StripePaymentIntentStatus.succeeded,
        createdAt: {
          gte: new Date(new Date().getFullYear(), 0, 1),
        },
      },
      select: { amountCents: true, createdAt: true },
    });

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const monthly = Array.from({ length: 12 }, (_, i) => ({
      month: months[i],
      revenue: 0,
      count: 0,
    }));

    for (const p of payments) {
      const m = new Date(p.createdAt).getMonth();
      monthly[m].revenue += p.amountCents / 100;
      monthly[m].count += 1;
    }

    return actionResponse(monthly);
  } catch {
    return actionError("Failed to load monthly revenue");
  }
}

export async function getPayments({
  search = "",
  status = "all",
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  status?: "all" | "succeeded" | "canceled" | "processing";
  page?: number;
  pageSize?: number;
}) {
  try {
    const skip = (page - 1) * pageSize;

    const statusMap: Record<string, StripePaymentIntentStatus | undefined> = {
      succeeded: StripePaymentIntentStatus.succeeded,
      canceled: StripePaymentIntentStatus.canceled,
      processing: StripePaymentIntentStatus.processing,
    };

    const where = {
      ...(status !== "all" && statusMap[status]
        ? { status: statusMap[status] }
        : {}),
      ...(search
        ? {
            OR: [
              {
                paymentIntentId: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                order: {
                  orderId: { contains: search, mode: "insensitive" as const },
                },
              },
              {
                order: {
                  user: {
                    name: { contains: search, mode: "insensitive" as const },
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [payments, totalCount] = await Promise.all([
      prisma.payment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          paymentIntentId: true,
          status: true,
          amountCents: true,
          currency: true,
          createdAt: true,
          order: {
            select: {
              orderId: true,
              user: { select: { name: true, email: true } },
            },
          },
        },
      }),
      prisma.payment.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    return actionResponse({
      payments,
      totalCount,
      totalPages,
      page,
      pageSize,
    });
  } catch {
    return actionError("Failed to load payments");
  }
}
