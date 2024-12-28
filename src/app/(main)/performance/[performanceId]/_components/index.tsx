"use client";

import Gap from "@/components/commons/gap";
import LoadingSpinner from "@/components/commons/spinner";
import { useFacilityInfo, usePerformanceDetailAll } from "@/hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import BackGroundPoster from "./background-poster";
import PerformanceDetailHeader from "./performance-header";
import PerformanceInfo from "./performance-info";
import Toast from "@/components/commons/toast";
import { useState } from "react";

export default function PerformanceDetail() {
  const params = useParams();
  const performanceId = params?.performanceId?.toString();
  const { data, isLoading, isError } = usePerformanceDetailAll(performanceId);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  const facilityId = data?.facilityId;
  const {
    data: facilityInfo,
    isLoading: isFacilityLoading,
    isError: isFacilityError,
  } = useFacilityInfo(facilityId || "");

  if (isLoading || isFacilityLoading) {
    return (
      <div className="flex justify-center items-center h-content">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError || !data || isFacilityError || !facilityInfo) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-content">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  const PERFORMANCE_DEFAULT_INFO = [
    {
      title: "공연 상세내용",
      children: <Image src={data.storyImageUrl} alt={data.name} width={380} height={450} />,
    },
    { title: "공연 출연진", content: data.cast, placeholder: "공연자 정보가 없습니다." },
    { title: "티켓 가격", content: data.ticket.price, placeholder: "티켓 가격 정보가 없습니다." },
    { title: "공연 기간 및 시간", content: data.showtime, placeholder: "공연 시간 정보가 없습니다." },
    {
      title: "공연 위치",
      children: (
        <div className="text-sm text-textColor">
          <p>공연장 정보</p>
          <p>{facilityInfo.facilityName || "시설 이름 정보가 없습니다."}</p>
          <p>주소: {facilityInfo.address || "주소 정보가 없습니다."}</p>
        </div>
      ),
    },
  ];

  return (
    <section className="min-h-screen">
      <BackGroundPoster posterUrl={data.posterUrl} name={data.name} />

      {/* 공연 상세 헤더 */}
      <Gap vertical size={103} />
      <PerformanceDetailHeader
        performance={{
          genre: data.genre,
          name: data.name,
          location: facilityInfo.facilityName || data.location.place,
          dateStart: data.date.start,
          dateEnd: data.date.end,
          likeCounts: data.likeCounts,
          performanceId: data.performanceId,
          feedCounts: data.feedCounts,
          isLiked: data.isLiked,
        }}
      />

      {/* 공연 상세 정보 */}
      {PERFORMANCE_DEFAULT_INFO.map((section, index) => (
        <>
          <Gap vertical size={16} className="bg-blue-50" />
          <PerformanceInfo
            key={index}
            title={section.title}
            content={section.content}
            placeholder={section.placeholder}
          >
            {section.children}
          </PerformanceInfo>
        </>
      ))}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </section>
  );
}
