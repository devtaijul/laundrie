import type { Metadata } from "next";
import FaqClient from "@/components/faq/FaqClient";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to frequently asked questions about Laundrie's pickup, delivery, wash temperatures, and laundry services.",
};

export default function FAQPage() {
  return <FaqClient />;
}
