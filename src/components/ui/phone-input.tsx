"use client";

import * as React from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Netherlands is the only supported country for this application.
const NL_COUNTRY: RPNInput.Country = "NL";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange" | "country" | "defaultCountry"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<
  PhoneInputProps & React.RefAttributes<React.ElementRef<typeof RPNInput.default>>
> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, ...props }, ref) => {
  return (
    <RPNInput.default
      ref={ref}
      className={cn("flex", className)}
      // Lock to Netherlands — country (not defaultCountry) makes it immutable
      country={NL_COUNTRY}
      flagComponent={FlagComponent}
      countrySelectComponent={NlCountryDisplay}
      inputComponent={InputComponent}
      smartCaret={false}
      onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
      {...props}
    />
  );
});
PhoneInput.displayName = "PhoneInput";

// ── Static NL prefix display (replaces the country-select dropdown) ───────────

const NlFlag = flags[NL_COUNTRY];

const NlCountryDisplay = () => (
  <div className="flex items-center gap-1.5 px-3 h-10 rounded-s-lg border border-r-0 border-input bg-muted shrink-0 select-none">
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {NlFlag && <NlFlag title="Netherlands" />}
    </span>
    <span className="text-sm text-foreground">+31</span>
  </div>
);

// ── Number input ──────────────────────────────────────────────────────────────

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <Input
    className={cn("rounded-e-lg rounded-s-none", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

// ── FlagComponent is still needed by RPNInput internally ─────────────────────

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
