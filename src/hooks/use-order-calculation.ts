"use client";

import { useMemo } from "react";
import { useOrder } from "@/contexts/OrderContext";
import { orderCalculation } from "@/lib/utils";

export const useOrderCalculation = () => {
  const { state } = useOrder();

  return useMemo(() => orderCalculation(state.data), [state.data]);
};
