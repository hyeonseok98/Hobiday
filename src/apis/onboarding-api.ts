import { PostProfileRegistrationRequest, ProfileRegistrationResponse } from "@/types/onboarding";
import { handleApiError } from "@/utils/api-error/error-handler";
import { apiClient } from ".";
import { ENDPOINTS } from "./end-points";

/**
 * 프로필 등록 (온보딩 완료)
 * @param params - 프로필 등록에 필요한 데이터
 * @returns 등록된 프로필 정보
 */
export const postProfileRegistration = async (
  params: PostProfileRegistrationRequest,
): Promise<ProfileRegistrationResponse> => {
  console.log("요청 데이터:", params);
  try {
    const response = await apiClient.post<ProfileRegistrationResponse>(ENDPOINTS.PROFILES.REGISTRATION, params);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
