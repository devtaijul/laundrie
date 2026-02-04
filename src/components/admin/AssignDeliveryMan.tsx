"use client";

import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const AssignDeliveryMan = () => {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);

  const drivers = [
    { id: "1", name: "John Driver", avatar: "john", available: true },
    { id: "2", name: "Sarah Delivery", avatar: "sarah", available: true },
    { id: "3", name: "Mike Transport", avatar: "mike", available: false },
  ];
  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Assign Driver
        </h3>

        {/* Search Driver */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search Driver" className="pl-9" />
        </div>

        {/* Driver List */}
        <div className="space-y-3">
          {drivers.map((driver) => (
            <div
              key={driver.id}
              onClick={() => driver.available && setSelectedDriver(driver.id)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${
                selectedDriver === driver.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted/50"
              } ${!driver.available ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${driver.avatar}`}
                  />
                  <AvatarFallback>{driver.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{driver.name}</span>
              </div>
              {!driver.available && (
                <span className="text-xs text-muted-foreground">
                  Unavailable
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Save Button */}
        <Button
          className="w-full mt-6 bg-primary hover:bg-primary/90"
          size="lg"
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
