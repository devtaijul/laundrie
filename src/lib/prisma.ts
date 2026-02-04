// src/lib/prisma.ts

import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../generated/prisma";

type PrismaWithAccel = ReturnType<typeof makePrisma>;

const globalForPrisma = global as unknown as { prisma?: PrismaWithAccel };

function makePrisma() {
  // If you need to override the URL per env:
  // const url = process.env.DATABASE_URL!;
  const client = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    // datasources: { db: { url } }, // optional
  }).$extends(withAccelerate());

  return client;
}

export const prisma = globalForPrisma.prisma ?? makePrisma();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
