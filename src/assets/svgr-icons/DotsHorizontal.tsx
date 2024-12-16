import * as React from "react";
import type { SVGProps } from "react";
const SvgDotsHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={4} fill="none" {...props}>
    <path
      fill="#000"
      d="M12 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0M6 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0M0 2a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
    />
  </svg>
);
export default SvgDotsHorizontal;
