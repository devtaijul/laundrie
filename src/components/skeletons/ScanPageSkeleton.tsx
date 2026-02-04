"use client";

import React from "react";
import { BottomNavigation } from "../layout/BottomNavigation";
import { TopNavigation } from "../layout/TopNavigation";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ScanPageSkeleton = () => {
  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <TopNavigation title="Scan" />

      {/* Content */}
      <div className="px-4 py-24 mt-10 max-w-lg mx-auto">
        <Card className="bg-primary/5 border-none shadow-none">
          <div className="space-y-8 p-6">
            {/* QR Code Icon + Text */}
            <div className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
              <div className="flex flex-col items-center gap-2">
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            {/* QR Code Box */}
            <div className="flex justify-center">
              <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-border bg-white">
                <Skeleton className="h-40 w-40 rounded-md" />
              </div>
            </div>

            {/* Reward Info */}
            <div className="flex justify-center space-x-8">
              {/* Reward column */}
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-16 mx-auto" />
                  <Skeleton className="h-3 w-24 mx-auto" />
                </div>
              </div>

              {/* Laundry Pro column */}
              <div className="text-center space-y-2">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Skeleton className="h-6 w-6 rounded-md" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20 mx-auto" />
                  <Skeleton className="h-3 w-16 mx-auto" />
                </div>
              </div>
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-12 w-full rounded-md" />
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};
