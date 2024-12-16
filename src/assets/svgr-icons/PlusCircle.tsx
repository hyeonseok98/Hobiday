import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#000"
      d="M10 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20m1 5H9v4H5v2h4v4h2v-4h4V9h-4z"
    />
  </svg>
);
export default SvgPlusCircle;
