"use client";

import { fetchAllPerformances, fetchPerformancesByGenre } from "@/apis/performance-api";
import { performanceAdapter } from "@/types/performance/adapter/performance-adapter";
import { ClientPerformance } from "@/types/performance/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PERFORMANCE_KEYS } from "../queries";

/**
 * @param selectedTab 탭 번호(0이면 전체, 그 외엔 장르)
 * @param genre       탭이 0이 아닐 때 불러올 공연 장르
 */
export function usePerformancesInfiniteQuery(selectedTab: number, genre: string) {
  // 10개식 데이터 요청
  const PAGE_SIZE = 10;

  const queryResult = useInfiniteQuery<ClientPerformance[], Error>({
    queryKey: PERFORMANCE_KEYS.infiniteList(selectedTab, genre),
    initialPageParam: 0,

    queryFn: async ({ pageParam = 0 }) => {
      const page = pageParam as number;
      const rowStart = page.toString();
      const rowEnd = (page + PAGE_SIZE - 1).toString();

      // 탭이 0이면 전체 공연 API, 그 외엔 장르 API 사용
      if (selectedTab === 0) {
        const response = await fetchAllPerformances({ rowStart, rowEnd });
        return performanceAdapter(response.result ?? []);
      } else {
        const response = await fetchPerformancesByGenre({
          rowStart,
          rowEnd,
          genre,
        });
        return performanceAdapter(response.result ?? []);
      }
    },

    // 다음 pageParam 계산
    getNextPageParam: (lastPage, allPages) => {
      // lastPage가 PAGE_SIZE보다 적으면 더 이상 가져올 데이터가 없는 것으로 간주
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }

      return allPages.length * PAGE_SIZE;
    },
  });

  return queryResult;
}
