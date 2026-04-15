"use server";

import crypto from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { revalidatePath } from "next/cache";
import { GiftCardStatus } from "@/generated/prisma";

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateGiftCardCode(): string {
  const part = () => crypto.randomBytes(2).toString("hex").toUpperCase();
  return `LAUN-${part()}-${part()}`;
}

function getExpiryDate(): Date {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 1);
  return d;
}

// ── User actions ──────────────────────────────────────────────────────────────

export interface PurchaseGiftCardInput {
  amountCents: number;       // e.g. 5000 = €50
  sendToSelf: boolean;
  recipientName?: string;
  recipientEmail?: string;
  senderName?: string;
  personalMessage?: string;
}

export const purchaseGiftCard = async (input: PurchaseGiftCardInput) => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  const { amountCents, sendToSelf, recipientName, recipientEmail, senderName, personalMessage } = input;

  if (!amountCents || amountCents < 1000) {
    return actionError("Minimum gift card amount is €10");
  }
  if (amountCents > 50000) {
    return actionError("Maximum gift card amount is €500");
  }
  if (!sendToSelf && !recipientEmail) {
    return actionError("Recipient email is required");
  }

  // Ensure unique code
  let code = generateGiftCardCode();
  while (await prisma.giftCard.findUnique({ where: { code } })) {
    code = generateGiftCardCode();
  }

  const giftCard = await prisma.giftCard.create({
    data: {
      code,
      amountCents,
      balanceCents: amountCents,
      status: GiftCardStatus.ACTIVE,
      expiresAt: getExpiryDate(),
      purchasedByUserId: session.user.id,
      sendToSelf,
      recipientEmail: sendToSelf ? (session.user.email ?? undefined) : recipientEmail,
      recipientName: sendToSelf ? (session.user.name ?? undefined) : recipientName,
      senderName,
      personalMessage,
      sentAt: new Date(),
    },
  });

  revalidatePath("/gift-cards");
  return actionResponse(giftCard);
};

export const getMyGiftCards = async () => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  const userEmail = session.user.email ?? "";

  const cards = await prisma.giftCard.findMany({
    where: {
      OR: [
        { purchasedByUserId: session.user.id },
        { recipientEmail: userEmail },
      ],
    },
    include: {
      redemptions: { orderBy: { createdAt: "desc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return actionResponse(cards);
};

export const validateGiftCard = async (code: string) => {
  const trimmed = code.trim().toUpperCase();
  const card = await prisma.giftCard.findUnique({ where: { code: trimmed } });

  if (!card) return actionError("Gift card not found");
  if (card.status === GiftCardStatus.CANCELED) return actionError("This gift card has been canceled");
  if (card.status === GiftCardStatus.EXHAUSTED) return actionError("This gift card has no remaining balance");
  if (card.expiresAt && card.expiresAt < new Date()) {
    await prisma.giftCard.update({ where: { id: card.id }, data: { status: GiftCardStatus.EXPIRED } });
    return actionError("This gift card has expired");
  }
  if (card.status === GiftCardStatus.EXPIRED) return actionError("This gift card has expired");

  return actionResponse({ code: card.code, balanceCents: card.balanceCents, expiresAt: card.expiresAt });
};

export const redeemGiftCard = async (code: string, orderId: string, amountCents: number) => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  const trimmed = code.trim().toUpperCase();
  const card = await prisma.giftCard.findUnique({ where: { code: trimmed } });

  if (!card || card.status !== GiftCardStatus.ACTIVE) return actionError("Invalid or inactive gift card");
  if (card.expiresAt && card.expiresAt < new Date()) return actionError("Gift card has expired");
  if (card.balanceCents <= 0) return actionError("Gift card has no balance");

  const applied = Math.min(amountCents, card.balanceCents);
  const newBalance = card.balanceCents - applied;

  await prisma.$transaction([
    prisma.giftCard.update({
      where: { id: card.id },
      data: {
        balanceCents: newBalance,
        status: newBalance === 0 ? GiftCardStatus.EXHAUSTED : GiftCardStatus.ACTIVE,
      },
    }),
    prisma.giftCardRedemption.create({
      data: {
        giftCardId: card.id,
        orderId,
        userId: session.user.id,
        amountCents: applied,
      },
    }),
  ]);

  return actionResponse({ applied, remaining: newBalance });
};

// ── Admin actions ─────────────────────────────────────────────────────────────

export const getAllGiftCardsAdmin = async (opts?: {
  status?: string;
  page?: number;
  limit?: number;
}) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return actionError("Forbidden");

  const page = opts?.page ?? 1;
  const limit = opts?.limit ?? 20;
  const skip = (page - 1) * limit;

  const where = opts?.status && opts.status !== "ALL"
    ? { status: opts.status as GiftCardStatus }
    : {};

  const [cards, total] = await Promise.all([
    prisma.giftCard.findMany({
      where,
      include: {
        purchasedBy: { select: { id: true, name: true, email: true } },
        redemptions: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.giftCard.count({ where }),
  ]);

  return actionResponse(cards, { total, page, limit });
};

export const createGiftCardAdmin = async (input: {
  amountCents: number;
  recipientEmail?: string;
  recipientName?: string;
  personalMessage?: string;
  expiresAt?: Date;
}) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return actionError("Forbidden");

  if (!input.amountCents || input.amountCents < 100) return actionError("Amount must be at least €1");

  let code = generateGiftCardCode();
  while (await prisma.giftCard.findUnique({ where: { code } })) {
    code = generateGiftCardCode();
  }

  const card = await prisma.giftCard.create({
    data: {
      code,
      amountCents: input.amountCents,
      balanceCents: input.amountCents,
      status: GiftCardStatus.ACTIVE,
      expiresAt: input.expiresAt ?? getExpiryDate(),
      recipientEmail: input.recipientEmail,
      recipientName: input.recipientName,
      personalMessage: input.personalMessage,
      isAdminCreated: true,
      sentAt: new Date(),
    },
  });

  revalidatePath("/admin/gift-cards");
  return actionResponse(card);
};

export const cancelGiftCardAdmin = async (id: string) => {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return actionError("Forbidden");

  await prisma.giftCard.update({
    where: { id },
    data: { status: GiftCardStatus.CANCELED },
  });

  revalidatePath("/admin/gift-cards");
  return actionResponse({ ok: true });
};

export const getGiftCardStatsAdmin = async () => {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") return actionError("Forbidden");

  const [total, active, exhausted, canceled, totalIssuedAgg, totalRedeemedAgg] = await Promise.all([
    prisma.giftCard.count(),
    prisma.giftCard.count({ where: { status: GiftCardStatus.ACTIVE } }),
    prisma.giftCard.count({ where: { status: GiftCardStatus.EXHAUSTED } }),
    prisma.giftCard.count({ where: { status: GiftCardStatus.CANCELED } }),
    prisma.giftCard.aggregate({ _sum: { amountCents: true } }),
    prisma.giftCardRedemption.aggregate({ _sum: { amountCents: true } }),
  ]);

  return actionResponse({
    total,
    active,
    exhausted,
    canceled,
    totalIssuedCents: totalIssuedAgg._sum.amountCents ?? 0,
    totalRedeemedCents: totalRedeemedAgg._sum.amountCents ?? 0,
  });
};
