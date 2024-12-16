import * as React from "react";
import type { SVGProps } from "react";
const SvgTune = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#000"
      d="M0 14v2h6v-2zM0 2v2h10V2zm10 16v-2h8v-2h-8v-2H8v6zM4 6v2H0v2h4v2h2V6zm14 4V8H8v2zm-6-4h2V4h4V2h-4V0h-2z"
    />
  </svg>
);
export default SvgTune;
