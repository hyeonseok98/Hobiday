import { SVGProps } from "react";

export default function HomeGradationIcon({
  width = 24,
  height = 24,
  ...props
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z" fill="url(#paint0_linear)" />
      <defs>
        <linearGradient id="paint0_linear" x1="-12" y1="-12" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#B1F9F3" />
          <stop offset="1" stopColor="#5E50F4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
