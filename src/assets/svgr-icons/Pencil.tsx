import * as React from "react";
import type { SVGProps } from "react";
const SvgPencil = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#000"
      d="m11.06 6 .94.94L2.92 16H2v-.92zm3.6-6c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.04 0-1.41L15.37.29c-.2-.2-.45-.29-.71-.29m-3.6 3.19L0 14.25V18h3.75L14.81 6.94z"
    />
  </svg>
);
export default SvgPencil;
