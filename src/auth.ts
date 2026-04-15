/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { hashToken } from "./lib/helper/auth";
import { prisma } from "./lib/prisma";
import { SafeUser } from "./types/global-type";
import { $Enums } from "./generated/prisma";
import { generateUniqueReferralCode } from "./actions/refer.actions";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(creds) {
        const id = (creds?.identifier?.toString() ?? "").trim();
        const password = creds?.password?.toString();

        if (!id || !password) return null;

        // Determine if email or phone
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

        if (!user || !user.passwordHash) return null;

        const ok = hashToken(password) === user.passwordHash;
        if (!ok) return null;

        const { ...safeUser } = user;
        return safeUser as SafeUser;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existing = await prisma.user.findFirst({
            where: { email: user.email! },
          });
          if (!existing) {
            const tenDollarCode = await generateUniqueReferralCode("10");
            const twentyDollarCode = await generateUniqueReferralCode("20");
            await prisma.user.create({
              data: {
                name: user.name ?? "",
                email: user.email!,
                image: user.image,
                emailVerified: new Date(),
                tenDollarCode,
                twentyDollarCode,
              },
            });
          }
          return true;
        } catch {
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // Credentials sign-in: user is SafeUser from authorize()
      if (user && account?.provider === "credentials") {
        token.userId = (user as SafeUser).id;
        token.name = (user as SafeUser).name ?? null;
        token.phone = (user as SafeUser).phone ?? null;
        token.role = (user as SafeUser).role as $Enums.Role;
        token.useType = (user as SafeUser).useType as $Enums.TypeOfUse;
      }

      // Google sign-in: fetch DB user to get role/useType/phone
      if (account?.provider === "google" && token.email) {
        const dbUser = await prisma.user.findFirst({
          where: { email: token.email as string },
          select: {
            id: true,
            name: true,
            phone: true,
            role: true,
            useType: true,
          },
        });
        if (dbUser) {
          token.userId = dbUser.id;
          token.name = dbUser.name ?? null;
          token.phone = dbUser.phone ?? null;
          token.role = dbUser.role as $Enums.Role;
          token.useType = dbUser.useType as $Enums.TypeOfUse;
        }
      }

      if (trigger === "update" && session?.user) {
        token.name = session.user.name ?? token.name ?? null;
        token.phone = (session.user as SafeUser).phone ?? token.phone ?? null;
        token.role = (session.user as SafeUser).role as $Enums.Role;
        token.useType = (session.user as SafeUser).useType as $Enums.TypeOfUse;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.userId as string,
        name: (token.name as string | null) ?? null,
        email: session.user?.email ?? null,
        phone: (token.phone as string | null) ?? null,
        role: token.role as $Enums.Role,
        useType: token.useType as $Enums.TypeOfUse,
        image: session.user?.image ?? null,
      } as any;

      return session;
    },
  },
});
