import React, { Suspense } from "react";
import { OrderFlow } from "./OrderFlow";
import { getSafePaymentSetting } from "@/actions/setting.actions";

export const ServerOrderFlow = async () => {
  const data = await getSafePaymentSetting();

  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const paymentSetting = data.data;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderFlow paymentSetting={paymentSetting} />;
    </Suspense>
  );
};
