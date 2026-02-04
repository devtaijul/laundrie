import { getActiveOrders } from "@/actions/order.actions";
import React, { Suspense } from "react";
import { NewOrderSectionSkeleton } from "../skeletons/NewOrderSectionSkeleton";
import { Laundrie } from "./Laundrie";
import { LaundrieActiveOrders } from "./LaundrieActiveOrders";

export const LaundrieServer = async () => {
  const laundrie = await getActiveOrders();
  console.log(laundrie, "data");

  return (
    <div className="max-w-md mx-auto">
      <Suspense fallback={<NewOrderSectionSkeleton />}>
        {laundrie.data?.length === 0 ? <Laundrie /> : <LaundrieActiveOrders />}
      </Suspense>
    </div>
  );
};
