import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TabsContent } from "@/components/ui/tabs";
import { BusinessTabForm } from "./BusinessTabForm";
import { Suspense } from "react";
import { BusinessTabFormSkeleton } from "@/components/skeletons/BusinessTabFormSkeleton";
import { getBusinessSetting } from "@/actions/setting.actions";

export const BusinessTab = async () => {
  const data = await getBusinessSetting();
  if (!data.success) {
    return <div>{data.message}</div>;
  }

  const business = data.data;
  return (
    <TabsContent value="business" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Manage your business details and company information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<BusinessTabFormSkeleton />}>
            <BusinessTabForm business={business} />
          </Suspense>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
