import z from "zod";
import { isValidNlPhone, normalizeNlPhone } from "@/lib/phone";

// ✅ Zod schema
export const signupSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character",
    ),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
  useType: z.enum(["PERSONAL", "BUSINESS"]),
  isOver65: z.enum(["yes", "no"], {
    error: "Please select an option",
  }),
  marketing: z.boolean(),
  notifications: z.boolean(),
});

export type SignupData = z.infer<typeof signupSchema>;

// ---------- ZOD SCHEMAS ----------
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
});
const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});
const emailLoginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// পুরো ফর্মে সব ভ্যালু রাখছি—স্টেপভিত্তিক validate করবো
export const loginSchema = z.object({
  phone: phoneSchema.shape.phone.optional(),
  otp: otpSchema.shape.otp.optional(),
  email: emailLoginSchema.shape.email.optional(),
  password: emailLoginSchema.shape.password.optional(),
});
export type LoginForm = z.infer<typeof loginSchema>;

// Account details schema

// ---- Zod schema ----
export const ThemeEnum = z.enum(["SYSTEM", "LIGHT", "DARK"]);

export const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "Too long"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
  email: z.string().email("Enter a valid email address"),
  theme: ThemeEnum,
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;

// Business schema

export const businessSchema = z.object({
  business_name: z.string().min(1, "Business name is required"),
  business_email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
  whatsapp_number: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => !value || isValidNlPhone(value), {
      message: "Enter a valid Netherlands WhatsApp number",
    })
    .transform((value) => (value ? normalizeNlPhone(value)! : "")),
  business_address: z.string().min(1, "Business address is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  zip_code: z.string().optional(),
  description: z.string().optional(),
  logo_url: z.string().optional(),
  favicon_url: z.string().optional(),
});

export type BusinessFormData = z.infer<typeof businessSchema>;

// schemas/payment-settings.schema.ts

export const paymentSettingSchema = z.object({
  cash_on_delivery: z.boolean(),
  credit_devit: z.boolean(),
  digital_wallet: z.boolean(),
  bank_transfer: z.boolean(),

  // keep them required – you can make them optional later if you want
  stripe_publishable_key: z
    .string()
    .min(1, "Stripe publishable key is required"),
  stripe_secret_key: z.string().min(1, "Stripe secret key is required"),
});

export type PaymentSettingFormData = z.infer<typeof paymentSettingSchema>;

// schemas/admin-notification.schema.ts

export const adminNotificationSchema = z.object({
  new_orders: z.boolean(),
  customer_reviews: z.boolean(),
  support_tickets: z.boolean(),

  // UI te achhe bole eta o nilam
  //low_stock_alerts: z.boolean(),
});

export type AdminNotificationFormData = z.infer<typeof adminNotificationSchema>;

// schemas/sms-configuration.schema.ts

export const smsConfigurationSchema = z.object({
  provider: z.string().min(1, "Provider is required"),
  api_key: z.string().min(1, "API Key is required"),
  auth_token: z.string().min(1, "Auth token is required"),
  from_number: z
    .string()
    .min(1, "From number is required")
    .refine(isValidNlPhone, "Enter a valid Netherlands phone number")
    .transform((value) => normalizeNlPhone(value)!),
});

export type SMSConfigurationFormData = z.infer<typeof smsConfigurationSchema>;

// schemas/customer-notification.schema.ts

export const customerNotificationSchema = z.object({
  order_confirmation_email: z.boolean(),
  driver_id_orders: z.boolean(),
  order_completed_email: z.boolean(),
  promotional_message: z.boolean(),
});

export type CustomerNotificationFormData = z.infer<
  typeof customerNotificationSchema
>;
