import * as React from "react";
import type { SVGProps } from "react";
const SvgComment = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M1.396 11.554C-.852 6.037 3.206 0 9.164 0h.32a8.07 8.07 0 0 1 8.069 8.068A8.98 8.98 0 0 1 8.57 17.05H.75a.75.75 0 0 1-.47-1.335l1.97-1.583a.25.25 0 0 0 .076-.29zM9.164 1.5c-4.893 0-8.226 4.957-6.38 9.488l.932 2.289a1.75 1.75 0 0 1-.525 2.024l-.31.249h5.69a7.48 7.48 0 0 0 7.482-7.482A6.57 6.57 0 0 0 9.485 1.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgComment;
