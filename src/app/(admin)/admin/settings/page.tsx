import {
  getAdminNotificationSetting,
  getBusinessSetting,
  getCustomerNotificationSetting,
  getPaymentSetting,
  getSmsConfigurationSetting,
} from "@/actions/setting.actions";
import AdminSettings from "@/components/admin/AdminSettings";
import React from "react";

const page = () => {
  getBusinessSetting();
  getPaymentSetting();
  getAdminNotificationSetting();
  getSmsConfigurationSetting();
  getCustomerNotificationSetting();
  return <AdminSettings />;
};

export default page;
