"use client";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOrder } from "@/contexts/OrderContext";
import type { ValidateAddressResult } from "@/app/api/validate-address/route";
import { SERVICE_AREA_ERROR } from "@/lib/service-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type AddressForm = {
  line1: string;
  line2: string;
  city: string;
  zip: string;
  state: string;
};

export function summarizeAddress(a: AddressForm) {
  const parts = [
    a.line1.trim(),
    a.city.trim(),
    [a.state.trim(), a.zip.trim()].filter(Boolean).join(" "),
  ].filter(Boolean);
  return parts.join(", ");
}

export const AddressSelectDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { state, dispatch } = useOrder();

  const saved = state.data.savedAddress;
  const hasAddress = Boolean(saved && saved.line1);

  const [addr, setAddr] = useState<AddressForm>({
    line1: saved?.line1 ?? "",
    line2: saved?.line2 ?? "",
    city: saved?.city ?? "",
    zip: saved?.zip ?? "",
    state: saved?.state ?? "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serviceAreaError, setServiceAreaError] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleSaveAddress = async () => {
    // Basic required validation
    const newErrors: Record<string, string> = {};
    if (!addr.line1) newErrors.line1 = "Address is required";
    if (!addr.city) newErrors.city = "City is required";
    if (!addr.zip) newErrors.zip = "Zip code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setServiceAreaError("");
    setIsValidating(true);

    try {
      const res = await fetch("/api/validate-address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line1: addr.line1,
          city: addr.city,
          zip: addr.zip,
        }),
      });

      const result: ValidateAddressResult = await res.json();

      if (!result.ok) {
        setServiceAreaError("Address lookup failed. Please try again.");
        return;
      }

      if (!result.valid) {
        if (result.reason === "address_not_found") {
          setServiceAreaError("Please enter a valid address in the Netherlands");
        } else if (result.reason === "outside_service_area") {
          setServiceAreaError(SERVICE_AREA_ERROR);
        } else {
          setServiceAreaError("Address could not be validated. Please try again.");
        }
        return;
      }

      // Address is valid — save with validation metadata
      dispatch({
        type: "UPDATE_DATA",
        field: "savedAddress",
        value: {
          line1: result.address?.line1 || addr.line1,
          line2: addr.line2 || undefined,
          city: result.city || addr.city,
          zip: result.address?.postalCode || addr.zip,
          state: addr.state,
          isValidated: true,
          isServiceAreaAllowed: true,
          municipality: result.municipality,
          country: result.address?.country ?? "Netherlands",
        },
      });

      dispatch({
        type: "UPDATE_DATA",
        field: "pickupAddress",
        value: summarizeAddress({
          ...addr,
          city: result.city || addr.city,
          zip: result.address?.postalCode || addr.zip,
        }),
      });

      setOpen(false);
    } catch {
      setServiceAreaError("Something went wrong. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {hasAddress ? "Edit Address" : "Add Address"}
          </DialogTitle>
          <DialogDescription>
            We serve Haarlem, Heemstede, Zandvoort, and Bloemendaal.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Address</label>
            <Input
              className={errors.line1 ? "border-red-500" : ""}
              value={addr.line1}
              onChange={(e) => {
                setErrors((p) => ({ ...p, line1: e.target.value ? "" : "Address is required" }));
                setAddr((p) => ({ ...p, line1: e.target.value }));
                setServiceAreaError("");
              }}
              placeholder="Grote Markt 1"
            />
            {errors.line1 && <p className="text-xs text-red-500 mt-1">{errors.line1}</p>}
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Apartment/suite</label>
            <Input
              value={addr.line2}
              onChange={(e) => setAddr((p) => ({ ...p, line2: e.target.value }))}
              placeholder="Apt / Suite (optional)"
            />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">City</label>
            <Input
              className={errors.city ? "border-red-500" : ""}
              value={addr.city}
              onChange={(e) => {
                setErrors((p) => ({ ...p, city: e.target.value ? "" : "City is required" }));
                setAddr((p) => ({ ...p, city: e.target.value }));
                setServiceAreaError("");
              }}
              placeholder="Haarlem"
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">Postal Code</label>
              <Input
                className={errors.zip ? "border-red-500" : ""}
                value={addr.zip}
                onChange={(e) => {
                  setErrors((p) => ({ ...p, zip: e.target.value ? "" : "Postal code is required" }));
                  setAddr((p) => ({ ...p, zip: e.target.value }));
                  setServiceAreaError("");
                }}
                placeholder="2011 AA"
              />
              {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Province (optional)</label>
              <Input
                value={addr.state}
                onChange={(e) => setAddr((p) => ({ ...p, state: e.target.value }))}
                placeholder="Noord-Holland"
              />
            </div>
          </div>

          {serviceAreaError && (
            <p className="text-sm text-red-500 bg-red-50 rounded-md px-3 py-2">
              {serviceAreaError}
            </p>
          )}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveAddress} disabled={isValidating}>
            {isValidating ? "Checking..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
