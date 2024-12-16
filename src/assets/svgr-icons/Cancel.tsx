import * as React from "react";
import type { SVGProps } from "react";
const SvgCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#838387"
      d="M10 0a10 10 0 1 0 10 10A9.99 9.99 0 0 0 10 0m5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10z"
    />
  </svg>
);
export default SvgCancel;
