"use client";

import cn from "@/lib/tailwind-cn";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import ArrowBack from "@/assets/icons/arrow-back.svg";
import CloseIcon from "@/assets/icons/cancel.svg";
import Icon from "@/components/commons/icons";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchStore } from "@/stores/use-search.store";

export type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className }: SearchBarProps) {
  const router = useRouter();
  const { searchQuery, setSearchQuery } = useSearchStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedQuery = useDebounce(localSearchQuery, 400);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSearchQuery(debouncedQuery);
  }, [debouncedQuery, setSearchQuery]);

  useEffect(() => {
    inputRef.current?.focus();
    return () => {
      setSearchQuery("");
    };
  }, [setSearchQuery]);

  const handleGoBack = () => {
    router.back();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setLocalSearchQuery("");
  };

  return (
    <header className={cn("relative flex items-center justify-between w-full h-header px-4 py-2 bg-white", className)}>
      {/* 왼쪽: 뒤로가기 버튼 */}
      <div className="flex items-center justify-start space-x-2">
        <Icon onClick={handleGoBack} size={24} className="cursor-pointer">
          <ArrowBack />
        </Icon>
      </div>

      {/* 중앙: 검색창 */}
      <div className="flex items-center justify-center w-[350px] h-9 bg-gray-50 rounded-full px-4">
        <input
          ref={inputRef} // Automatically focus input
          type="text"
          value={localSearchQuery}
          onChange={handleChange}
          className="w-full h-full bg-transparent outline-none text-gray-700"
        />
        {localSearchQuery && (
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
