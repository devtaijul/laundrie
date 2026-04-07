"use server";

import { signIn, signOut } from "@/auth"; // <- from your NextAuth v5 config export
import { env } from "@/env/server";
import { hashToken } from "@/lib/helper/auth";
import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import {
  emailLoginSchema,
  otpSchema,
  phoneSchema,
} from "@/lib/validateors/auth";
import { ConfirmEmail } from "./../app/emails/ConfirmEmail";
import { SignupData } from "@/lib/zodSchema";
import { consola } from "consola";
import { addMinutes, isBefore } from "date-fns";
import { redirect } from "next/navigation";
import { Resend } from "resend";
import { generateUniqueReferralCode } from "./refer.actions";
import { $Enums } from "@/generated/prisma";
import { PAGES } from "@/config/pages.config";

const resend = new Resend(env.RESEND_API_KEY);

// 1) Request OTP (SMS পাঠানো ছাড়া; এখানে কেবল টোকেন জেনারেট ও DB-তে রাখছি)
export async function requestOtpAction(formData: FormData) {
  const parsed = phoneSchema.safeParse({ phone: formData.get("phone") });
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.flatten().fieldErrors.phone?.[0] ?? "Invalid phone",
    };
  }
  const { phone } = parsed.data;

  // 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  // hash & save in NextAuth VerificationToken table
  const identifier = phone; // we use raw phone as identifier

  // expire time (5–10min)
  const expires = addMinutes(new Date(), 10);

  const tokenHash = hashToken(code);

  // clean previous tokens for this identifier (optional)
  await prisma.verificationToken.deleteMany({
    where: { identifier },
  });

  await prisma.verificationToken.create({
    data: {
      identifier,
      token: tokenHash,
      expires,
    },
  });

  // TODO: এখানে SMS প্রোভাইডার (Twilio/MessageBird) দিয়ে `code` পাঠাও
  consola.box(`OTP for ${phone}: ${code}`);

  return { ok: true };
}

// 2) Verify OTP + Sign In (NextAuth credentials provider এর “otp” ব্রাঞ্চ ব্যবহার করবে)
export async function verifyOtpAndLoginAction(formData: FormData) {
  const parsed = otpSchema.safeParse({
    phone: formData.get("phone"),
    code: formData.get("otp"),
  });
  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors;
    return {
      ok: false,
      error: fe.code?.[0] || fe.phone?.[0] || "Invalid code",
    };
  }
  const { phone, code } = parsed.data;

  const tokenHash = hashToken(code);
  const vt = await prisma.verificationToken.findFirst({
    where: { identifier: phone, token: tokenHash },
  });
  if (!vt) return { ok: false, error: "Code is incorrect" };
  if (isBefore(vt.expires, new Date())) {
    return { ok: false, error: "Code expired" };
  }

  // optional: auto-create user by phone if not exist
  const user = await prisma.user.findFirst({ where: { phone } });
  if (!user) {
    return actionError("User not found. Please register first.");
  }

  // consume token
  await prisma.verificationToken.delete({
    where: { identifier_token: { identifier: vt.identifier, token: vt.token } },
  });

  // NextAuth signIn via credentials "otp" branch
  // আপনি credentials provider এর authorize()-এ phone+otp check করবেন না; এখানে already verified
  // তাই authorize() এ phone exist হলে user রিটার্ন করার "otp" path রাখুন
  await signIn("credentials", {
    // identifier ফিল্ডে phone পাঠাচ্ছি
    identifier: phone,
    otp: code, // authorize() এ otp path match করার টোকেন
    redirect: false,
  });

  redirect("/dashboard");
}

