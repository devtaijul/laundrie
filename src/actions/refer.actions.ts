"use server";

import { prisma } from "@/lib/prisma";
import {
  actionError,
  actionResponse,
  generateRandomPart,
} from "@/lib/server/utils";
import { getCurrentUser } from "./user.actions";

// prefix: "10" or "20"
export async function generateUniqueReferralCode(prefix: "10" | "20") {
  while (true) {
    const randomPart = generateRandomPart();
    const code = `${prefix}-${randomPart}`; // উদাহরণ: "10-AB12CD34"

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ tenDollarCode: code }, { twentyDollarCode: code }],
      },
      select: { id: true },
    });

    if (!existing) {
      return code;
    }

    // যদি মিলে যায়, আবার লুপ ঘুরবে
  }
}

export async function getReferralInfo(code: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ tenDollarCode: code }, { twentyDollarCode: code }],
    },
    select: {
      id: true,
      tenDollarCode: true,
      twentyDollarCode: true,
    },
  });

  if (!user) return null;

  const amount = user.tenDollarCode === code ? 10 : 20;

  return {
    userId: user.id,
    amount, // 10 বা 20
  };
}

export async function getReferralCode(amount: number) {
  try {
    const user = await getCurrentUser();

    if (!user) return actionError("Unauthorized");

    if (amount === 10) {
      return actionResponse({
        code: user.data?.tenDollarCode,
      });
    } else if (amount === 20) {
      return actionResponse({
        code: user.data?.twentyDollarCode,
      });
    } else {
      return actionError("Invalid amount");
    }
  } catch (error) {
    console.log(error);

    return actionError("Failed to get referral info");
  }
}

export async function validateReferralCode(code: string) {
  const referralInfo = await getReferralInfo(code);
  if (!referralInfo) {
    return actionError("Invalid code");
  }
  return actionResponse(referralInfo);
}
