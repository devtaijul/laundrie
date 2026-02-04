// types/user.ts
import type { $Enums } from "../../generated/prisma";

/** Theme enum (DB stores uppercased enum) */
export type Theme = $Enums.ThemePreference;

/** Raw user as returned by Prisma (dates are Date, nullable fields explicit) */
export interface UserRecord {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  marketing: boolean;
  notifications: boolean;
  role: $Enums.Role; // e.g. "USER" | "ADMIN" | ...
  useType: $Enums.TypeOfUse; // e.g. "PERSONAL" | "BUSINESS" | ...
  isOver65: boolean;
  emailVerified: Date | null;
  phoneVerifiedAt: Date | null;
  image: string | null;
  theme: Theme; // "SYSTEM" | "LIGHT" | "DARK"
  passwordHash: string | null; // present server-side only
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/** API/DTO shape if you serialize to JSON (dates -> ISO string) */
export interface UserDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  email: string | null;
  marketing: boolean;
  notifications: boolean;
  role: $Enums.Role;
  useType: $Enums.TypeOfUse;
  isOver65: boolean;
  emailVerified: string | null; // ISO string or null
  phoneVerifiedAt: string | null; // ISO string or null
  image: string | null;
  theme: Theme;
  deletedAt: string | null; // ISO string or null
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  // never include passwordHash in public DTO
}

/** Session-safe user (what you keep on session.user) */
export interface SessionUser {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone: string | null;
  role: $Enums.Role;
  useType: $Enums.TypeOfUse;
  image: string | null;
  theme: Theme;
}

/** Client form values (your accounts form) */
export type AccountFormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  theme: Lowercase<Theme>; // "system" | "light" | "dark"
};

/* ---------------------- Helpers ---------------------- */

/** Map Prisma record -> SessionUser (omit sensitive fields) */
export function toSessionUser(u: UserRecord): SessionUser {
  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    email: u.email,
    phone: u.phone,
    role: u.role,
    useType: u.useType,
    image: u.image,
    theme: u.theme,
  };
}

/** Map Prisma record -> public DTO (stringify dates) */
export function toUserDTO(u: UserRecord): UserDTO {
  const toStr = (d: Date | null) => (d ? d.toISOString() : null);
  return {
    id: u.id,
    firstName: u.firstName,
    lastName: u.lastName,
    phone: u.phone,
    email: u.email,
    marketing: u.marketing,
    notifications: u.notifications,
    role: u.role,
    useType: u.useType,
    isOver65: u.isOver65,
    emailVerified: toStr(u.emailVerified),
    phoneVerifiedAt: toStr(u.phoneVerifiedAt),
    image: u.image,
    theme: u.theme,
    deletedAt: toStr(u.deletedAt),
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt.toISOString(),
  };
}

/** Map SessionUser -> form defaults (lowercase theme for UI) */
export function sessionUserToFormDefaults(
  su: SessionUser | null | undefined
): Partial<AccountFormValues> | undefined {
  if (!su) return undefined;
  return {
    firstName: su.firstName ?? "",
    lastName: su.lastName ?? "",
    phone: su.phone ?? "",
    email: su.email ?? "",
    theme: (su.theme?.toLowerCase() as Lowercase<Theme>) ?? "system",
  };
}