// 3) Email or Phone + Password login
export async function loginWithCredentialsAction(formData: FormData) {
  const identifier = (formData.get("identifier")?.toString() ?? "").trim();
  const password = formData.get("password")?.toString() ?? "";

  if (!identifier || !password) {
    return { ok: false, error: "Email/phone and password are required" };
  }

  const isEmail = identifier.includes("@");
  const user = await prisma.user.findFirst({
    where: isEmail
      ? { email: identifier.toLowerCase() }
      : { phone: identifier },
  });

  if (!user || !user.passwordHash) {
    return {
      ok: false,
      error: isEmail
        ? "No account found with this email"
        : "No account found with this phone number",
    };
  }

  const ok = hashToken(password) === user.passwordHash;
  if (!ok) return { ok: false, error: "Incorrect password" };

  await signIn("credentials", {
    identifier,
    password,
    redirect: false,
  });

  if (user.role === $Enums.Role.ADMIN) {
    redirect(PAGES.ADMIN.ROOT);
  } else if (user.role === $Enums.Role.DRIVER) {
    redirect(PAGES.DRIVER.ROOT);
  } else {
    redirect(PAGES.ORDERS);
  }
}

// Keep for backwards compatibility
export async function loginWithEmailAction(formData: FormData) {
  const email = formData.get("email")?.toString() ?? "";
  formData.set("identifier", email);
  return loginWithCredentialsAction(formData);
}

export async function logoutAction() {
  await signOut({ redirect: false });
  redirect("/");
}

export async function registerUserAction({
  firstName,
  lastName,
  email,
  password,
  marketing,
  notifications,
  phone,
  useType,
  isOver65,
}: SignupData) {
  try {
    const lower = email.toLowerCase();

    // 1) uniqueness
    const existingUser = await prisma.user.findFirst({
      where: { email: lower },
      select: { id: true },
    });
    if (existingUser) {
      return actionError("Email already in use");
    }

    // 1.1) uniqueness

    const existingUserPhone = await prisma.user.findFirst({
      where: { phone },
      select: { id: true },
    });
    if (existingUserPhone) {
      return actionError("Phone already in use");
    }

    // 2) hash
    const passwordHash = hashToken(password);

    // 3) referral codes generate
    const tenDollarCode = await generateUniqueReferralCode("10");
    const twentyDollarCode = await generateUniqueReferralCode("20");

    // 4) create
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email: lower,
        passwordHash,
        phone,
        marketing,
        notifications,
        useType,
        isOver65: isOver65 === "yes" ? true : false,
        tenDollarCode,
        twentyDollarCode,
      },
    });

    // 5) make Sign in

    await signIn("credentials", {
      identifier: email,
      password,
      redirect: false,
    });

    // 6) success
    return actionResponse(user);
  } catch (error) {
    console.log("errors", error);

    return actionError("Something went wrong");
  }
}

export async function resendVerificationEmailAction(email: string) {
  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return actionError("No account found with this email");
  }

  const emailVarificationToken = hashToken(`${email}-${user.id}`);

  const expires = addMinutes(new Date(), 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVarificationToken,
      emailVarificationTokenExpires: expires,
    },
  });

  const emailVerificationLink = `${env.NEXT_PUBLIC_APP_URL}/verify-email?token=${emailVarificationToken}&email=${email}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Verify your email address",
    react: ConfirmEmail({
      confirmationUrl: emailVerificationLink,
      userName: user.name,
    }),
  });

  if (error) {
    return actionError(error.message);
  }

  return actionResponse({
    ok: true,
    data,
  });
}

export const verifyEmailService = async (token: string, email: string) => {
  if (!token || !email) {
    return actionError("Need email and token");
  }

  const user = await prisma.user.findFirst({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    return actionError("No account found with this email");
  }

  // Check if already verified
  if (user.emailVarificationToken === null) {
    return actionError("Email already verified");
  }

  const emailVarificationToken = hashToken(`${email}-${user.id}`);

  if (token !== emailVarificationToken) {
    return actionError("Invalid token");
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVarificationToken: null,
      emailVarificationTokenExpires: null,
      emailVerified: new Date(),
    },
  });

  return actionResponse({
    ok: true,
    data: {
      emailVarificationToken: null,
      verified: true,
    },
  });
};
