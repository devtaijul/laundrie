import { OrderProvider } from "@/contexts/OrderContext";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <OrderProvider>{children}</OrderProvider>;
};

export default layout;
