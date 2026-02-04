// src/types/next-auth.d.ts
import type { DefaultSession } from "next-auth";
import type { $Enums } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string | null;
      phone: string | null;
      role: $Enums.Role;
      useType: $Enums.TypeOfUse;
      image: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    name: string | null;
    phone: string | null;
    role: $Enums.Role;
    useType: $Enums.TypeOfUse;
  }
}
