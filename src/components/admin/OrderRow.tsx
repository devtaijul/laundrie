import { OrderExtends } from "@/types/global-type";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreVerticalIcon } from "lucide-react";
import { formatDate, formatMoney, getOrderStatusBadge } from "@/lib/utils";
import { ViewOrderMore } from "./ViewOrderMore";

export const OrderRow = ({
  order,
  index,
}: {
  order: OrderExtends;
  index: number;
}) => {
  console.log("order", order);

  return (
    <tr
      key={order.id}
      className={`border-b border-border hover:bg-muted/50 ${index === 1 ? "bg-blue-50/50" : ""}`}
    >
      <td className="py-3 px-4">
        <Checkbox checked={index === 1} />
      </td>
      <td className="py-3 px-4 text-sm font-medium">{order.id}</td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.user.image}`}
            />
            <AvatarFallback>{order.user.firstName}</AvatarFallback>
          </Avatar>
          <span className="text-sm">{order.user.email}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">{formatDate(order.createdAt)}</td>
      {/*  <td className="py-3 px-4">
        <Badge
          variant={order.payment === "Paid" ? "default" : "secondary"}
          className={
            order.payment === "Paid"
              ? "bg-green-100 text-green-700 hover:bg-green-100"
              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
          }
        >
          {order.}
        </Badge>
      </td>
      <td className="py-3 px-4 text-sm">{order.items}</td>*/}

      <td className="py-3 px-4">
        {order?.payments?.length > 0 ? (
          <Badge
            variant={
              order.payments[0].status === "succeeded" ? "default" : "secondary"
            }
          >
            {order.payments[0].status}
          </Badge>
        ) : (
          <Badge variant={"secondary"}>UNPAID</Badge>
        )}
      </td>
      <td className="py-3 px-4 text-sm font-medium">
        {formatMoney(order.totalCents, true)}
      </td>
      <td className="py-3 px-4">
        <Badge
          variant={order.status === "DELIVERED" ? "default" : "secondary"}
          className={getOrderStatusBadge(order.status)}
        >
          {order.status}
        </Badge>
      </td>

      <td className="py-3 px-4">
        <ViewOrderMore order={order} />
      </td>
    </tr>
  );
};
