import { getOrderByOrderId } from "@/actions/order.actions";
import AdminOrderDetail from "@/components/admin/AdminOrderDetail";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  getOrderByOrderId(id);
  return (
    <div>
      <AdminOrderDetail id={id} />
    </div>
  );
};

export default page;
