import cn from "@/lib/tailwind-cn";
import Image from "next/image";
import { ReactNode } from "react";

type SearchCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SearchCard({ children, className }: SearchCardProps) {
  return <div className={cn("flex rounded-md bg-gray-50", className)}>{children}</div>;
}

type SearchCardImageProps = {
  src: string;
  alt: string;
  width: string;
  height: string;
  className?: string;
};

function SearchCardImage({ src, alt, width, height, className }: SearchCardImageProps) {
  return (
    <div className={cn(`flex-shrink-0 relative ${width} ${height} mr-3 rounded-l-md overflow-hidden`, className)}>
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

type SearchCardContentProps = {
  title: string;
  category: ReactNode;
  info: string;
  iconSrc?: string;
  svgr?: ReactNode;
  className?: string;
};

function SearchCardContent({ title, category, info, iconSrc, svgr, className }: SearchCardContentProps) {
  return (
    <div className={cn("flex flex-col justify-center", className)}>
      {/* Title: 한 줄 */}
      <h3 className="text-sm font-medium text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">{title}</h3>

      {/* Category와 Info를 한 줄에 배치 */}
      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-2">
        <div>{category}</div>
        <div className="flex items-center">
          {iconSrc && (
            <div className="flex-shrink-0 w-4 h-4 mr-[3px]">
              <Image src={iconSrc} alt="icon" width={16} height={16} className="w-full h-full object-contain" />
            </div>
          )}
          {svgr && <div className="flex justify-center items-center w-3 h-3 mr-[3px]">{svgr}</div>}
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis">{info}</span>
        </div>
      </div>
    </div>
  );
}
SearchCard.Image = SearchCardImage;
SearchCard.Content = SearchCardContent;
