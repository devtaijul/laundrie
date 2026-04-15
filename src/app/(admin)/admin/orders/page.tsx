import AdminOrders from "@/components/admin/AdminOrders";
import { OrderStatus } from "@/generated/prisma";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    search?: string;
    status?: OrderStatus | "ALL";
    page?: number;
  };
}) => {
  const { search, status, page = 1 } = await searchParams;

  return <AdminOrders search={search} status={status} page={page} />;
};

export default page;
