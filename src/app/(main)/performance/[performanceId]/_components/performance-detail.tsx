"use client";

import Chip from "@/components/commons/chip";
import Gap from "@/components/commons/gap";
import { SectionLayout } from "@/components/layout";
import Image from "next/image";
import { useParams } from "next/navigation";

import Calendar from "@/assets/icons/calendar-month.svg";
import Location from "@/assets/icons/location.svg";
import Icon from "@/components/commons/icons";

export const mockPerformanceInfo = {
  performanceId: "PF253944",
  performanceName: "원테이블 매직",
  startDate: "2024.11.01",
  endDate: "2025.01.31",
  genre: "서커스/마술",
  state: "공연중",
  facility: "스튜디오 아르카나",
  isOpenRun: true,
  location: "서울특별시",
  posterUrl: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF253944_241118_144054.jpg",
  likes: 10,
};

export const mockPerformanceDetail = {
  performanceId: "PF253944",
  facilityId: "F001234",
  cast: "John Doe, Jane Smith",
  runtime: "120분",
  description: "마술과 서커스를 결합한 놀라운 퍼포먼스",
  ticketPrice: "₩50,000 ~ ₩100,000",
  storyImageUrl: "http://www.example.com/story-image.jpg",
  showtime: "2024.12.25 19:00",
  reservationChannel: "Interpark, Yes24",
  reservationUrl: "http://www.example.com/reservation",
};

export default function performanceDeatil() {
  const params = useParams();
  const performanceId = params?.performanceId.toString();

  // const { data, isPending, isError } = usePerformanceDetailQuery(performanceId);

  // console.log(data);
  // if (isPending) {
  //   return (
  //     <div className="flex justify-center items-center h-[300px]">
  //       <LoadingSpinner size={40} />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다...</div>;
  // }

  return (
    <section className="min-h-screen">
      <div className="relative w-full h-[170px]">
        <Image
          src={mockPerformanceInfo.posterUrl}
          alt={mockPerformanceInfo.performanceName}
          fill
          className="object-cover"
        />
      </div>
      {/* 검은색 반투명 레이어 */}
      <div className="absolute inset-0 h-[170px] mt-header bg-black/40" />

      <div className="absolute pl-4" style={{ top: "calc(var(--header-height) + 72px)" }}>
        <Image
          src={mockPerformanceInfo.posterUrl}
          alt={mockPerformanceInfo.performanceName}
          className="object-cover rounded-lg"
          width={144}
          height={205.76}
        />
      </div>
      <Gap vertical size={103} className="w-full" />
      <SectionLayout className="py-6">
        <div className="mb-4">
          <Chip label={mockPerformanceInfo.genre} state="hashTag" />
        </div>
        <h1 className="mb-3 text-xl font-bold">{mockPerformanceInfo.performanceName}</h1>
        <div className="flex">
          <Icon size={16} className="mr-1">
            <Location width={9.29} height={13} className="fill-black" />
          </Icon>
          <h3 className="text-textColor text-sm">{mockPerformanceInfo.facility}</h3>
        </div>
        <div className="flex">
          <Calendar />
          <h3 className="text-textColor text-sm">
            {mockPerformanceInfo.startDate} - {mockPerformanceInfo.endDate}
          </h3>
        </div>
      </SectionLayout>

      <Gap vertical size={16} className="w-full bg-blue-50" />
      <SectionLayout className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">공연 상세내용</h2>
        <p className="text-sm text-textColor mb-6">{mockPerformanceDetail.description}</p>
      </SectionLayout>

      <Gap vertical size={16} className="w-full bg-blue-50" />
      <SectionLayout className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">공연 출연진</h2>
        <p className="text-sm text-textColor mb-6">{mockPerformanceDetail.cast}</p>
      </SectionLayout>

      <Gap vertical size={16} className="w-full bg-blue-50" />
      <SectionLayout className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">티켓 가격</h2>
        <p className="text-sm text-textColor mb-6">{mockPerformanceDetail.ticketPrice}</p>
      </SectionLayout>

      <Gap vertical size={16} className="w-full bg-blue-50" />
      <SectionLayout className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">공연 기간 및 시간</h2>
        <p className="text-sm text-textColor mb-6">{mockPerformanceDetail.showtime}</p>
      </SectionLayout>

      <Gap vertical size={16} className="w-full bg-blue-50" />
      <SectionLayout className="px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">공연 위치</h2>
        <p className="text-sm text-textColor">{mockPerformanceInfo.location}</p>
      </SectionLayout>
    </section>
  );
}
