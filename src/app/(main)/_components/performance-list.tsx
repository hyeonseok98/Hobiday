"use client";

import Location from "@/assets/icons/location.svg";
import Card from "@/components/card";
import Chip from "@/components/commons/chip";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import { SectionLayout } from "@/components/layout";
import { TAB_CATEGORY } from "@/constants/category";
import { useAllPerformancesQuery, usePerformancesByGenreQuery } from "@/hooks";
import { useGetMyProfile } from "@/hooks/user/use-profile-update";
import { useState } from "react";
import Tabs from "./tabs";

export default function PerformanceList() {
  const { isLoading } = useGetMyProfile();
  const [selectedTab, setSelectedTab] = useState(0); // 초기 상태를 "전체"로 설정
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  // "전체" 탭 데이터 가져오기
  const {
    data: allPerformances,
    isPending: isAllPerformancesPending,
    isError: isAllPerformancesError,
  } = useAllPerformancesQuery({
    rowStart: "0",
    rowEnd: "20",
  });

  // 장르별 데이터 가져오기
  const {
    data: performancesByGenre,
    isPending: isPerformancesByGenrePending,
    isError: isPerformancesByGenreError,
  } = usePerformancesByGenreQuery({
    params: {
      genre: TAB_CATEGORY[selectedTab].name,
      rowStart: "0",
      rowEnd: "20",
    },
    enabled: selectedTab !== 0, // "전체" 탭이 아닐 때만 데이터 요청
  });

  const performances = selectedTab === 0 ? allPerformances : performancesByGenre;
  const isPending = selectedTab === 0 ? isAllPerformancesPending : isPerformancesByGenrePending;
  const isError = selectedTab === 0 ? isAllPerformancesError : isPerformancesByGenreError;

  const handleTabClick = (category: { id: number; name: string }) => {
    setSelectedTab(category.id);
  };

  if (isLoading || isPending) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  return (
    <>
      <Tabs
        categories={TAB_CATEGORY}
        gap={12}
        className="h-11 py-[6px]"
        onTabClick={handleTabClick}
        activeTab={selectedTab}
      />
      <SectionLayout className="flex flex-col py-4 gap-3">
        {performances?.map((performance) => (
          <Card key={performance.performanceId} href={`/performance/${performance.performanceId}`} className="w-full">
            <Card.Image
              src={performance.posterUrl}
              alt={performance.performanceName}
              width={"w-[88px]"}
              height={"h-[88px]"}
            />
            <Card.Content>
              <Card.Category>
                <Chip label={performance.genre} state="hashTag" />
              </Card.Category>
              <Card.Title>{performance.performanceName}</Card.Title>
              <Card.Info svgr={<Location className="fill-gray-400" />} info={performance.facility} />
            </Card.Content>
          </Card>
        ))}
      </SectionLayout>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
