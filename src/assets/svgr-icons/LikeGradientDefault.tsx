import { SVGProps } from "react";

export default function LikeGradientDefault({
  width = 20,
  height = 19,
}: SVGProps<SVGSVGElement> & { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 20 19" xmlns="http://www.w3.org/2000/svg" className="text-primary">
      <defs>
        {/* Define the gradient */}
        <linearGradient id="heartDefaultGradient" x1="87%" y1="50%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#5E50F4" /> {/* Replace with actual primary color */}
          <stop offset="100%" stopColor="#B1F9F3" /> {/* Replace with actual secondary color */}
        </linearGradient>
      </defs>
      <path
        id="Vector"
        d="M10.1 15.55L10 15.65L9.89 15.55C5.14 11.24 2 8.39 2 5.5C2 3.5 3.5 2 5.5 2C7.04 2 8.54 3 9.07 4.36H10.93C11.46 3 12.96 2 14.5 2C16.5 2 18 3.5 18 5.5C18 8.39 14.86 11.24 10.1 15.55ZM14.5 0C12.76 0 11.09 0.81 10 2.08C8.91 0.81 7.24 0 5.5 0C2.42 0 0 2.41 0 5.5C0 9.27 3.4 12.36 8.55 17.03L10 18.35L11.45 17.03C16.6 12.36 20 9.27 20 5.5C20 2.41 17.58 0 14.5 0Z"
        fill="url(#heartDefaultGradient)"
      />
    </svg>
  );
}
