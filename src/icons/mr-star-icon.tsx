import React from "react";

export const MrStarIcon = ({
  props,
}: {
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={46}
      height={46}
      viewBox="0 0 46 46"
      fill="none"
      {...props}
    >
      <path
        d="M46 23C25.5608 24.4129 24.4129 25.554 23 46C21.5871 25.5608 20.446 24.4129 0 23C20.4392 21.5871 21.5871 20.446 23 0C24.4129 20.4392 25.554 21.5871 46 23Z"
        fill="#231F20"
      />
    </svg>
  );
};

export const MrStarIconSmall = ({
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
        d="M16 8C8.89073 8.49144 8.49143 8.88836 8 16C7.50856 8.89073 7.11164 8.49144 0 8C7.10927 7.50856 7.50856 7.11164 8 0C8.49143 7.10927 8.88836 7.50856 16 8Z"
        fill="#023D55"
      />
    </svg>
  );
};
