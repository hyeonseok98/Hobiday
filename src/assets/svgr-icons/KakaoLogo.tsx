import * as React from "react";
import type { SVGProps } from "react";
const SvgKakaoLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={19} height={17} fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M9.5.1C4.53.1.5 3.213.5 7.052c0 2.388 1.558 4.493 3.932 5.745l-.999 3.648c-.088.322.28.579.563.392l4.377-2.889q.554.055 1.127.057c4.97 0 9-3.113 9-6.953C18.5 3.213 14.47.1 9.5.1"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgKakaoLogo;
