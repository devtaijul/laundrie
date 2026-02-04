import { getAllRider } from "@/actions/rider.actions";
import AdminDrivers from "@/components/admin/AdminDrivers";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: number; limit?: number }>;
}) => {
  const query = await searchParams;
  const { search = "", page = 1, limit = 10 } = query;
  getAllRider(search, page);
  return <AdminDrivers search={search} page={page} take={limit} />;
};

export default page;
