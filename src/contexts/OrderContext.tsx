// contexts/OrderContext.tsx
"use client";

import React, { createContext, useContext, useReducer } from "react";

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

export interface OrderData {
  // Step 1: Pickup Location
  pickupAddress: string; // human-readable summary
  pickupSpot: string;
  pickupInstructions: string;
  savedAddress?: Address; // <<— NEW: keep the full address

  // Step 2: Delivery Speed
  deliverySpeed: "standard" | "express";

  // Step 3: Laundry Care
  detergent: string;
  delicateCycle: boolean;
  returnOnHangers: boolean;
  additionalRequests: string;

  // Step 4: Bag Count
  smallBags: number;
  regularBags: number;
  largeBags: number;

  // Step 5: Oversized Items
  oversizedItems: number;

  // Step 6: Coverage
  coverageType: "basic" | "premium" | "premium-plus";
  coverageCost: number;

  // Step 7: Payment
  promoCode: string;
  giftCard: string;
  paymentMethod: string;
}

export interface OrderState {
  currentStep: number;
  data: OrderData;
}

type OrderAction =
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SET_STEP"; step: number }
  | {
      type: "UPDATE_DATA";
      field: keyof OrderData;
      value: OrderData[keyof OrderData];
    }
  | { type: "RESET_ORDER" };

const initialState: OrderState = {
  currentStep: 1,
  data: {
    pickupAddress: "",
    pickupSpot: "",
    pickupInstructions: "",
    deliverySpeed: "standard",
    detergent: "Classic Scented",
    delicateCycle: false,
    returnOnHangers: false,
    additionalRequests: "",
    smallBags: 0,
    regularBags: 0,
    largeBags: 0,
    oversizedItems: 0,
    coverageType: "basic",
    coverageCost: 0,
    promoCode: "",
    giftCard: "",
    paymentMethod: "",
  },
};

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, currentStep: Math.min(state.currentStep + 1, 8) };
    case "PREV_STEP":
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "UPDATE_DATA":
      return {
        ...state,
        data: { ...state.data, [action.field]: action.value },
      };
    case "RESET_ORDER":
      return initialState;
    default:
      return state;
  }
}

const OrderContext = createContext<{
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
} | null>(null);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within an OrderProvider");
  return ctx;
};
