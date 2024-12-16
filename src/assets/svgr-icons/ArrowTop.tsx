import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowTop = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={12} fill="none" {...props}>
    <path fill="#000" d="M18.23 11.77 20 10 10 0 0 10l1.77 1.77L10 3.54z" />
  </svg>
);
export default SvgArrowTop;
