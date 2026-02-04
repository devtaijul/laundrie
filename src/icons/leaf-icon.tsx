import React from "react";

export const LeafIcon = ({
  props,
}: {
  props?: React.SVGProps<SVGSVGElement>;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={31}
      height={29}
      viewBox="0 0 31 29"
      fill="none"
      {...props}
    >
      <path
        d="M23.25 7.63158C9.3 10.6842 6.045 20.1016 2.821 27.9926L5.7505 29L7.223 25.4895C7.967 25.7489 8.742 25.9474 9.3 25.9474C26.35 25.9474 31 0 31 0C29.45 3.05263 18.6 3.43421 10.85 4.96053C3.1 6.48684 0 12.9737 0 16.0263C0 19.0789 2.7125 21.75 2.7125 21.75C7.75 7.63158 23.25 7.63158 23.25 7.63158Z"
        fill="#3CBE52"
      />
    </svg>
  );
};
