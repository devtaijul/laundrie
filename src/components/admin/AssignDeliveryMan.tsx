"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "../ui/card";
import { Search, Loader2, Check, UserCheck } from "lucide-react";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { User } from "@/generated/prisma";
import { assignDriverToOrder } from "@/actions/admin.order.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  orderId: string;
  drivers: Omit<User, "passwordHash">[];
  currentDriverId: string | null;
}

export const AssignDeliveryMan = ({ orderId, drivers, currentDriverId }: Props) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(currentDriverId);
  const [loading, setLoading] = useState(false);

  const filtered = useMemo(
    () =>
      drivers.filter((d) => {
        const q = search.toLowerCase();
        return (
          d.name?.toLowerCase().includes(q) ||
          d.phone?.includes(q) ||
          d.email?.toLowerCase().includes(q)
        );
      }),
    [drivers, search],
  );

  async function handleSave() {
    if (!selectedId) {
      toast.error("Please select a driver first");
      return;
    }
    setLoading(true);
    const res = await assignDriverToOrder(orderId, selectedId);
    if (res.success) {
      toast.success("Driver assigned successfully");
    } else {
      toast.error(res.error ?? "Failed to assign driver");
    }
    setLoading(false);
  }

  const isChanged = selectedId !== currentDriverId;

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Assign Driver
          </h3>
        </div>

        {/* Currently assigned */}
        {currentDriverId && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-green-700">
              Driver currently assigned
            </span>
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or phone"
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Driver list */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              No drivers found
            </p>
          )}
          {filtered.map((driver) => {
            const isSelected = selectedId === driver.id;
            const isCurrent = currentDriverId === driver.id;
            const initials = (driver.name ?? "D")
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={driver.id}
                onClick={() => setSelectedId(driver.id)}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={driver.image ?? undefined} />
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {driver.name ?? "Unknown"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {driver.phone ?? driver.email ?? "—"}
                    </p>
                    {driver.vehicleType && (
                      <p className="text-xs text-muted-foreground">
                        {driver.vehicleType}
                        {driver.vehicleNumber ? ` · ${driver.vehicleNumber}` : ""}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isCurrent && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                      Current
                    </Badge>
                  )}
                  {isSelected && !isCurrent && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button
          className="w-full mt-4 bg-primary hover:bg-primary/90"
          size="lg"
          onClick={handleSave}
          disabled={loading || !isChanged || !selectedId}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : null}
          {isChanged ? "Save Assignment" : "No Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
