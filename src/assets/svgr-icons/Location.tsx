import type { SVGProps } from "react";

const SvgLocation = ({
  width = 8,
  height = 11,
  ...props
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 11"
    width={width}
    height={height}
    fill="currentColor"
    {...props}
  >
    <path d="M7.5 4a3.5 3.5 0 1 0-7 0c0 .694.205 1.338.553 1.883h-.004L4 10.5l2.952-4.617h-.004C7.308 5.32 7.5 4.667 7.5 4M4 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
  </svg>
);

export default SvgLocation;
