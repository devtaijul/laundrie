import React from "react";

export const DeliveryIcon = ({
  props,
}: {
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M9.90625 0.382202L3.8125 3.42908V5.12505H1V6.06255H3.8125V7.00005H0V7.93755H3.8125V8.87505H1V9.81255H3.8125V10.571L9.90625 13.6179L16 10.571V3.42908L9.90625 0.382202ZM14.4831 3.7188L9.90625 6.0072L5.32941 3.7188L9.90625 1.43039L14.4831 3.7188ZM4.75 7.93755H5.6875V7.00005H4.75V4.47726L9.4375 6.82101V12.3354L4.75 9.99161V7.93755ZM10.375 12.3353V6.82101L15.0625 4.47726V9.99161L10.375 12.3353Z"
        fill="black"
      />
    </svg>
  );
};
