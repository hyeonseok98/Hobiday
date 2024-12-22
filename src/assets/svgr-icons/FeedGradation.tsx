import { SVGProps } from "react";

export default function GradientIcon({
  width = 40,
  height = 40,
  ...props
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x="3.334"
        y="3.333"
        width="33.3333"
        height="33.3333"
        rx="2"
        stroke="url(#paint0_linear)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M10 13.333H28.3333" stroke="#5E50F4" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M10 20H28.3333" stroke="#5E50F4" strokeWidth="2.5" strokeLinecap="square" />
      <path d="M10 26.666H19.1667" stroke="#5E50F4" strokeWidth="2.5" strokeLinecap="square" />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-12.7771"
          y1="-14.4448"
          x2="26.6673"
          y2="24.4441"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#B1F9F3" />
          <stop offset="1" stopColor="#5E50F4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
