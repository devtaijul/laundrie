"use client";

import * as React from "react";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NL_COUNTRY = "NL" as const;
const NlFlag = flags[NL_COUNTRY];

type PhoneInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> & {
  value?: string;
  onChange?: (value: string) => void;
};

function getLocalPart(value?: string) {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");

  if (digits.startsWith("31")) {
    return digits.slice(2, 11);
  }

  if (digits.startsWith("0")) {
    return digits.slice(1, 10);
  }

  return digits.slice(0, 9);
}

export const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const localPart = getLocalPart(value);

    return (
      <div className="flex">
        <div className="flex items-center px-3 rounded-s-lg border border-r-0 border-input bg-muted shrink-0 select-none">
          <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
            {NlFlag && <NlFlag title="Netherlands" />}
          </span>
        </div>

        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-16 items-center justify-center border-r border-input text-sm text-muted-foreground">
            +31
          </div>
          <Input
            ref={ref}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            className={cn("rounded-s-none pl-20", className)}
            value={localPart}
            onChange={(event) => {
              const digits = event.target.value.replace(/\D/g, "");
              const withoutCountry = digits.startsWith("31")
                ? digits.slice(2)
                : digits.startsWith("0")
                  ? digits.slice(1)
                  : digits;
              const nextLocalPart = withoutCountry.slice(0, 9);
              onChange?.(nextLocalPart ? `+31${nextLocalPart}` : "");
            }}
            {...props}
          />
        </div>
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
