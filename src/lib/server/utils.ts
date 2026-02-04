import { encodeBase32UpperCaseNoPadding } from "@oslojs/encoding";
import { z } from "zod";
import crypto from "crypto";

export function generateRandomOTP(): string {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
}

export function generateRandomRecoveryCode(): string {
  const recoveryCodeBytes = new Uint8Array(10);
  crypto.getRandomValues(recoveryCodeBytes);
  const recoveryCode = encodeBase32UpperCaseNoPadding(recoveryCodeBytes);
  return recoveryCode;
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

export type ActionMeta = {
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
};

export type ActionErrorOrSuccess<T> = {
  success: boolean;
  message: string;
  data: T | null;
  meta?: ActionMeta | null;
  addition?: T | null;
};

export type ActionResponse<T> = Promise<ActionErrorOrSuccess<T | null>>;

export function actionResponse<T>(
  data: T,
  meta?: ActionMeta,
  addition?: T
): ActionErrorOrSuccess<T> {
  return {
    success: true,
    message: "Success",
    data,
    meta,
    addition,
  };
}

export function actionError(
  message: string,
  error?: unknown
): ActionErrorOrSuccess<null> {
  let errorMessage = message;
  if (error && error instanceof z.ZodError) {
    errorMessage = Object.entries(error.flatten().fieldErrors)
      .map(
        ([key, value]) =>
          `${key}: ${Array.isArray(value) ? value.join(", ") : ""}`
      )
      .join("\n");
  }
  return {
    success: false,
    message: errorMessage,
    data: null,
    meta: null,
  };
}

// utils/referral.ts

export function generateRandomPart(length = 8) {
  return Math.random()
    .toString(36)
    .slice(2, 2 + length)
    .toUpperCase();
}

export function generateOrderId() {
  const random = crypto.randomBytes(3).toString("hex").toUpperCase();
  return `ORD-${random}`;
}
