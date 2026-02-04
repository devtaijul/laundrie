import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { PAGES } from "@/config/pages.config";
import { OrderCard } from "./OrderCard";
import { getMyOrders } from "@/actions/order.actions";

export const MyOrders = async () => {
  const res = await getMyOrders();

  return (
    <div className="px-4 py-20 max-w-[500px] mx-auto">
      {res?.data?.length === 0 ? (
        <Card className="border-none shadow-none">
          <div className="p-8 text-center">
            {/* Laundry Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>

            <h2 className="mb-6 text-xl font-semibold text-primary">
              No Orders to Display
            </h2>

            <Link
              href={PAGES.LAUNDRIE}
              className="bg-primary px-8 py-3 text-primary-foreground hover:bg-primary/90"
            >
              Place an order
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-primary-foreground">
              Your Orders
            </h2>
            <Link
              href={PAGES.LAUNDRIE}
              className="bg-background text-primary hover:bg-background/90"
            >
              New Order
            </Link>
          </div>

          {res?.data?.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
