"use server";

import crypto from "crypto";
import { Resend } from "resend";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { AccountFormValues } from "@/lib/zodSchema";
import { env } from "@/env/server";
import PasswordReset from "@/app/emails/PasswordReset";
import { normalizeNlPhone } from "@/lib/phone";

const resend = new Resend(env.RESEND_API_KEY);

export const me = async () => {
  const session = await auth();

  if (!session) {
    return actionError("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    omit: {
      passwordHash: true,
    },
  });

  return actionResponse(user);
};

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session) {
    return actionError("Unauthorized");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    omit: {
      passwordHash: true,
    },
  });
  return actionResponse(user);
};

export async function saveAccountDetails(
  values: AccountFormValues,
  userId: string,
) {
  const { firstName, lastName, ...rest } = values;

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...rest,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`.trim(),
    },
  });

  return actionResponse(user);
}

export const generateResetToken = async () => {
  const token = crypto.randomBytes(32).toString("base64url");
  const hash = crypto.createHash("sha256").update(token).digest("hex");

  return { token, hash };
};

export const addMinutes = async (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60 * 1000);
};

export async function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export const sendConfirmationEmail = async (email: string) => {
  // Check if user is registered or not
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return actionError("Email is not registered");
  }

  // Generate Reset Link and send email
  const { token, hash } = await generateResetToken();
  const expires = await addMinutes(new Date(), 15); // 15 মিনিট

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetTokenHash: hash,
      resetTokenExpires: expires,
    },
  });

  const resetLink = `${env.NEXT_PUBLIC_APP_URL}/reset-password?token=${encodeURIComponent(token)}&uid=${user.id}`;
  // TODO: sendEmail(user.email, 'Reset your password', resetLink)

  const { data, error } = await resend.emails.send({
    from: "Laundrie <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    react: PasswordReset({
      resetUrl: resetLink,
      userName: user.name,
      expiryTime: "15 minutes",
    }),
  });

  if (error) {
    return actionError(error.message);
  }

  return actionResponse({ ok: true, data });
};

export const validateResetToken = async (token: string, uid: string) => {
  const user = await prisma.user.findUnique({
    where: { id: uid },
  });

  if (!user) {
    return actionError("User not found");
  }

  const hash = await hashToken(token);

  if (user.resetTokenHash !== hash) {
    return actionError("Invalid token");
  }

  if (user.resetTokenExpires && user.resetTokenExpires < new Date()) {
    return actionError("Token expired");
  }

  return actionResponse({ ok: true });
};

export const changePassword = async (
  token: string,
  uid: string,
  password: string,
) => {
  const user = await prisma.user.findUnique({
    where: { id: uid },
  });

  if (!user) {
    return actionError("User not found");
  }

  const hash = await hashToken(token);

  if (user.resetTokenHash !== hash) {
    return actionError("Invalid token");
  }

  if (user.resetTokenExpires && user.resetTokenExpires < new Date()) {
    return actionError("Token expired");
  }

  await prisma.user.update({
    where: { id: uid },
    data: {
      passwordHash: await hashToken(password),
      resetTokenHash: null,
      resetTokenExpires: null,
    },
  });

  return actionResponse({ ok: true });
};

export const checkIfPhoneExists = async (phone: string) => {
  const normalizedPhone = normalizeNlPhone(phone);

  if (!normalizedPhone) {
    return actionError("Enter a valid Netherlands phone number");
  }

  const user = await prisma.user.findFirst({
    where: { phone: normalizedPhone },
  });
  if (user) {
    return actionResponse({ exists: true });
  } else {
    return actionError("User not found. Please register first.");
  }
};

export const checkIfEmailExists = async (email: string) => {
  const user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    return actionResponse({ exists: true });
  } else {
    return actionError("Email not registered. Please sign up first.");
  }
};

export const updateProfile = async (data: {
  useType: "PERSONAL" | "BUSINESS";
  isOver65: boolean;
  marketing: boolean;
  notifications: boolean;
}) => {
  const session = await auth();
  if (!session) return actionError("Unauthorized");

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data,
    omit: { passwordHash: true },
  });

  return actionResponse(user);
};
