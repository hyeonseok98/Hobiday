import * as React from "react";
import type { SVGProps } from "react";
const SvgHashtag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={18} fill="none" {...props}>
    <path
      fill="#000"
      d="m3.41 18 .71-4h-4l.35-2h4l1.06-6h-4l.35-2h4l.71-4h2l-.71 4h6l.71-4h2l-.71 4h4l-.35 2h-4l-1.06 6h4l-.35 2h-4l-.71 4h-2l.71-4h-6l-.71 4zM7.53 6l-1.06 6h6l1.06-6z"
    />
  </svg>
);
export default SvgHashtag;
