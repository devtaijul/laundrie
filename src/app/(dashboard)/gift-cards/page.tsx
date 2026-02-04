"use client";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>("$50.00");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [sendToMyself, setSendToMyself] = useState<boolean>(false);

  // You can replace with unique values like ["$25.00", "$50.00", "$75.00", "$100.00"]
  const amounts = ["$50.00", "$50.00", "$50.00", "$50.00"];

  return (
    <div className="min-h-screen  pb-20">
      {/* Header */}
      <TopNavigation title="Gift Cards" />

      {/* Content */}
      <div className="px-4 py-24 max-w-lg mx-auto">
        <Card className="border-none shadow-none">
          {/* Gift Card Visual */}
          <div className="mb-8 flex justify-center">
            <div className="relative h-48 w-80 overflow-hidden rounded-2xl bg-linear-to-br from-cyan-500 to-cyan-600 p-8 text-white">
              {/* Decorative elements */}
              <div className="absolute right-4 top-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/30">
                  <div className="h-8 w-8 rounded-full border border-white/40" />
                </div>
              </div>
              <div className="absolute left-8 top-8">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40">
                  <div className="h-2 w-2 rounded-full bg-white/60" />
                </div>
              </div>
              <div className="absolute bottom-8 left-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                  <div className="h-6 w-6 rounded-full border border-white/40" />
                </div>
              </div>

              {/* Stars */}
              <div className="absolute right-16 top-12 text-white/40">★</div>
              <div className="absolute right-12 bottom-16 text-white/40">★</div>

              {/* Brand */}
              <div className="absolute left-4 top-4 text-xl font-semibold">
                laundrie
              </div>

              {/* Amount */}
              <div className="absolute right-4 bottom-4 text-right">
                <div className="text-2xl font-bold">
                  {selectedAmount === "CUSTOM"
                    ? customAmount || "$—"
                    : selectedAmount.replace(".00", "")}
                </div>
                <div className="text-sm opacity-90">Gift Card</div>
                <div className="text-xs opacity-70">expires: 01/01/22</div>
              </div>
            </div>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <h3 className="mb-4 text-center text-lg font-semibold">
              eGift card amount
            </h3>
            <div className="mb-4 flex gap-2">
              {amounts.map((amount, index) => (
                <Button
                  key={`${amount}-${index}`}
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className={`flex-1 ${
                    selectedAmount === amount
                      ? "bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground"
                  }`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount}
                </Button>
              ))}
              <Button
                variant={selectedAmount === "CUSTOM" ? "default" : "outline"}
                className={`px-6 ${
                  selectedAmount === "CUSTOM"
                    ? "bg-primary text-primary-foreground"
                    : "border-input bg-background text-foreground"
                }`}
                onClick={() => setSelectedAmount("CUSTOM")}
              >
                CUSTOM
              </Button>
            </div>

            {/* Custom amount input (only when CUSTOM selected) */}
            {selectedAmount === "CUSTOM" && (
              <Input
                inputMode="decimal"
                placeholder="Enter custom amount (e.g., 75.00)"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="border-input bg-background"
              />
            )}
          </div>

          {/* Send to myself toggle */}
          <div className="mb-6 flex items-center justify-between rounded-lg bg-muted p-4">
            <span className="text-sm">Send this gift card to myself</span>
            <Switch checked={sendToMyself} onCheckedChange={setSendToMyself} />
          </div>

          {/* Recipient Details */}
          <div className="mb-6 space-y-4">
            <Input
              placeholder="Recipient name"
              className="border-input bg-background"
            />
            <Input
              placeholder="Recipient Email Address"
              type="email"
              className="border-input bg-background"
            />
          </div>

          {/* Your Details */}
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">Your details</h3>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                className="border-input bg-background"
              />
              <Textarea
                placeholder="Personal Message (Optional)"
                className="min-h-[100px] border-input bg-background"
              />
            </div>
          </div>

          {/* Send Options */}
          <div className="mb-6">
            <Select defaultValue="instantly">
              <SelectTrigger className="border-input bg-background">
                <SelectValue placeholder="Send Instantly" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instantly">Send Instantly</SelectItem>
                <SelectItem value="scheduled">Schedule for Later</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Continue Button */}
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Continue to checkout
          </Button>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
