import * as React from "react";
import type { SVGProps } from "react";
const SvgDotsVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={4} height={16} fill="none" {...props}>
    <path
      fill="#000"
      d="M2 12a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4m0-6a2 2 0 1 1 0 4 2 2 0 0 1 0-4"
    />
  </svg>
);
export default SvgDotsVertical;
