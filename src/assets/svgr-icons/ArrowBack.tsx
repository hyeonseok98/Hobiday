import * as React from "react";
import type { SVGProps } from "react";
const SvgArrowBack = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={12} height={20} fill="none" {...props}>
    <path fill="#000" d="M11.77 1.77 10 0 0 10l10 10 1.77-1.77L3.54 10z" />
  </svg>
);
export default SvgArrowBack;
