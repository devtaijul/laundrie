import { z } from "zod";
import { isValidNlPhone, normalizeNlPhone } from "@/lib/phone";

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
});

export const otpSchema = z.object({
  phone: phoneSchema.shape.phone,
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
