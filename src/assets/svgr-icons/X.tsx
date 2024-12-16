import * as React from "react";
import type { SVGProps } from "react";
const SvgX = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} fill="none" {...props}>
    <path
      fill="#000"
      d="M1.334 11.833.167 10.666 4.834 6 .167 1.333 1.334.167 6 4.833 10.667.167l1.167 1.166L7.167 6l4.667 4.666-1.167 1.167L6 7.167z"
    />
  </svg>
);
export default SvgX;
