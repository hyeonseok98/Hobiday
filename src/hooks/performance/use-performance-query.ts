import { PaginationProps } from "@/types/commons/pagination";
import { performanceAdapter, performanceDetailsAdapter } from "@/types/performance/adapter";
import { PerformancesByGenreQueryProps } from "@/types/performance/performance-queries";
import { useQuery } from "@tanstack/react-query";
import { fetchAllPerformances, fetchPerformanceById, fetchPerformancesByGenre } from "../../apis/performance-api";
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

export const usePerformanceDetailQuery = (performanceId: string) => {
  return useQuery({
    queryKey: PERFORMANCE_KEYS.details(performanceId),
    queryFn: async () => {
      const data = await fetchPerformanceById(performanceId);
      return performanceDetailsAdapter(data.result);
    },
    enabled: !!performanceId,
    select: (data) => data || null,
  });
};
