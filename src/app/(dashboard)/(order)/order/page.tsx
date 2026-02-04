import { getSafePaymentSetting } from "@/actions/setting.actions";
import { ServerOrderFlow } from "@/components/order/ServerOrderFlow";

const page = () => {
  getSafePaymentSetting();
  return <ServerOrderFlow />;
};

export default page;
