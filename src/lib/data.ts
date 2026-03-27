import { ReferralOption } from "@/types/global-type";

export const referralOptions: ReferralOption[] = [
  {
    icon: "GIFT",
    title: "Give $10/Get $10",
    subtitle: "give a little/get a little",
    iconColor: "text-primary",
    giftAmount: 10,
  },
  {
    icon: "HAND_ICON",
    title: "Give $20/Get $0",
    subtitle: "give a little/get a little",
    iconColor: "text-primary",
    giftAmount: 20,
  },
];

export const pickupSpot = [
  {
    label: "Front Door",
    value: "FRONT_DOOR",
  },
  {
    label: "Back Door",
    value: "BACK_DOOR",
  },
  {
    label: "Front Desk",
    value: "FRONT_DESK",
  },
  {
    label: "Custom",
    value: "CUSTOM",
  },
];

export const speedOptions = [
  {
    id: "standard",
    title: "Standard",
    subtitle: "Delivery within 48 hours",
    details: "(4 hour collection window)",
    availability: "Next available collection:\nTomorrow, 10:00 AM - 12:00 PM",
    price: "€25",
    priceUnit: "per washing machine (approx. 4–5 kg of laundry)",
  },
  {
    id: "express",
    title: "Express",
    subtitle: "Same-day or next-day delivery",
    details: "(2 hour collection window)",
    availability: "Next available collection:\nTomorrow, 10:00 AM - 12:00 PM",
    price: "€30",
    priceUnit: "per washing machine (approx. 4–5 kg of laundry)",
  },
];

export const coverageOptions = [
  {
    id: "basic",
    title: "Basic",
    description: "Covers $50/garment",
    maxCoverage: "Maximum $300/order",
    price: 0.0,
    isSelected: true,
  },
  {
    id: "premium",
    title: "Premium",
    description: "Covers $100/garment",
    maxCoverage: "Maximum $500/order",
    price: 2.5,
  },
  {
    id: "premium-plus",
    title: "Premium+",
    description: "Covers $150/garment",
    maxCoverage: "Maximum $1000/order",
    price: 4.75,
  },
];
