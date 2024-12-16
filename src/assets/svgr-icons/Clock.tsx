import * as React from "react";
import type { SVGProps } from "react";
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#000"
      d="M9 16.2c3.96 0 7.2-3.24 7.2-7.2S12.96 1.8 9 1.8 1.8 5.04 1.8 9s3.24 7.2 7.2 7.2M9 0c4.95 0 9 4.05 9 9s-4.05 9-9 9-9-4.05-9-9 4.05-9 9-9m.45 9.9H8.1L4.5 7.83l.72-1.17 2.97 1.71V4.5h1.35v5.4z"
    />
  </svg>
);
export default SvgClock;
