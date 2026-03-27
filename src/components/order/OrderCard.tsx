"use client";

import React from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

import {
  formatDate,
  formatMoney,
  getStatusColor,
  getStatusText,
} from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Order } from "@/generated/prisma";

export const OrderCard = ({ order }: { order: Order }) => {
  const router = useRouter();
  return (
    <Card
      className="bg-background/95 backdrop-blur-sm cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => router.push(`/orders/${order.id}`)}
    >
      <div className="!p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-foreground">{order.orderId}</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {getStatusText(order.status)}
          </Badge>
        </div>

        <div className="space-y-2 mb-3">
          <p className="text-sm text-muted-foreground">
            {order.machineCount ?? 1} machine
            {(order.machineCount ?? 1) > 1 ? "s" : ""}
            {order.oversizedItems + (order.pillowItems ?? 0) + (order.duvetItems ?? 0) > 0
              ? ` · ${order.oversizedItems + (order.pillowItems ?? 0) + (order.duvetItems ?? 0)} oversized item${order.oversizedItems + (order.pillowItems ?? 0) + (order.duvetItems ?? 0) > 1 ? "s" : ""}`
              : ""}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">
            {formatMoney(order.totalCents, true)}
          </span>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </Card>
  );
};
