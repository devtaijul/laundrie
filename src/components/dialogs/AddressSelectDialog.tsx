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
  // e.g., "123 Nostrand Ave, Brooklyn, NY 11206"
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    line1: "",
    line2: "",
    city: "",
    zip: "",
    state: "",
  });

  const saved = state.data.savedAddress;
  const hasAddress = Boolean(saved && saved.line1);

  // local form state for dialog
  const [addr, setAddr] = useState<AddressForm>({
    line1: saved?.line1 ?? "",
    line2: saved?.line2 ?? "",
    city: saved?.city ?? "",
    zip: saved?.zip ?? "",
    state: saved?.state ?? "",
  });

  const handleSaveAddress = () => {
    // basic required validation
    if (!addr.line1 || !addr.city || !addr.zip || !addr.state) {
      // এখানে চাইলে toast দেখাতে পারো
      setErrors({
        line1: addr.line1 ? "" : "Address is required",
        city: addr.city ? "" : "City is required",
        zip: addr.zip ? "" : "Zip code is required",
        state: addr.state ? "" : "State is required",
      });
      return;
    }

    // save into context
    dispatch({
      type: "UPDATE_DATA",
      field: "savedAddress",
      value: {
        line1: addr.line1,
        line2: addr.line2 || undefined,
        city: addr.city,
        zip: addr.zip,
        state: addr.state,
      },
    });

    // also keep a human-readable summary
    dispatch({
      type: "UPDATE_DATA",
      field: "pickupAddress",
      value: summarizeAddress(addr),
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* You can also keep a visible "Add address" button via <DialogTrigger> if you prefer */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {hasAddress ? "Edit Address" : "Add Address"}
          </DialogTitle>
          <DialogDescription>
            Enter your address to see availability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Address</label>
            <Input
              className={errors.line1 ? "border-red-500" : ""}
              value={addr.line1}
              onChange={(e) => {
                if (e.target.value) {
                  setErrors((p) => ({ ...p, line1: "" }));
                } else {
                  setErrors((p) => ({ ...p, line1: "Address is required" }));
                }
                setAddr((p) => ({ ...p, line1: e.target.value }));
              }}
              placeholder="123 Nostrand Ave"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Apartment/suite
            </label>
            <Input
              className={errors.line2 ? "border-red-500" : ""}
              value={addr.line2}
              onChange={(e) => {
                if (e.target.value) {
                  setErrors((p) => ({ ...p, line2: "" }));
                } else {
                  setErrors((p) => ({ ...p, line2: "Address is required" }));
                }
                setAddr((p) => ({ ...p, line2: e.target.value }));
              }}
              placeholder="Apt / Suite (optional)"
            />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">City</label>
            <Input
              value={addr.city}
              onChange={(e) => {
                if (e.target.value) {
                  setErrors((p) => ({ ...p, city: "" }));
                } else {
                  setErrors((p) => ({ ...p, city: "City is required" }));
                }
                setAddr((p) => ({ ...p, city: e.target.value }));
              }}
              placeholder="Brooklyn"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground">Zip Code</label>
              <Input
                className={errors.zip ? "border-red-500" : ""}
                value={addr.zip}
                onChange={(e) => {
                  if (e.target.value.length) {
                    setErrors((p) => ({ ...p, zip: "" }));
                  } else {
                    setErrors((p) => ({ ...p, zip: "Zip code is required" }));
                  }
                  setAddr((p) => ({ ...p, zip: e.target.value }));
                }}
                placeholder="11206"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">State</label>
              <Input
                className={errors.state ? "border-red-500" : ""}
                value={addr.state}
                onChange={(e) => {
                  if (e.target.value.length) {
                    setErrors((p) => ({ ...p, state: "" }));
                  } else {
                    setErrors((p) => ({ ...p, state: "State is required" }));
                  }
                  setAddr((p) => ({ ...p, state: e.target.value }));
                }}
                placeholder="NY"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSaveAddress}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
