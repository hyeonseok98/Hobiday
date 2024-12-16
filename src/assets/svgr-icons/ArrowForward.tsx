import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowForward = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} fill="none" {...props}>
    <path fill="#000" d="M.23 18.23 2 20l10-10L2 0 .23 1.77 8.46 10z" />
  </svg>
);
export default SvgArrowForward;
