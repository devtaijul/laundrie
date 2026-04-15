"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { hashToken } from "@/lib/helper/auth";
import { actionError, actionResponse } from "@/lib/server/utils";
import {
  AdminNotificationFormData,
  AdminProfileFormData,
  BusinessFormData,
  ChangePasswordFormData,
  EmailConfigurationFormData,
  PaymentSettingFormData,
  SecurityFormData,
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

// ─── Security ────────────────────────────────────────────────────────────────

export const getSecuritySetting = async () => {
  try {
    const security = await prisma.security.findFirst();
    if (!security) return actionError("Settings not found");
    return actionResponse(security);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get security settings");
  }
};

export const updateSecuritySetting = async (
  data: SecurityFormData,
  id: string
) => {
  try {
    const { ip_whitelist, ...rest } = data;
    const ipList = ip_whitelist
      ? ip_whitelist
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const security = await prisma.security.update({
      where: { id },
      data: { ...rest, ip_whitelist: ipList },
    });
    return actionResponse(security);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update security settings");
  }
};

// ─── Email Configuration ─────────────────────────────────────────────────────

export const getEmailConfigurationSetting = async () => {
  try {
    const emailConfig = await prisma.emailConfiguration.findFirst();
    if (!emailConfig) return actionError("Settings not found");
    return actionResponse(emailConfig);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get email configuration");
  }
};

export const updateEmailConfigurationSetting = async (
  data: EmailConfigurationFormData,
  id: string
) => {
  try {
    const emailConfig = await prisma.emailConfiguration.update({
      where: { id },
      data,
    });
    return actionResponse(emailConfig);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update email configuration");
  }
};

// ─── Admin Profile ────────────────────────────────────────────────────────────

export const getAdminProfile = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) return actionError("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        name: true,
      },
    });
    if (!user) return actionError("User not found");
    return actionResponse(user);
  } catch (error) {
    console.log(error);
    return actionError("Failed to get admin profile");
  }
};

export const updateAdminProfile = async (data: AdminProfileFormData) => {
  try {
    const session = await auth();
    if (!session?.user?.id) return actionError("Unauthorized");

    const { firstName, lastName, email, phone } = data;

    // check email uniqueness (excluding self)
    const existing = await prisma.user.findFirst({
      where: { email: email.toLowerCase(), NOT: { id: session.user.id } },
      select: { id: true },
    });
    if (existing) return actionError("Email already in use");

    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim(),
        email: email.toLowerCase(),
        phone,
      },
    });
    return actionResponse(user);
  } catch (error) {
    console.log(error);
    return actionError("Failed to update profile");
  }
};

export const changeAdminPassword = async (data: ChangePasswordFormData) => {
  try {
    const session = await auth();
    if (!session?.user?.id) return actionError("Unauthorized");

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { passwordHash: true },
    });
    if (!user) return actionError("User not found");

    const currentHash = hashToken(data.currentPassword);
    if (currentHash !== user.passwordHash) {
      return actionError("Current password is incorrect");
    }

    const newHash = hashToken(data.newPassword);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { passwordHash: newHash },
    });
    return actionResponse({ ok: true });
  } catch (error) {
    console.log(error);
    return actionError("Failed to change password");
  }
};
