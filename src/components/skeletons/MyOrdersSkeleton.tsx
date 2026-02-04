import React from "react";
import { OrderCardSkeleton } from "./OrderCardSkeleton";

export const MyOrdersSkeleton = () => {
  return (
    <div className="px-4 py-20 max-w-[500px] mx-auto space-y-3">
      {[1, 2, 3].map((item) => (
        <OrderCardSkeleton key={item} />
      ))}
    </div>
  );
};
