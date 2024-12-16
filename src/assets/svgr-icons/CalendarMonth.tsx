import type { SVGProps } from "react";

const SvgCalendarMonth = ({
  width = 18,
  height = 20,
  ...props
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 20"
    width={width}
    height={height}
    fill="currentColor"
    {...props}
  >
    <path d="M6 9v2H4V9zm4 0v2H8V9zm4 0v2h-2V9zm2-7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h1V0h2v2h8V0h2v2zm0 16V7H2v11zM6 13v2H4v-2zm4 0v2H8v-2zm4 0v2h-2v-2z" />
  </svg>
);

export default SvgCalendarMonth;
