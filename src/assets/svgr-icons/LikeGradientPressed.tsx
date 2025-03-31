import { SVGProps } from "react";

export default function LikeGradientPressed({
  width = 21,
  height = 19,
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  return (
    <svg
      width={width} // width props
      height={height} // height props
      viewBox="0 0 21 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heartGradientPressed" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#B1F9F3" />
          <stop offset="100%" stopColor="#5E50F4" />
        </linearGradient>
      </defs>
      <path
        d="M10.5 18.35L9.05 17.03C3.9 12.36 0.5 9.27 0.5 5.5C0.5 2.41 2.92 0 6 0C7.74 0 9.41 0.81 10.5 2.08C11.59 0.81 13.26 0 15 0C18.08 0 20.5 2.41 20.5 5.5C20.5 9.27 17.1 12.36 11.95 17.03L10.5 18.35Z"
        fill="url(#heartGradientPressed)"
      />
    </svg>
  );
}
