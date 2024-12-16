import * as React from "react";
import type { SVGProps } from "react";
const SvgCommentText = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" {...props}>
    <path
      fill="#000"
      d="M7 20a1 1 0 0 1-1-1v-3H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6.1l-3.7 3.71c-.2.19-.45.29-.7.29zm1-6v3.08L11.08 14H18V2H2v12zM4 5h12v2H4zm0 4h9v2H4z"
    />
  </svg>
);
export default SvgCommentText;
