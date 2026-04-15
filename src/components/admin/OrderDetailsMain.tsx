import {
  MapPin,
  Phone,
  Mail,
  User as UserIcon,
  Package,
  Thermometer,
  Wind,
  Shirt,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { AssignDeliveryMan } from "./AssignDeliveryMan";
import { OrderExtends } from "@/types/global-type";
import { formatMoney, formatDate } from "@/lib/utils";
import { OrderStatusManager } from "./OrderStatusManager";
import { OrderEventType, User } from "@/generated/prisma";

const DETERGENT_LABELS: Record<string, string> = {
  none: "No detergent",
  classic: "Classic detergent",
  "classic-softener": "Classic + softener",
};

const FOLDING_LABELS: Record<string, string> = {
  fold: "Fold",
  "no-fold": "Do not fold",
  hangers: "Everything on hangers",
};

function EventDot({ done }: { done: boolean }) {
  return (
    <div
      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${
        done ? "bg-green-100" : "bg-muted"
      }`}
    >
      <div
        className={`h-2.5 w-2.5 rounded-full ${done ? "bg-green-500" : "bg-muted-foreground/40"}`}
      />
    </div>
  );
}

interface Props {
  order: OrderExtends | null;
  drivers: Omit<User, "passwordHash">[];
}

export const OrderDetailsMain = ({ order, drivers }: Props) => {
  if (!order) {
    return (
      <p className="text-sm text-muted-foreground">Order data unavailable.</p>
    );
  }

  const totalOversized =
    (order.oversizedItems ?? 0) +
    (order.pillowItems ?? 0) +
    (order.duvetItems ?? 0);

  // Derive cleaning event flags from the order's event log
  const cleaningStarted = order.events.some(
    (e) => e.type === OrderEventType.CLEANING_STARTED,
  );
  const cleaningDone = order.events.some(
    (e) => e.type === OrderEventType.CLEANING_DONE,
  );

  const customer = order.user;
  const driver = order.rider;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* ── LEFT / MAIN COLUMN ─────────────────────────────────────── */}
      <div className="lg:col-span-2 space-y-4">
        {/* Order Details Card */}
        <Card>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <h2 className="text-lg font-semibold">Order Details</h2>

            {/* Pickup address */}
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-cyan-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Pickup & Delivery Address
                </p>
                <p className="text-sm font-medium mt-0.5">
                  {order.pickupAddress ?? "Not specified"}
                </p>
                {order.pickupSpot && (
                  <p className="text-xs text-muted-foreground">
                    {order.pickupSpot}
                    {order.pickupInstructions
                      ? ` · ${order.pickupInstructions}`
                      : ""}
                  </p>
                )}
              </div>
            </div>

            {/* Bags / machines summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">
                  {order.machineCount ?? 1}
                </p>
                <p className="text-xs text-muted-foreground">Machine{(order.machineCount ?? 1) > 1 ? "s" : ""}</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">
                  {totalOversized}
                </p>
                <p className="text-xs text-muted-foreground">Oversized</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">
                  {order.ironPieces ?? 0}
                </p>
                <p className="text-xs text-muted-foreground">Iron pieces</p>
              </div>
              <div className="rounded-lg bg-muted/50 p-3 text-center">
                <p className="text-lg font-bold text-foreground">
                  {order.deliverySpeed === "express" ? "Express" : "Standard"}
                </p>
                <p className="text-xs text-muted-foreground">Delivery</p>
              </div>
            </div>

            {/* Laundry care */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-semibold mb-3">Laundry Care</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Wind className="h-4 w-4 shrink-0" />
                  {DETERGENT_LABELS[order.detergent ?? ""] ?? order.detergent ?? "—"}
                </li>
                {order.washingTemp && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Thermometer className="h-4 w-4 shrink-0" />
                    {order.washingTemp}°C wash temperature
                  </li>
                )}
                {order.foldingOption && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Shirt className="h-4 w-4 shrink-0" />
                    {FOLDING_LABELS[order.foldingOption] ?? order.foldingOption}
                  </li>
                )}
                {order.delicateCycle && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4 shrink-0" />
                    Delicate cycle
                  </li>
                )}
                {(order.ironPieces ?? 0) > 0 && (
                  <li className="flex items-center gap-2 text-muted-foreground">
                    <Shirt className="h-4 w-4 shrink-0" />
                    Ironing: {order.ironPieces} piece{(order.ironPieces ?? 0) > 1 ? "s" : ""}
                  </li>
                )}
              </ul>
              {order.additionalRequests && (
                <div className="mt-3 p-3 rounded-lg bg-muted/50 flex items-start gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    {order.additionalRequests}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-lg font-semibold mb-4">Customer</h2>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={customer?.image ?? undefined} />
                <AvatarFallback>
                  {(customer?.name ?? "C").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{customer?.name ?? "Unknown"}</p>
                {customer?.email && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {customer.email}
                  </p>
                )}
                {customer?.phone && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {customer.phone}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assigned Driver Info */}
        {driver && (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Assigned Driver</h2>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={driver.image ?? undefined} />
                  <AvatarFallback>
                    {(driver.name ?? "D").charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{driver.name ?? "Unknown"}</p>
                  {driver.phone && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {driver.phone}
                    </p>
                  )}
                  {driver.vehicleType && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <UserIcon className="h-3.5 w-3.5" />
                      {driver.vehicleType}
                      {driver.vehicleNumber ? ` · ${driver.vehicleNumber}` : ""}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Event Timeline */}
        {order.events.length > 0 && (
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
              <div className="relative space-y-4">
                <div className="absolute left-4 top-4 bottom-4 w-px bg-border" />
                {[...order.events]
                  .sort(
                    (a, b) =>
                      new Date(a.createdAt).getTime() -
                      new Date(b.createdAt).getTime(),
                  )
                  .map((event) => (
                    <div key={event.id} className="flex items-start gap-3">
                      <EventDot done={true} />
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        {event.note && (
                          <p className="text-xs text-muted-foreground">
                            {event.note}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDate(event.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── RIGHT SIDEBAR ────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Status Manager */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Order Status</h3>
            <OrderStatusManager
              orderId={order.id}
              currentStatus={order.status}
              hasDriver={!!order.riderId}
              cleaningStarted={cleaningStarted}
              cleaningDone={cleaningDone}
            />
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Machines ({order.machineCount ?? 1})
                </span>
                <span className="font-medium">
                  {formatMoney(order.machinesCost)}
                </span>
              </div>
              {order.oversizedCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Oversized ({totalOversized})
                  </span>
                  <span className="font-medium">
                    {formatMoney(order.oversizedCost)}
                  </span>
                </div>
              )}
              {order.softenerCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Softener</span>
                  <span className="font-medium">
                    {formatMoney(order.softenerCost)}
                  </span>
                </div>
              )}
              {order.hangersCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hangers</span>
                  <span className="font-medium">
                    {formatMoney(order.hangersCost)}
                  </span>
                </div>
              )}
              {order.ironCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Ironing ({order.ironPieces} pcs)
                  </span>
                  <span className="font-medium">{formatMoney(order.ironCost)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery fee</span>
                <span className="font-medium">
                  {formatMoney(order.deliveryFee)}
                </span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatMoney(order.subtotal)}</span>
              </div>
              {order.coverageCost > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {order.coverageType ?? "Coverage"}
                  </span>
                  <span className="font-medium">
                    {formatMoney(order.coverageCost)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">VAT (21%)</span>
                <span className="font-medium">{formatMoney(order.tax)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between text-base">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">
                  {formatMoney(order.totalCents, true)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assign Driver */}
        <AssignDeliveryMan
          orderId={order.id}
          drivers={drivers}
          currentDriverId={order.riderId}
        />
      </div>
    </div>
  );
};
