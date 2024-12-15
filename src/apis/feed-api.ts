import { handleApiError } from "@/utils/api-error/error-handler";
import { ENDPOINTS } from "./end-points";
import { apiClient } from "./index";
import { AllFeedsResponse } from "@/types/feed/feed.type";

export const fetchAllFeedByLatest = async () => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.LATEST);
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchAllFeedByPopular = async () => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.POPULAR);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchAllFeedByMine = async () => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.MINE);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @returns 피드 상세 정보
 */
export const fetchFeedById = async (feedId: string) => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.DETAIL(feedId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param data - 피드 데이터
 * @returns 공연 상세 목록
 */
export const createFeed = async (data: FormData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.CREATE, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @param data - 피드 데이터
 * @returns 피드 정보
 */
export const updateFeed = async (params: { feedId: string; data: FormData }) => {
  try {
    const response = await apiClient.put(ENDPOINTS.FEED.UPDATE(params.feedId), params.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @returns
 */
export const deleteFeed = async (feedId: string) => {
  try {
    const response = await apiClient.delete(ENDPOINTS.FEED.DELETE(feedId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param data - 이미지 데이터
 * @returns 이미지 서버 URL
 */
export const saveImageFile = async (data: FormData) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.SAVE_IMAGE, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @returns 좋아요 정보
 */
export const likeFeed = async (feedId: string) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.LIKE(feedId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
