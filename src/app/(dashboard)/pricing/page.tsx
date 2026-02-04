"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ArrowLeft, HelpCircle, Plus, X } from "lucide-react";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export default function PricingPage() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>(["minimum"]);

  const faqItems: FAQItem[] = [
    {
      id: "minimum",
      question: "Is there a minimum charge?",
      answer:
        "Yes, $30. You can give us as little or as much laundry as you want, but if the weight of your laundry multiplied by the $/pound price is less than $30, the cost of your laundry service will be $30. The minimum on Express orders is $40.",
    },
    {
      id: "oversized",
      question: "What about oversized items?",
      answer:
        "Oversized items like comforters, sleeping bags, and rugs are charged separately based on size and cleaning requirements.",
    },
    {
      id: "estimated",
      question: "What is the estimated cost?",
      answer:
        "Costs are calculated by weight. A typical load of laundry weighs about 7–10 pounds and costs $7–20 depending on the service level.",
    },
    {
      id: "unexpected",
      question: "Are there unexpected fees?",
      answer:
        "No hidden fees. All prices are transparent and communicated upfront. Any additional services will be confirmed with you first.",
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <TopNavigation title="Pricing" />
      {/* Content */}
      <div className="px-4 py-24 max-w-md mx-auto">
        <Card className="border-none shadow-none">
          {/* Service Tiers */}
          <div className="mb-8 space-y-4">
            <div className="rounded-lg bg-muted/30 p-4">
              <h3 className="mb-1 text-lg font-semibold">Standard Service</h3>
              <p className="text-muted-foreground">Starting at $1/pound</p>
            </div>

            <div className="rounded-lg bg-muted/30 p-4">
              <h3 className="mb-1 text-lg font-semibold">Express Service</h3>
              <p className="text-muted-foreground">Starting at $2/pound</p>
            </div>

            <div className="rounded-lg bg-muted/30 p-4">
              <p className="font-medium">Free pickup and delivery, always.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            {faqItems.map((item) => {
              const isOpen = openItems.includes(item.id);
              return (
                <Collapsible
                  key={item.id}
                  open={isOpen}
                  onOpenChange={() => toggleItem(item.id)}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between rounded-lg p-4 transition-colors hover:bg-muted/50">
                      <span className="text-left font-medium">
                        {item.question}
                      </span>
                      <div className="ml-4 flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                          {isOpen ? (
                            <X className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <Plus className="h-4 w-4 text-primary-foreground" />
                          )}
                        </div>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4 text-muted-foreground">
                      {item.answer}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
