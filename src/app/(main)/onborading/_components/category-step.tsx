"use client";

import Button from "@/components/commons/button";
import Chip from "@/components/commons/chip";
import { TAB_CATEGORY } from "@/constants/category";
import { useState } from "react";

type CategoryStepProps = {
  onNext: (categories: string[]) => void;
};

export default function CategoryStep({ onNext }: CategoryStepProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = TAB_CATEGORY.slice(1); // "전체"를 제외한 카테고리
  const isAllSelected = selectedCategories.length === categories.length;

  const handleAllClick = () => {
    if (isAllSelected) {
      setSelectedCategories([]); // 전체 해제
    } else {
      setSelectedCategories(categories.map((category) => category.name)); // 전체 선택
    }
  };

  const handleChipClick = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height)-4px)]">
      {/* 헤더 텍스트 */}
      <div className="mt-9 px-[23px]">
        <h1 className="text-[32px] font-semibold leading-snug">
          선호하는 공연 카테고리를 <br /> 선택하세요.
        </h1>
        <h3 className="text-sm text-gray-500 mt-2">선호에 맞는 공연을 추천해드릴게요.</h3>
      </div>

      {/* 카테고리 Chip */}
      <div className="mt-[65px] px-[29px] grid grid-cols-3 gap-x-2 gap-y-4">
        <Chip
          label="전체"
          state={isAllSelected ? "selected" : "default"}
          onClick={handleAllClick}
          className="col-span-3 text-center"
        />
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.name}
            state={selectedCategories.includes(category.name) ? "selected" : "default"}
            onClick={() => handleChipClick(category.name)}
          />
        ))}
      </div>

      {/* 문구 + 버튼 */}
      <div className="mt-auto px-4 pb-5">
        <div className="text-center text-sm text-gray-600 mb-5">공연 카테고리는 나중에 다시 수정할 수 있어요!</div>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => {
            if (selectedCategories.length > 0) {
              onNext(selectedCategories);
            }
          }}
          disabled={selectedCategories.length === 0} // 선택된 카테고리가 없을 때 버튼 비활성화
        >
          완료
        </Button>
      </div>
    </div>
  );
}
