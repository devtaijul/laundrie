"use client";

import * as React from "react";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NlFlag = flags["NL"];

type PhoneInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "type" | "inputMode" | "maxLength"
> & {
  value?: string;
  onChange?: (value: string) => void;
};

/** Extract only the 9-digit national part from any NL phone string. */
function getNationalPart(value?: string): string {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("31")) return digits.slice(2, 11);
  if (digits.startsWith("0")) return digits.slice(1, 10);
  return digits.slice(0, 9);
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const nationalPart = getNationalPart(value);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
      const digits = event.target.value.replace(/\D/g, "");
      const national = digits.startsWith("31")
        ? digits.slice(2)
        : digits.startsWith("0")
          ? digits.slice(1)
          : digits;
      const next = national.slice(0, 9);
      onChange?.(next ? `+31${next}` : "");
    }

    return (
      <div className="flex">
        {/* Fixed country badge — NL flag + +31, not interactive */}
        <div className="flex items-center gap-2 px-3 rounded-s-lg border border-r-0 border-input bg-muted shrink-0 select-none">
          <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
            {NlFlag && <NlFlag title="Netherlands" />}
          </span>
          <span className="text-sm text-foreground/80">+31</span>
        </div>

        {/* National-number input — only the 9 digits after +31 */}
        <Input
          placeholder="612345678"
          {...props}
          ref={ref}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={9}
          className={cn("rounded-s-none", className)}
          value={nationalPart}
          onChange={handleChange}
        />
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
