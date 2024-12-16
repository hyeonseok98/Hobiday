import { PaginationProps } from "@/types/commons/pagination";
import { performanceAdapter, performanceDetailAdapter } from "@/types/performance/adapter";
import { performanceDetailAllAdapter } from "@/types/performance/adapter/performance-detail-all-adapter";
import { ClientPerformance } from "@/types/performance/client";
import { PerformancesByGenreQueryProps } from "@/types/performance/performance-queries";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllPerformances,
  fetchPerformanceById,
  fetchPerformanceDetailAll,
  fetchPerformancesByGenre,
  fetchPerformancesByKeyword,
} from "../../apis/performance-api";
import { PERFORMANCE_KEYS } from "../queries";

// 전체 공연 데이터 조회
export const useAllPerformancesQuery = (params: PaginationProps) => {
  return useQuery({
    queryKey: PERFORMANCE_KEYS.all,
    queryFn: async () => {
      const data = await fetchAllPerformances(params);
      return performanceAdapter(data.result);
    },
    select: (data) => data || [],
  });
};

// 장르별 공연 정보 조회
export const usePerformancesByGenreQuery = ({ params, enabled }: PerformancesByGenreQueryProps) => {
  return useQuery({
    queryKey: PERFORMANCE_KEYS.byGenre(params.genre, params.rowStart, params.rowEnd),
    queryFn: async () => {
      const data = await fetchPerformancesByGenre(params);
      return performanceAdapter(data.result);
    },
    enabled,
    select: (data) => data || [],
  });
};

// 공연 상세 정보
export const usePerformanceDetailQuery = (performanceId: string) => {
  return useQuery({
    queryKey: PERFORMANCE_KEYS.details(performanceId),
    queryFn: async () => {
      const data = await fetchPerformanceById(performanceId);
      return performanceDetailAdapter(data.result);
    },
    enabled: !!performanceId,
    select: (data) => data || null,
  });
};

// 공연 기본 정보 + 상세 정보
export const usePerformanceDetailAll = (performanceId: string) => {
  return useQuery({
    queryKey: PERFORMANCE_KEYS.detailAll(performanceId),
    queryFn: async () => {
      const data = await fetchPerformanceDetailAll(performanceId);
      return performanceDetailAllAdapter(data.result);
    },
    enabled: !!performanceId,
  });
};

// 공연 검색
/**
 * @param keyword 검색어
 * @returns 변환된 검색된 공연 목록
 */
export const useSearchPerformances = (keyword: string) => {
  return useQuery<ClientPerformance[], Error>({
    queryKey: PERFORMANCE_KEYS.search(keyword),
    queryFn: async () => {
      const serverData = await fetchPerformancesByKeyword(keyword);
      return performanceAdapter(serverData);
    },
    enabled: !!keyword,
  });
};
