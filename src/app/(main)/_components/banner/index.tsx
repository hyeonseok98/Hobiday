"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SectionLayout from "@/components/layout/section-layout";
import { AD_BANNERS } from "@/constants/banner";
import Image from "next/image";

export default function AdBanner() {
  return (
    <SectionLayout className="h-[432px] pt-[17px] pb-[17px]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
        }}
        lazyPreloadPrevNext={1} // 이전/다음 슬라이드 미리 로딩
        loop={true}
        modules={[Pagination, Autoplay]}
      >
        {AD_BANNERS.map((banner, index) => (
          <SwiperSlide key={banner.src}>
            <div className="relative block w-[398px] h-[398px] overflow-hidden">
              <Image
                src={banner.src}
                alt={banner.alt}
                fill
                className="object-cover"
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 398px"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                quality={85}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </SectionLayout>
  );
}
