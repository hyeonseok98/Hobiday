import { CheckNicknameResponse } from "@/types/user";
import { apiClient } from ".";
import { ENDPOINTS } from "./end-points";
import { handleApiError } from "@/utils/api-error/error-handler";

/**
 * 닉네임 중복 확인 API
 * @param nickname - 중복 여부를 확인할 닉네임
 * @returns 중복 상태 메시지 (overlapping | non-overlapping)
 */
export const getCheckNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await apiClient.get<CheckNicknameResponse>(ENDPOINTS.PROFILES.NICKNAME_CHECK(nickname));
  return { ...response.data, result: response.data.result || {} };
};

// 내 프로필 조회
export const getMyProfile = async () => {
  const response = await apiClient.get(ENDPOINTS.PROFILES.PROFILE);
  return response.data.result;
};

// id로 프로필 조회
export const getProfileById = async (profileId: number) => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILES.GET.BY_ID(profileId));
    console.log(response);
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 팔로잉 조회
export const getFollowingById = async (profileId: number) => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILES.GET.FOLLOWING(profileId));
    console.log(response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 팔로워 조회
export const getFollowerById = async (profileId: number) => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILES.GET.FOLLOWERS(profileId));
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const userLogout = async () => {
  const response = await apiClient.delete(ENDPOINTS.USERS.LOGOUT);
  return response;
};

export const updateMyProfile = async (data: { [key: string]: string | string[] }) => {
  const response = await apiClient.put(ENDPOINTS.PROFILES.UPDATE, data);
  console.log("updateAPI", response.data);
  return response.data;
};

// 팔로우 토글
export const followToggle = async (targetProfileId: number) => {
  try {
    const response = await apiClient.post(ENDPOINTS.PROFILES.FOLLOW(targetProfileId));
    return response;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
