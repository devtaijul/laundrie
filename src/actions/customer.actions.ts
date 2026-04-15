"use server";

import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { revalidatePath } from "next/cache";

// ─── List customers ────────────────────────────────────────────────────────────

export async function getCustomers({
  search = "",
  status = "all",
  page = 1,
  pageSize = 10,
}: {
  search?: string;
  status?: "all" | "active" | "banned";
  page?: number;
  pageSize?: number;
}) {
  try {
    const skip = (page - 1) * pageSize;

    const where = {
      role: Role.USER,
      deletedAt: null,
      ...(search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { email: { contains: search, mode: "insensitive" as const } },
              { phone: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(status === "active" ? { bannedAt: null } : {}),
      ...(status === "banned" ? { bannedAt: { not: null } } : {}),
    };

    const [customers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          useType: true,
          bannedAt: true,
          createdAt: true,
          _count: { select: { orders: true } },
          orders: {
            select: { totalCents: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const data = customers.map((c) => ({
      id: c.id,
      name: c.name,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      phone: c.phone,
      useType: c.useType,
      bannedAt: c.bannedAt,
      createdAt: c.createdAt,
      totalOrders: c._count.orders,
      totalSpentCents: c.orders.reduce((sum, o) => sum + o.totalCents, 0),
    }));

    return actionResponse({ customers: data, totalCount, totalPages, page, pageSize });
  } catch (error) {
    console.log(error);
    return actionError("Failed to load customers");
  }
}

// ─── Get single customer with orders ──────────────────────────────────────────

export async function getCustomerById(id: string) {
  try {
    const customer = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        useType: true,
        isOver65: true,
        marketing: true,
        notifications: true,
        bannedAt: true,
        createdAt: true,
        updatedAt: true,
        emailVerified: true,
        referralCreditCents: true,
        orders: {
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true,
            orderId: true,
            status: true,
            totalCents: true,
            createdAt: true,
            pickupAddress: true,
            deliverySpeed: true,
          },
        },
        _count: { select: { orders: true } },
      },
    });

    if (!customer) return actionError("Customer not found");

    return actionResponse({
      ...customer,
      totalOrders: customer._count.orders,
      totalSpentCents: customer.orders.reduce((sum, o) => sum + o.totalCents, 0),
    });
  } catch (error) {
    console.log(error);
    return actionError("Failed to load customer");
  }
}

// ─── Ban / Unban ───────────────────────────────────────────────────────────────

export async function banCustomer(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true, bannedAt: true },
    });
    if (!user) return actionError("Customer not found");
    if (user.role !== Role.USER) return actionError("Can only ban customers");
    if (user.bannedAt) return actionError("Customer is already banned");

    await prisma.user.update({
      where: { id },
      data: { bannedAt: new Date() },
    });

    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return actionResponse({ banned: true });
  } catch (error) {
    console.log(error);
    return actionError("Failed to ban customer");
  }
}

export async function unbanCustomer(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { role: true, bannedAt: true },
    });
    if (!user) return actionError("Customer not found");
    if (!user.bannedAt) return actionError("Customer is not banned");

    await prisma.user.update({
      where: { id },
      data: { bannedAt: null },
    });

    revalidatePath("/admin/customers");
    revalidatePath(`/admin/customers/${id}`);
    return actionResponse({ banned: false });
  } catch (error) {
    console.log(error);
    return actionError("Failed to unban customer");
  }
}
