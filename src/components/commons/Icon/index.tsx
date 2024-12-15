import cn from "@/lib/tailwind-cn";
import Image from "next/image";
import { ReactNode } from "react";

type IconProps = {
  iconSrc?: string;
  alt?: string;
  size?: number;
  onClick?: () => void;
  className?: string;
  children?: ReactNode;
};

export default function Icon({ iconSrc, alt = "icon", size, onClick, className, children }: IconProps) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {iconSrc ? (
        <Image src={iconSrc} width={size} height={size} alt={alt} />
      ) : (
        // children으로 전달된 SVGR 아이콘 사용
        children
      )}
    </div>
  );
}
