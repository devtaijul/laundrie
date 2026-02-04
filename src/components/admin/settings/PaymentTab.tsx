import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Suspense } from "react";
import { PaymentTabFormSkeleton } from "@/components/skeletons/PaymentTabFormSkeleton";
import { PaymentTabForm } from "./PaymentTabForm";
import { getPaymentSetting } from "@/actions/setting.actions";

export const PaymentTab = async () => {
  const data = await getPaymentSetting();
  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const paymentSetting = data.data;
  return (
    <TabsContent value="payments" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Configure payment gateways and methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Suspense fallback={<PaymentTabFormSkeleton />}>
            <PaymentTabForm paymentSetting={paymentSetting} />
          </Suspense>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
