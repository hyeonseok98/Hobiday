import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

type ImageCarouselProps = {
  feedFiles: string[];
};

export default function FeedImage({ feedFiles }: ImageCarouselProps) {
  return (
    <div className="flex justify-center items-center">
      <section className="w-[398px] h-[398px] overflow-hidden rounded-lg">
        {feedFiles.length > 1 ? (
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: false }}
            navigation={false}
            loop={false}
            modules={[Pagination]}
          >
            {feedFiles.map((file, index) => (
              <SwiperSlide key={file}>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}${file}`}
                  alt={`feed-image-${index}`}
                  className="w-[398px] h-[398px] object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img src={feedFiles[0]} alt="feed-image" className="w-[398px] h-[398px] object-cover" />
        )}
      </section>
    </div>
  );
}
