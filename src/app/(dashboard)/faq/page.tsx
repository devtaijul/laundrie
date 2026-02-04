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

export default function FAQPage() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<string[]>(["pickup"]);

  const faqItems: FAQItem[] = [
    {
      id: "pickup",
      question: "Free pickup/delivery?",
      answer:
        "The laundry service that your Poplin Laundry Pro provides includes free pickup and delivery, 7 days a week.",
    },
    {
      id: "bags",
      question: "Laundry bags",
      answer:
        "We provide laundry bags for your convenience. You can use your own bags or request our premium laundry bags.",
    },
    {
      id: "wash-temp",
      question: "Wash temperature",
      answer:
        "We wash your clothes according to care labels and your preferences. Hot, warm, and cold water options are available.",
    },
    {
      id: "dry-temp",
      question: "Dry temperature",
      answer:
        "Our drying process uses appropriate temperatures based on fabric care requirements to prevent shrinkage and damage.",
    },
    {
      id: "leave-out",
      question: "Can't leave laundry out",
      answer:
        "If you can't leave laundry out, we offer flexible pickup options including scheduled times when you're home.",
    },
    {
      id: "products",
      question: "Additional laundry products",
      answer:
        "We offer premium detergents, fabric softeners, and special treatments for delicate items at additional cost.",
    },
    {
      id: "services",
      question: "Other services",
      answer:
        "In addition to regular laundry, we offer dry cleaning, alterations, and specialized cleaning for luxury items.",
    },
    {
      id: "hotel",
      question: "Hotel guests",
      answer:
        "We provide laundry services for hotel guests with special arrangements for pickup and delivery coordination.",
    },
    {
      id: "schedule",
      question: "Schedule a pickup",
      answer:
        "You can schedule pickups through our app, website, or by calling our customer service team.",
    },
    {
      id: "maximums",
      question: "Order maximums",
      answer:
        "There are no maximum order limits. We can handle everything from single items to large household loads.",
    },
    {
      id: "size",
      question: "Size limitations",
      answer:
        "We accept most household textiles. Oversized items like comforters and rugs may require special handling.",
    },
    {
      id: "unsafe",
      question: "Unsafe or unsanitary laundry",
      answer:
        "For safety reasons, we cannot process items contaminated with hazardous materials or bodily fluids.",
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
      <TopNavigation title="FAQ" />

      {/* Content */}
      <div className="px-4 py-6 max-w-[500px] mx-auto">
        <Card className="border-none shadow-none p-4 backdrop-blur-sm my-20">
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
