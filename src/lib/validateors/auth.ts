import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\+?\d{8,15}$/, "Enter a valid phone number with country code"),
});

export const otpSchema = z.object({
  phone: phoneSchema.shape.phone,
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

export const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
