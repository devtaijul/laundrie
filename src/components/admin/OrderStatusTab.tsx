"use client";

import { ORDER_STATUS_OPTIONS } from "@/types/enums";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { useRouter } from "next/navigation";

export const OrderStatusTab = () => {
  const router = useRouter();
  const changeHandler = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("status", value);
    router.push(url.toString());
  };

  return (
    <div className="flex-1">
      <TabsList>
        {[{ label: "All", value: "ALL" }, ...ORDER_STATUS_OPTIONS].map(
          (option) => (
            <TabsTrigger
              key={option.value}
              value={option.value}
              onClick={() => changeHandler(option.value)}
            >
              {option.label}
            </TabsTrigger>
          )
        )}
      </TabsList>
    </div>
  );
};
