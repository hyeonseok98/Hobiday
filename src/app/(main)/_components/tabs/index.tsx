"use client";

import Chip from "@/components/commons/chip";
import cn from "@/lib/tailwind-cn";
import { useEffect, useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

type Category = {
  id: number;
  name: string;
};

type TabsProps = {
  categories: Category[];
  gap?: number;
  onTabClick?: (category: Category) => void;
  activeTab?: number;
  className?: string;
};

export default function Tabs({ categories, gap = 12, onTabClick, activeTab = 0, className = "" }: TabsProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const isFirstClick = useRef(true); // 처음 Tab 렌더링 여부 추적

  const handleChipClick = (category: Category, index: number) => {
    onTabClick?.(category);
    // Tab마다 첫 렌더링시 애니메이션 없이 이동(slideTo 기본 동작 오류로 인해 해당 방식 채택)
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      const duration = isFirstClick.current ? 0 : 300; // 첫 클릭 여부에 따라 애니메이션 시간 설정
      if (currentIndex !== index) {
        swiperRef.current.slideTo(index, duration);
        isFirstClick.current = false; // 첫 클릭 이후 애니메이션 적용
      }
    }
  };

  // 첫 렌더링 시 현재 위치에서 가까운 위치로 이동
  useEffect(() => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex ?? 0; // Swiper의 현재 위치
      if (currentIndex !== activeTab) {
        swiperRef.current.slideTo(activeTab, 0); // 애니메이션 없이 즉시 이동
      }
    }
  }, [activeTab]);

  return (
    <div className="h-11 py-[6px]">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView="auto"
        freeMode={true}
        spaceBetween={gap}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        className={cn("w-full cursor-pointer", className)}
        preventInteractionOnTransition={true} // 부드러운 전환 유지
      >
        {categories.map((category, index) => (
          <SwiperSlide key={category.id} className="!w-auto">
            <Chip
              label={category.name}
              state={activeTab === category.id ? "selected" : "default"}
              onClick={() => handleChipClick(category, index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
