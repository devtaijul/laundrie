import React from "react";

export const ShieldIcon = ({
  props,
}: {
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={34}
      viewBox="0 0 28 34"
      fill="none"
      {...props}
    >
      <path
        d="M14 0L0 6.18182V15.4545C0 24.0318 5.97333 32.0527 14 34C22.0267 32.0527 28 24.0318 28 15.4545V6.18182L14 0ZM18.7911 23.1818L14 20.3227L9.22445 23.1818L10.4844 17.7727L6.26889 14.1564L11.8378 13.6773L14 8.57727L16.1622 13.6618L21.7311 14.1409L17.5156 17.7727L18.7911 23.1818Z"
        fill="#EFCA34"
      />
    </svg>
  );
};
