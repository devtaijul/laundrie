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

    case "WASHING":
      return "bg-sky-500";

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

export const PRICING = {
  machine: {
    standard: { base: 25, additional: 20 },
    express: { base: 30, additional: 20 },
  },
  oversizedItem: 15, // per item: oversized, pillow, duvet
  softener: 2.5, // classic detergent + softener addon
  hangers: 5, // everything on hangers addon
  iron: 3, // per piece ironing
  deliveryFee: 9,
  taxRate: 0.15,
} as const;

export const orderCalculation = (state: OrderData) => {
  const {
    machineCount = 1,
    deliverySpeed,
    oversizedItems,
    pillowItems = 0,
    duvetItems = 0,
    coverageCost,
    detergent,
    foldingOption,
    ironPieces = 0,
  } = state;

  const isExpress = deliverySpeed === "express";
  const machinePricing = isExpress
    ? PRICING.machine.express
    : PRICING.machine.standard;

  // Machine cost: first machine at base price, each additional at €20
  const machinesCost =
    machineCount > 0
      ? machinePricing.base +
        Math.max(0, machineCount - 1) * machinePricing.additional
      : 0;

  console.log("machinesCost", machinesCost);

  // Oversized items cost (oversized items + pillows + duvets)
  const oversizedCost =
    (oversizedItems + pillowItems + duvetItems) * PRICING.oversizedItem;

  console.log("oversizedCost", oversizedCost);

  // Laundry care addons
  const softenerCost = detergent === "classic-softener" ? PRICING.softener : 0;
  console.log(softenerCost, "softernerCost");

  const hangersCost = foldingOption === "hangers" ? PRICING.hangers : 0;
  console.log(hangersCost, "hangersCost");
  const ironCost = ironPieces * PRICING.iron;
  console.log(ironCost, "ironCost");

  const subtotal =
    machinesCost +
    oversizedCost +
    softenerCost +
    hangersCost +
    ironCost +
    PRICING.deliveryFee;

  console.log(subtotal, "subtotal");

  const tax = subtotal * PRICING.taxRate;
  console.log(tax, "tax");
  const total = subtotal + tax + (coverageCost ?? 0);
  console.log(total, "total");

  return {
    machinesCost,
    oversizedCost,
    softenerCost,
    hangersCost,
    ironCost,
    deliveryFee: PRICING.deliveryFee,
    subtotal,
    tax,
    coverageCost: coverageCost ?? 0,
    total,
    isExpress,
  };
};
