import type { Metadata } from "next";
import PricingClient from "@/components/pricing/PricingClient";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for Laundrie's laundry services. Standard from $1/pound, Express from $2/pound. Free pickup and delivery always included.",
};

export default function PricingPage() {
  return <PricingClient />;
}
