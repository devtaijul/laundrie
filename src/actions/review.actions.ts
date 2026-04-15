"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { actionError, actionResponse } from "@/lib/server/utils";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@/generated/prisma";

// ─── User actions ─────────────────────────────────────────────────────────────

export const submitReview = async (
  orderId: string,
  rating: number,
  comment: string,
) => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  if (rating < 1 || rating > 5) return actionError("Rating must be 1–5");
  if (!comment.trim()) return actionError("Comment is required");

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { userId: true, status: true, review: { select: { id: true } } },
  });

  if (!order) return actionError("Order not found");
  if (order.userId !== session.user.id) return actionError("Unauthorized");
  if (order.status !== OrderStatus.DELIVERED)
    return actionError("You can only review delivered orders");
  if (order.review) return actionError("You have already reviewed this order");

  const review = await prisma.review.create({
    data: {
      orderId,
      userId: session.user.id,
      rating,
      comment: comment.trim(),
    },
  });

  revalidatePath(`/orders/${orderId}`);
  revalidatePath("/reviews");
  return actionResponse(review);
};

export const getMyReviews = async () => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  const reviews = await prisma.review.findMany({
    where: { userId: session.user.id },
    include: { order: { select: { orderId: true, createdAt: true } } },
    orderBy: { createdAt: "desc" },
  });

  return actionResponse(reviews);
};

export const getOrderReview = async (orderId: string) => {
  const session = await auth();
  if (!session?.user?.id) return actionError("Unauthorized");

  const review = await prisma.review.findUnique({
    where: { orderId },
    include: { user: { select: { name: true, firstName: true, lastName: true, image: true } } },
  });

  return actionResponse(review);
};

// ─── Admin actions ────────────────────────────────────────────────────────────

export const getAllReviews = async ({
  rating,
  published,
  page = 1,
  pageSize = 10,
}: {
  rating?: number;
  published?: boolean;
  page?: number;
  pageSize?: number;
}) => {
  const where = {
    ...(rating ? { rating } : {}),
    ...(published !== undefined ? { isPublished: published } : {}),
  };

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: {
        user: { select: { name: true, firstName: true, lastName: true, image: true } },
        order: { select: { orderId: true, createdAt: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.review.count({ where }),
  ]);

  const stats = await prisma.review.aggregate({
    _avg: { rating: true },
    _count: { id: true },
  });

  const ratingCounts = await prisma.review.groupBy({
    by: ["rating"],
    _count: { id: true },
    orderBy: { rating: "desc" },
  });

  return actionResponse({
    reviews,
    total,
    totalPages: Math.ceil(total / pageSize),
    avgRating: stats._avg.rating ?? 0,
    totalReviews: stats._count.id,
    ratingCounts,
  });
};

export const replyToReview = async (reviewId: string, reply: string) => {
  if (!reply.trim()) return actionError("Reply cannot be empty");

  await prisma.review.update({
    where: { id: reviewId },
    data: { adminReply: reply.trim() },
  });

  revalidatePath("/admin/reviews");
  return actionResponse({ ok: true });
};

export const deleteReply = async (reviewId: string) => {
  await prisma.review.update({
    where: { id: reviewId },
    data: { adminReply: null },
  });

  revalidatePath("/admin/reviews");
  return actionResponse({ ok: true });
};

export const togglePublishReview = async (reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: { isPublished: true },
  });
  if (!review) return actionError("Review not found");

  await prisma.review.update({
    where: { id: reviewId },
    data: { isPublished: !review.isPublished },
  });

  revalidatePath("/admin/reviews");
  return actionResponse({ ok: true });
};

export const deleteReview = async (reviewId: string) => {
  await prisma.review.delete({ where: { id: reviewId } });
  revalidatePath("/admin/reviews");
  return actionResponse({ ok: true });
};
