"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const AdminDetailsHeader = () => {
  const [orderStatus, setOrderStatus] = useState("in-progress");

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-foreground">Order Details</h1>
      <Select value={orderStatus} onValueChange={setOrderStatus}>
        <SelectTrigger className="w-full sm:w-[180px] bg-cyan-50 text-cyan-700 border-cyan-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="unfulfillment">Unfulfillment</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
