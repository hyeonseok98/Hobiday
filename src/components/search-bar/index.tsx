"use client";

import cn from "@/lib/tailwind-cn";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import CloseIcon from "@/assets/icons/cancel.svg";
import Icon from "@/components/commons/icons";
import { useSearchStore } from "@/stores/useSearchStore";

export type SearchBarProps = {
  className?: string;
};

export default function SearchBar(className: SearchBarProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const handleGoBack = () => {
    router.back();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <header className={cn("relative flex items-center justify-between w-full h-[48px] px-4 py-2 bg-white", className)}>
      {/* 왼쪽: 뒤로가기 버튼 */}
      <div className="flex items-center justify-start space-x-2">
        <Icon onClick={handleGoBack} size={24} className="cursor-pointer">
          <ArrowBack />
        </Icon>
      </div>

      {/* 중앙: 검색창 */}
      <div className="flex items-center justify-center w-[350px] h-9 bg-gray-50 rounded-full px-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          className="w-full h-full bg-transparent outline-none text-gray-700"
        />
        {searchQuery && (
          <button onClick={handleClear} className="text-gray-400 hover:text-gray-600">
            <Icon size={24}>
              <CloseIcon />
            </Icon>
          </button>
        )}
      </div>
    </header>
  );
}
