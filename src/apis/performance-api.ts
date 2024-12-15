import {
  AllPerformancesResponse,
  PerformancesByGenreResponse,
  PerformancesDetailResponse,
} from "@/types/performance/performance.type";
import { handleApiError } from "@/utils/api-error/error-handler";
import { ENDPOINTS } from "./end-points";
import { apiClient } from "./index";

/**
 * @param params.rowStart - 불러올 데이터의 시작 인덱스
 * @param params.rowEnd - 불러올 데이터의 끝 인덱스
 * @returns 전체 공연 데이터
 */
export const fetchAllPerformances = async (params: { rowStart: string; rowEnd: string }) => {
  try {
    const response = await apiClient.get<AllPerformancesResponse>(ENDPOINTS.PERFORMANCES.GET_ALL, { params });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param params.rowStart - 불러올 데이터의 시작 인덱스
 * @param params.rowEnd - 불러올 데이터의 끝 인덱스
 * @param params.genre - 불러올 데이터의 장르
 * @returns 장르별 공연 목록
 */
export const fetchPerformancesByGenre = async (params: { rowStart: string; rowEnd: string; genre: string }) => {
  try {
    const response = await apiClient.get<PerformancesByGenreResponse>(ENDPOINTS.PERFORMANCES.GENRE, { params });
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param performanceId 공연 ID
 * @returns 공연 상세 목록
 */
export const fetchPerformanceById = async (performanceId: string) => {
  try {
    const response = await apiClient.get<PerformancesDetailResponse>(ENDPOINTS.PERFORMANCES.GET_BY_ID(performanceId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};