"use client";

import cn from "@/lib/tailwind-cn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import Icon from "@/components/commons/icons";

type IconType = {
  icon: ReactNode;
  path: string;
  size?: number;
};

export type HeaderProps = {
  title?: string;
  showBackButton?: boolean; // 왼쪽 뒤로가기 버튼 활성화
  leftIcons?: IconType[];
  rightIcons?: IconType[];
  rightText?: string;
  onRightTextClick?: () => void;
  className?: string;
};

export default function Header({
  title,
  showBackButton = false,
  leftIcons = [],
  rightIcons = [],
  rightText,
  onRightTextClick,
  className,
}: HeaderProps) {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <header className={cn("relative flex items-center justify-between w-full h-header px-4 py-2 bg-white", className)}>
      {/* 왼쪽: 아이콘들 */}
      <div className="flex items-center justify-start space-x-2">
        {leftIcons.map(({ icon, path, size }, index) => (
          <Link key={index} href={path} className="cursor-pointer">
            <Icon size={size}>{icon}</Icon>
          </Link>
        ))}
        {showBackButton && (
          <Icon onClick={handleGoBack} size={24} className="cursor-pointer">
            <ArrowBack />
          </Icon>
        )}
      </div>

      {/* 중앙: 제목 */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-lg font-bold text-center">
        <h2>{title}</h2>
      </div>

      {/* 오른쪽: 아이콘들 */}
      <div className="flex items-center justify-end gap-2">
        {rightIcons.map(({ icon, path, size }, index) => (
          <Link key={index} href={path} className="cursor-pointer">
            <Icon size={size}>{icon}</Icon>
          </Link>
        ))}
        {/* 오른쪽: 텍스트 */}
        {rightText && (
          <button
            type="submit"
            onClick={onRightTextClick}
            className="text-primary font-semibold text-sm cursor-pointer"
          >
            {rightText}
          </button>
        )}
      </div>
    </header>
  );
}
