import { $Enums, OrderStatus } from "../generated/prisma";

export type TypeOfUseTS = $Enums.TypeOfUse;
export type ThemeTS = $Enums.ThemePreference;
export type PickupSpotTS = $Enums.pickupSpotType;
export type OrderEventTypeTS = $Enums.OrderEventType;
export type OrderStatusTS = $Enums.OrderStatus;

/** All enum values as a typed array */
export const TYPE_OF_USE_VALUES: TypeOfUseTS[] = Object.values(
  $Enums.TypeOfUse
) as TypeOfUseTS[];

export const THEME_VALUES: ThemeTS[] = Object.values(
  $Enums.ThemePreference
) as ThemeTS[];

/** (Optional) Human-friendly label generator */
const humanize = (s: string) =>
  s
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (m) => m.toUpperCase());

/** For selects: [{ label, value }] */
export const TYPE_OF_USE_OPTIONS: { label: string; value: TypeOfUseTS }[] =
  TYPE_OF_USE_VALUES.map((v) => ({ value: v, label: humanize(v) }));

export const PICKUP_SPOT_OPTIONS: { label: string; value: PickupSpotTS }[] =
  Object.values($Enums.pickupSpotType).map((v) => ({
    value: v,
    label: humanize(v),
  }));

/** Safe parser (as you had) */
export function toTypeOfUse(
  v: string | undefined | null
): $Enums.TypeOfUse | undefined {
  if (!v) return undefined;
  return (Object.values($Enums.TypeOfUse) as string[]).includes(v)
    ? (v as $Enums.TypeOfUse)
    : undefined;
}

export const ORDER_STATUS_OPTIONS: { label: string; value: OrderStatus }[] =
  Object.values($Enums.OrderStatus).map((v) => ({
    value: v,
    label: humanize(v),
  }));
