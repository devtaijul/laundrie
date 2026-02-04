"use server";

import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import {
  AdminNotificationFormData,
  BusinessFormData,
  PaymentSettingFormData,
  SMSConfigurationFormData,
} from "@/lib/zodSchema";

// GETTING : Settings
export const getBusinessSetting = async () => {
  try {
    const businessSettings = await prisma.business.findFirst();

    if (!businessSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(businessSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

export const getSafePaymentSetting = async () => {
  try {
    const safePaymentSettings = await prisma.paymentSetting.findFirst({
      omit: {
        stripe_secret_key: true,
      },
    });

    if (!safePaymentSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(safePaymentSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

export const getPaymentSetting = async () => {
  try {
    const paymentSettings = await prisma.paymentSetting.findFirst();

    if (!paymentSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(paymentSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

export const getAdminNotificationSetting = async () => {
  try {
    const adminNotificationSettings =
      await prisma.adminNotification.findFirst();

    if (!adminNotificationSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(adminNotificationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

export const getSmsConfigurationSetting = async () => {
  try {
    const smsConfigurationSettings = await prisma.sMSConfiguration.findFirst();

    if (!smsConfigurationSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(smsConfigurationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

export const getCustomerNotificationSetting = async () => {
  try {
    const customerNotificationSettings =
      await prisma.customerNotification.findFirst();

    if (!customerNotificationSettings) {
      return actionError("Settings not found");
    }

    return actionResponse(customerNotificationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get settings");
  }
};

// UPDATE : Settings
export const updateBusinessSetting = async (
  data: BusinessFormData,
  id: string
) => {
  try {
    const businessSettings = await prisma.business.update({
      where: { id },
      data,
    });

    return actionResponse(businessSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update settings");
  }
};

export const updatePaymentSetting = async (
  data: PaymentSettingFormData,
  id: string
) => {
  try {
    const paymentSettings = await prisma.paymentSetting.update({
      where: { id },
      data,
    });

    return actionResponse(paymentSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update settings");
  }
};

export const updateAdminNotificationSetting = async (
  data: AdminNotificationFormData,
  id: string
) => {
  try {
    const adminNotificationSettings = await prisma.adminNotification.update({
      where: { id },
      data,
    });

    return actionResponse(adminNotificationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update settings");
  }
};

export const updateSmsConfigurationSetting = async (
  data: SMSConfigurationFormData,
  id: string
) => {
  try {
    const smsConfigurationSettings = await prisma.sMSConfiguration.update({
      where: { id },
      data,
    });

    return actionResponse(smsConfigurationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update settings");
  }
};

export const updateCustomerNotificationSetting = async (
  data: any,
  id: string
) => {
  try {
    const customerNotificationSettings =
      await prisma.customerNotification.update({
        where: { id },
        data,
      });

    return actionResponse(customerNotificationSettings);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update settings");
  }
};
