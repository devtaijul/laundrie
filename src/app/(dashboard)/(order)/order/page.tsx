import type { Metadata } from "next";
import { getSafePaymentSetting } from "@/actions/setting.actions";

export const metadata: Metadata = {
  title: "New Order",
  description: "Schedule a laundry pickup with Laundrie.",
};
import { ServerOrderFlow } from "@/components/order/ServerOrderFlow";

const page = () => {
  getSafePaymentSetting();
  return <ServerOrderFlow />;
};

export default page;
