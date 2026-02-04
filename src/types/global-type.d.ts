import { IconName } from "@/config/icons.config";
import {
  Order,
  OrderEvent,
  Payment,
  PaymentSetting,
  Rider,
  Role,
  TypeOfUse,
  User,
} from "@/generated/prisma";
import { UserDTO } from "./user.type";

export type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: Role;
  useType: TypeOfUse;
  image: string | null;
};

export type ReferralOption = {
  icon: IconName;
  title: string;
  subtitle: string;
  iconColor: string;
  giftAmount: number;
};

export type LaundryCareField =
  | "detergent"
  | "delicateCycle"
  | "returnOnHangers"
  | "additionalRequests";
export type LaundryCareValue = string | boolean;

export type OrderExtends = Order & {
  payments: Payment[];
  events: OrderEvent[];
  user: User;
  rider: User;
};

export type UserExtends = Omit<User, "passwordHash"> & {
  rider: Rider;
};

// paymentSettings without stripe_secret_key
export type SafePaymentSetting = Omit<PaymentSetting, "stripe_secret_key">;

export type DriverFormValues = {
  name: string;
  phone: string;
  email: string;
  password: string;
  vehicleType: string;
  vehicleNumber: string;
  location: string;
};
