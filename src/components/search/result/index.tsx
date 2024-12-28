"use client";

import Location from "@/assets/icons/location.svg";
import Search from "@/assets/icons/search.svg";
import Card from "@/components/card";
import Chip from "@/components/commons/chip";
import Icon from "@/components/commons/icons";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import { SectionLayout } from "@/components/layout";
import { useSearchPerformances } from "@/hooks";
import { useSearchStore } from "@/stores/useSearchStore";
import { useState } from "react";

export default function SearchResult() {
  const { searchQuery } = useSearchStore();
  const { data: performances, isLoading, isError } = useSearchPerformances(searchQuery);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-content gap-4">
        <LoadingSpinner size={50} />
        <p className="text-sm text-gray-600">로딩 중...</p>
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex flex-col justify-center items-center h-content">데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      {performances && performances.length > 0 ? (
        <SectionLayout className="flex flex-col py-4 gap-3">
          {performances.map((performance) => (
            <Card href={`/performance/${performance.performanceId}`} key={performance.performanceId} className="w-full">
              <Card.Image
                src={performance.posterUrl}
                alt={performance.performanceName}
                width="w-[88px]"
                height="h-[88px]"
              />
              <Card.Content>
                <Card.Category>
                  <Chip label={performance.genre} state="hashTag" />
                </Card.Category>
                <Card.Title>{performance.performanceName}</Card.Title>
                <Card.Info svgr={<Location />} info={performance.facility} />
              </Card.Content>
            </Card>
          ))}
        </SectionLayout>
      ) : (
        <div className="flex flex-col items-center justify-center h-content bg-white">
          <div className="mb-4">
            <Icon size={24}>
              <Search />
            </Icon>
          </div>
          <h3 className="text-lg font-semibold text-red-500 mb-2">검색 결과가 없습니다!</h3>
          <p className="text-sm text-gray-600 text-center">
            입력하신 키워드를 다시 확인하거나 다른 검색어를 입력해보세요.
          </p>
        </div>
      )}
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
