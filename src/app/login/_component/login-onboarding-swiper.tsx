"use client";

import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SlideCategory, SlideFeed, SlideWelcome, SlideWishlist } from "./slides";

export default function OnboardingSwiper() {
  return (
    <section className="relative w-full h-full mt-[19px] z-10">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-full"
      >
        <SwiperSlide>
          <SlideWelcome />
        </SwiperSlide>
        <SwiperSlide>
          <SlideCategory />
        </SwiperSlide>
        <SwiperSlide>
          <SlideFeed />
        </SwiperSlide>
        <SwiperSlide>
          <SlideWishlist />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
