"use client";

import { useOrder } from "@/contexts/OrderContext";
import React from "react";
import { PickupLocationStep } from "./steps/PickupLocationStep";
import { DeliverySpeedStep } from "./steps/DeliverySpeedStep";
import { LaundryCareStep } from "./steps/LaundryCareStep";
import { BagCountStep } from "./steps/BagCountStep";
import { OversizedItemsStep } from "./steps/OversizedItemsStep";
import { CoverageStep } from "./steps/CoverageStep";
import { ReviewOrderStep } from "./steps/ReviewOrderStep";
import { PaymentStep } from "./steps/PaymentStep";
import { OrderHeader } from "./OrderHeader";
import { ProgressBar } from "./ProgressBar";
import { SafePaymentSetting } from "@/types/global-type";

export const OrderFlow = ({
  paymentSetting,
}: {
  paymentSetting: SafePaymentSetting | null;
}) => {
  const { state } = useOrder();
  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <PickupLocationStep />;
      case 2:
        return <DeliverySpeedStep />;
      case 3:
        return <LaundryCareStep />;
      case 4:
        return <BagCountStep />;
      case 5:
        return <OversizedItemsStep />;
      case 6:
        return <CoverageStep />;
      case 7:
        return <ReviewOrderStep />;
      case 8:
        return <PaymentStep paymentSetting={paymentSetting} />;
      default:
        return <PickupLocationStep />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <OrderHeader />
      <div className="pt-20">
        <ProgressBar />
        <div className="pb-32">{renderCurrentStep()}</div>
      </div>
    </div>
  );
};
