"use server";

import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { OrderEventType, OrderStatus } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { EVENT_TITLE } from "@/lib/order-event-titles";

// Map order status → the event that should be logged when that status is set
const STATUS_TO_EVENT: Partial<Record<OrderStatus, OrderEventType>> = {
  [OrderStatus.PICKUP_SCHEDULED]: OrderEventType.PICKUP_SCHEDULED,
  [OrderStatus.PICKED_UP]: OrderEventType.PICKED_UP,
  [OrderStatus.DELIVERY_SCHEDULED]: OrderEventType.DELIVERY_SCHEDULED,
  [OrderStatus.DELIVERED]: OrderEventType.DELIVERED,
};

export const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  note?: string,
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status },
    });

    const eventType = STATUS_TO_EVENT[status];
    if (eventType) {
      await prisma.orderEvent.create({
        data: {
          orderId,
          type: eventType,
          title: EVENT_TITLE[eventType],
          note,
        },
      });
    }

    revalidatePath(`/admin/orders/${orderId}`);
    return actionResponse({ status });
  } catch {
    return actionError("Failed to update order status");
  }
};

export const logCleaningEvent = async (
  orderId: string,
  type: OrderEventType.CLEANING_STARTED | OrderEventType.CLEANING_DONE,
  note?: string,
) => {
  try {
    await prisma.orderEvent.create({
      data: {
        orderId,
        type,
        title: EVENT_TITLE[type],
        note,
      },
    });

    revalidatePath(`/admin/orders/${orderId}`);
    return actionResponse({ ok: true });
  } catch {
    return actionError("Failed to log cleaning event");
  }
};

export const assignDriverToOrder = async (
  orderId: string,
  driverId: string,
) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { riderId: driverId },
    });

    revalidatePath(`/admin/orders/${orderId}`);
    return actionResponse({ ok: true });
  } catch {
    return actionError("Failed to assign driver");
  }
};
