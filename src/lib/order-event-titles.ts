import { OrderEventType } from "@/generated/prisma";

export const EVENT_TITLE: Record<OrderEventType, string> = {
  [OrderEventType.PICKUP_SCHEDULED]: "Pickup Scheduled",
  [OrderEventType.PICKED_UP]: "Order Picked Up",
  [OrderEventType.CLEANING_STARTED]: "Cleaning Started",
  [OrderEventType.CLEANING_DONE]: "Cleaning Complete",
  [OrderEventType.DELIVERY_SCHEDULED]: "Delivery Scheduled",
  [OrderEventType.DELIVERED]: "Order Delivered",
};
