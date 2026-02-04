"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Gift, HandHeart, HelpCircle } from "lucide-react";

const HowDoRefWorkModal = () => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  return (
    <>
      <Button
        variant="link"
        className="text-primary text-lg underline"
        onClick={() => setShowHowItWorks(true)}
      >
        How do referrals work?
      </Button>
      {/* How It Works Modal (simple custom overlay) */}
      {showHowItWorks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md bg-background">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">
                    How do referrals work?
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowHowItWorks(false)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  ×
                </Button>
              </div>

              <div className="space-y-6">
                {[
                  { number: "1", text: "Select your referral", icon: Gift },
                  {
                    number: "2",
                    text: "Recommend your Laundry Pro (optional)",
                    icon: HandHeart,
                  },
                  { number: "3", text: "Share with a friend", icon: HandHeart },
                  {
                    number: "4",
                    text: "Your friend gets credits towards their first order",
                    icon: Gift,
                  },
                  {
                    number: "5",
                    text: "You earn credits when their first order is delivered!",
                    icon: Gift,
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{step.text}</p>
                      {index < 4 && (
                        <div className="ml-4 mt-2 h-6 w-px bg-primary/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default HowDoRefWorkModal;
