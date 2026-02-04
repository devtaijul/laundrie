"use client";
import { Button } from "@/components/ui/button";
import { Home, Receipt } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const SuccessRedirect = () => {
  const router = useRouter();
  return (
    <div className="space-y-3">
      <Button
        onClick={() => router.push("/orders")}
        className="w-full bg-primary hover:bg-primary/90 text-white"
      >
        <Receipt className="h-4 w-4 mr-2" />
        View Order Details
      </Button>

      <Button
        onClick={() => router.push("/dashboard")}
        variant="outline"
        className="w-full"
      >
        <Home className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
    </div>
  );
};
