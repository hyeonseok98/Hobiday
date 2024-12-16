"use client";

import Location from "@/assets/icons/location.svg";
import Search from "@/assets/icons/search.svg";
import Card from "@/components/card";
import Chip from "@/components/commons/chip";
import Icon from "@/components/commons/icons";
import { SectionLayout } from "@/components/layout";
import { useSearchPerformances } from "@/hooks";
import { useSearchStore } from "@/stores/useSearchStore";

export default function SearchResult() {
  const { searchQuery } = useSearchStore();

  const { data: performances, isLoading, isError } = useSearchPerformances(searchQuery);

  if (isLoading) {
    return <div className="text-center py-8">로딩 중...</div>;
  }

  if (isError) {
    return <div className="text-center py-8 text-primary">데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <SectionLayout className="flex flex-col py-4 gap-3">
      {performances && performances.length > 0 ? (
        performances.map((performance) => (
          <Card href={`/performance/${performance.performanceId}`} key={performance.performanceId} className="w-full">
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
              <Card.Info svgr={<Location />} info={performance.facility} />
            </Card.Content>
          </Card>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
          <div className="mb-4">
            <Icon size={24}>
              <Search />
            </Icon>
          </div>
          <p className="text-lg font-semibold text-red-500 mb-2">검색 결과가 없습니다!</p>
          <p className="text-sm text-gray-600 text-center">
            입력하신 키워드를 다시 확인하거나 다른 검색어를 입력해보세요.
          </p>
        </div>
      )}
    </SectionLayout>
  );
}
