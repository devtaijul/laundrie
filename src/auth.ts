/* eslint-disable @typescript-eslint/no-explicit-any */
// src/auth.ts (বা যেখানেই NextAuth কনফিগ রেখেছ)
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { hashToken } from "./lib/helper/auth";
import { prisma } from "./lib/prisma";
import { SafeUser } from "./types/global-type";
import { $Enums } from "./generated/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text", required: true },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" }, // phone otp path
      },
      async authorize(creds) {
        const id = (creds?.identifier?.toString() ?? "").trim();
        const password = creds?.password?.toString();
        const otp = creds?.otp?.toString();

        // OTP path
        if (!password && otp && /^\+?\d{8,15}$/.test(id)) {
          const user = await prisma.user.findFirst({
            where: { phone: id },
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              role: true,
              useType: true,
              image: true,
              passwordHash: true,
            },
          });
          return user ?? null;
        }

        // Email + Password path
        const isEmail = id.includes("@");
        const user = await prisma.user.findFirst({
          where: isEmail ? { email: id.toLowerCase() } : { phone: id },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            useType: true,
            image: true,
            passwordHash: true,
          },
        });
        if (!user || !user.passwordHash || !password) return null;

        const ok = (await hashToken(password)) === user.passwordHash;
        if (!ok) return null;

        // আপনি যা session এ চান কেবল ওই ফিল্ডই ফেরত দিন
        const { ...safeUser } = user;
        return safeUser as SafeUser;
      },
    }),
  ],

  callbacks: {
    /** JWT টোকেনে কাস্টম ফিল্ড পুশ করি */
    async jwt({ token, user, trigger, session }) {
      // প্রথম লগইনে `user` থাকবে—সেখান থেকে টোকেনে কপি করি
      if (user) {
        token.userId = (user as SafeUser).id;
        token.name = (user as SafeUser).name ?? null;
        token.phone = (user as SafeUser).phone ?? null;
        token.role = (user as SafeUser).role as $Enums.Role;
        token.useType = (user as SafeUser).useType as $Enums.TypeOfUse;
      }

      // যদি client থেকে session update trigger পাঠান, চাইলে আপডেট ম্যাপ করতে পারেন
      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name ?? null;
        token.phone = (session.user as SafeUser).phone ?? token.phone ?? null;
        token.role = (session.user as SafeUser).role as $Enums.Role;
        token.useType = (session.user as SafeUser).useType as $Enums.TypeOfUse;
      }

      return token;
    },

    /** টোকেন থেকে session.user-এ ফিল্ড বসাই */
    async session({ session, token }) {
      session.user = {
        id: token.userId as string,
        name: (token.name as string | null) ?? null,
        email: session.user?.email ?? null, // NextAuth default থেকে
        phone: (token.phone as string | null) ?? null,
        role: token.role as $Enums.Role,
        useType: token.useType as $Enums.TypeOfUse,
        image: session.user?.image ?? null,
      } as any;

      return session;
    },
  },
});
