"use client";

import Location from "@/assets/icons/location.svg";
import Card from "@/components/card";
import SkeletonCard from "@/components/card/card.skeleton";
import Chip from "@/components/commons/chip";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import { SectionLayout } from "@/components/layout";
import { TAB_CATEGORY } from "@/constants/category";
import { useScrollObserver } from "@/hooks";
import { usePerformancesInfiniteQuery } from "@/hooks/performance/use-performance-infinite-query";
import { useGetMyProfile } from "@/hooks/user/use-profile-update";
import { ClientPerformance } from "@/types/performance";
import { useState } from "react";
import Tabs from "./tabs";

export default function PerformanceList() {
  const { isLoading: isProfileLoading } = useGetMyProfile();
  const [selectedTab, setSelectedTab] = useState(0);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  // 선택된 탭에 따라 장르값 설정
  // 탭 인덱스가 0이면 "전체" 탭, 0이 아니면 해당 탭에 해당하는 장르 이름 사용
  const genre = selectedTab === 0 ? "" : TAB_CATEGORY[selectedTab]?.name ?? "";

  // 공연 데이터를 가져오는 무한 스크롤 훅
  const {
    data: performanceApiData,
    fetchNextPage,
    hasNextPage,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
  } = usePerformancesInfiniteQuery(selectedTab, genre);

  // 중복된 공연 데이터 제거
  const pages = performanceApiData?.pages ?? [];
  const performanceLists = Array.from(
    pages
      .flat()
      .reduce((map, performance: ClientPerformance) => {
        map.set(performance.performanceId, performance);
        return map;
      }, new Map<string, ClientPerformance>())
      .values(),
  );

  // Intersection Observer
  const scrollRef = useScrollObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const handleTabClick = (category: { id: number; name: string }) => {
    setSelectedTab(category.id);
  };

  // 초기 데이터 로드시 로딩 스피너 표시
  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는 중 문제가 생겼습니다...</div>;
  }

  return (
    <>
      <Tabs categories={TAB_CATEGORY} gap={12} onTabClick={handleTabClick} activeTab={selectedTab} />

      {/* 탭 이동시 CLS 방지 */}
      <SectionLayout className="flex flex-col py-4 gap-3">
        {performanceLists.length === 0 && isPending && <SkeletonCard count={5} />}

        {performanceLists.map((performance) => (
          <Card key={performance.performanceId} href={`/performance/${performance.performanceId}`} className="w-full">
            <Card.Image src={performance.posterUrl} alt={performance.performanceName} size="sm" />
            <Card.Content>
              <Card.Category>
                <Chip label={performance.genre} state="hashTag" />
              </Card.Category>
              <Card.Title>{performance.performanceName}</Card.Title>
              <Card.Info svgr={<Location className="fill-gray-400" />} info={performance.facility} />
            </Card.Content>
          </Card>
        ))}

        <div ref={scrollRef} />

        {/* 무한 스크롤 시 스켈레톤 적용 */}
        {isFetching && performanceLists.length > 0 && <SkeletonCard count={3} />}

        {/* 무한 스크롤 시 로딩 스피너 적용 */}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center p-2">
            <LoadingSpinner size={40} />
          </div>
        )}
      </SectionLayout>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
