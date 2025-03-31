import { AllFeedsResponse } from "@/types/feed/feed.type";
import { handleApiError } from "@/utils/api-error";
import { ENDPOINTS } from "./end-points";
import { apiClient } from "./index";
import { UploadFeed } from "@/types/feed";
import axios from "axios";

// 최신순 정렬
export const fetchAllFeedByLatest = async () => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.LATEST);
    console.log(response.data);

    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 인기순 정렬
export const fetchAllFeedByPopular = async () => {
  try {
    const response = await apiClient.get<AllFeedsResponse>(ENDPOINTS.FEED.GET.POPULAR);
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 사용자 Id로 작성된 모든 피드 조회
export const fetchAllFeedById = async (profileId: number) => {
  try {
    const response = await apiClient.get(ENDPOINTS.FEED.GET.BY_ID(profileId));
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 공연명으로 작성된 모든 피드 조회
export const fetchAllFeedByPerformId = async (performId: string) => {
  try {
    const response = await apiClient.get(ENDPOINTS.FEED.GET.BY_PERFORM_ID(performId));
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param profileId - 프로필 ID
 * @param feedId - 피드 ID
 * @returns 개별 피드 조회
 */
export const fetchFeedById = async (feedId: number) => {
  try {
    const response = await apiClient.get(ENDPOINTS.FEED.GET.DETAIL(feedId));
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param params.data - 피드 데이터
 * @returns 피드 작성
 */
export const createFeed = async (params: { data: UploadFeed }) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.CREATE, params.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @param data - 피드 데이터
 * @returns 피드 수정
 */
export const updateFeed = async (params: { feedId: number; data: UploadFeed }) => {
  try {
    const response = await apiClient.patch(ENDPOINTS.FEED.UPDATE(params.feedId), params.data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @returns 피드 삭제
 */
export const deleteFeed = async (feedId: number) => {
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
export const saveImageFile = async (data: { prefix: string; fileName: string }) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.SAVE_IMAGE, data);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * Presigned URL을 이용해 파일을 업로드하는 함수
 * @param url - Presigned URL
 * @param file - 업로드할 파일
 */
export const uploadFileToPresignedUrl = async (url: string, file: File) => {
  try {
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

/**
 * @param feedId - 피드 ID
 * @returns 좋아요 정보
 */
export const likeFeed = async (feedId: number) => {
  try {
    const response = await apiClient.post(ENDPOINTS.FEED.LIKE(feedId));
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
