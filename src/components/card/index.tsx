"use client";

import cn from "@/lib/tailwind-cn";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useState } from "react";

type CardProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
};

export default function Card({ children, href, className }: CardProps) {
  return (
    <Link href={href || ""} className={cn("flex p-4 border border-gray-200 rounded-lg", className)}>
      {children}
    </Link>
  );
}

type CardImageProps = {
  src: string;
  alt: string;
  size: "sm";
  className?: string;
};

const SIZE_VARIANTS = {
  sm: {
    width: "w-[88px]",
    height: "h-[88px]",
    sizes: "(max-width: 768px) 88px",
  },
} as const;

function CardImage({ src, alt, size = "sm", className }: CardImageProps) {
  const { width, height, sizes } = SIZE_VARIANTS[size];
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        `flex-shrink-0 relative ${width} ${height} mr-4 bg-white border border-gray-200 rounded-lg overflow-hidden`,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        quality={80}
        sizes={sizes}
        className={cn("object-contain transition-opacity duration-500", isLoaded ? "opacity-100" : "opacity-0")}
        onLoad={() => setIsLoaded(true)}
        priority
      />
    </div>
  );
}

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("flex flex-col justify-center min-w-0", className)}>{children}</div>;
}

type CardCategoryProps = {
  children: ReactNode;
  className?: string;
};

function CardCategory({ children, className }: CardCategoryProps) {
  return <div className={cn("mb-2", className)}>{children}</div>;
}

type CardTitleProps = {
  children: string;
  className?: string;
};

function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn("text-sm font-semibold whitespace-nowrap overflow-hidden text-ellipsis", className)}>
      {children}
    </h3>
  );
}

type BaseCardInfoProps = {
  info: string;
  className?: string;
};

// 이미지 형태 혹은 svgr 둘 중 한 가지만 props로 받을 수 있게 설정
type CardInfoProps =
  | (BaseCardInfoProps & { iconSrc: string; svgr?: never })
  | (BaseCardInfoProps & { svgr: ReactNode; iconSrc?: never });

function CardInfo({ iconSrc, svgr, info, className }: CardInfoProps) {
  return (
    <div className={cn("flex items-center mt-[2px] text-xs text-gray-500", className)}>
      {iconSrc && (
        <div className="flex-shrink-0 w-4 h-4 mr-[3px]">
          <Image src={iconSrc} alt="icon" width={16} height={16} className="w-full h-full object-contain" />
        </div>
      )}
      {svgr && <div className="flex justify-center items-center w-3 h-3 mr-[3px]">{svgr}</div>}
      <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis">{info}</span>
    </div>
  );
}

Card.Image = CardImage;
Card.Content = CardContent;
Card.Category = CardCategory;
Card.Title = CardTitle;
Card.Info = CardInfo;
