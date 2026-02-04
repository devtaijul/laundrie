import { OrderData } from "@/contexts/OrderContext";
import { OrderEventType, OrderStatus } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusColor = (status: OrderStatus) => {
  console.log("Status", status);

  switch (status) {
    case "PENDING":
      return "bg-yellow-500";

    case "PAID":
      return "bg-emerald-500";

    case "PROCESSING":
      return "bg-purple-500";

    case "PICKUP_SCHEDULED":
      return "bg-blue-500";

    case "PICKED_UP":
      return "bg-indigo-500";

    case "DELIVERY_SCHEDULED":
      return "bg-orange-500";

    case "DELIVERED":
      return "bg-gray-500";

    case "FAILED":
      return "bg-red-500";

    case "CANCELED":
      return "bg-red-400";

    default:
      return "bg-gray-500";
  }
};

export const getEventStatusColor = (type: OrderEventType) => {
  switch (type) {
    case "PICKUP_SCHEDULED":
      return "bg-blue-500";

    case "PICKED_UP":
      return "bg-indigo-500";

    case "CLEANING_STARTED":
      return "bg-purple-500";

    case "CLEANING_DONE":
      return "bg-green-500";

    case "DELIVERY_SCHEDULED":
      return "bg-orange-500";

    case "DELIVERED":
      return "bg-gray-600";

    case "STATUS_CHANGED":
      return "bg-teal-500";

    default:
      return "bg-gray-400";
  }
};

export const getStatusText = (status: string) => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const formatDate = (dateString?: Date) => {
  const date = new Date(dateString || Date.now());
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatMoney = (amount: number, isInCents = false) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
  });
  return formatter.format(isInCents ? amount / 100 : amount);
};

export const getOrderStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";

    case "PROCESSING":
      return "bg-purple-100 text-purple-700 hover:bg-purple-100";

    case "PICKUP_SCHEDULED":
      return "bg-blue-100 text-blue-700 hover:bg-blue-100";

    case "PICKED_UP":
      return "bg-indigo-100 text-indigo-700 hover:bg-indigo-100";

    case "DELIVERY_SCHEDULED":
      return "bg-orange-100 text-orange-700 hover:bg-orange-100";

    case "DELIVERED":
      return "bg-green-100 text-green-700 hover:bg-green-100";

    case "FAILED":
      return "bg-red-100 text-red-700 hover:bg-red-100";

    case "CANCELED":
      return "bg-red-200 text-red-800 hover:bg-red-200";

    default:
      return "bg-gray-100 text-gray-700 hover:bg-gray-100";
  }
};

export const orderCalculation = (state: OrderData) => {
  const {
    smallBags,
    regularBags,
    largeBags,
    deliverySpeed,
    oversizedItems,
    coverageType,
    coverageCost,
  } = state;
  const isExpress = deliverySpeed === "express";

  // Pricing constants
  const basePrice = isExpress ? 30 : 25;
  const additionalPrice = isExpress ? 18 : 16;
  const deliveryFee = 9;
  const oversizedItemPrice = 15;
  const taxRate = 0.21; // 21%
  const minimumCharge = 40;

  // Calculate total machines
  let totalMachines = 0;
  if (smallBags > 0) totalMachines = smallBags;
  if (regularBags > 0) totalMachines = regularBags;
  if (largeBags > 0) totalMachines = largeBags * 1.5;

  // Calculate costs
  const machinesCost =
    totalMachines > 0
      ? basePrice + Math.max(0, Math.ceil(totalMachines) - 1) * additionalPrice
      : 0;
  const oversizedCost = oversizedItems * oversizedItemPrice;
  const subtotal = machinesCost + oversizedCost + deliveryFee;
  const tax = subtotal * taxRate;

  const total = Math.max(minimumCharge, subtotal + tax + coverageCost);

  return {
    machinesCost,
    oversizedCost,
    deliveryFee,
    subtotal,
    tax,
    coverageCost,
    total,
    minimumCharge,
    isExpress,
  };
};
