"use server";

import { Role } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { actionError, actionResponse } from "@/lib/server/utils";
import { DriverFormValues } from "@/types/global-type";
import { hashToken } from "./user.actions";
import { generateUniqueReferralCode } from "./refer.actions";
import { revalidatePath } from "next/cache";

export const createNewRider = async (data: DriverFormValues) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      vehicleNumber,
      vehicleType,
      location,
    } = data;

    // check if user already exist

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return actionError("User already exist");
    }

    // hash password

    const hashedPassword = await hashToken(password);

    // 3) referral codes generate
    const tenDollarCode = await generateUniqueReferralCode("10");
    const twentyDollarCode = await generateUniqueReferralCode("20");

    // create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: hashedPassword,
        role: Role.DRIVER,
        vehicleNumber,
        vehicleType,
        location,
        tenDollarCode,
        twentyDollarCode,
      },
    });

    revalidatePath("/admin/drivers");
    return actionResponse(user);
  } catch (error) {
    return actionError("Failed to create rider");
  }
};

export const getAllRider = async (
  search: string = "",
  page: number = 1,
  take: number = 10
) => {
  try {
    const skip = (page - 1) * take;

    const riders = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: take,
      skip: skip,
      where: {
        phone: {
          contains: search,
          mode: "insensitive",
        },
        role: Role.DRIVER,
      },
      omit: {
        passwordHash: true,
      },
    });

    return actionResponse(riders);
  } catch (error) {
    console.log("error", error);
    actionError("Failed to get riders");
  }
};
