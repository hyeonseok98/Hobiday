import { CheckNicknameResponse, FollowProfile } from "@/types/user";
import { handleApiError } from "@/utils/api-error/error-handler";
import { removeAuthTokens } from "@/utils/remove-auth-token";
import { apiClient } from ".";
import { ENDPOINTS } from "./end-points";

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
export const getFollowingById = async (profileId: number): Promise<FollowProfile[]> => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILES.GET.FOLLOWING(profileId));
    console.log("following: ", response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 팔로워 조회
export const getFollowerById = async (profileId: number): Promise<FollowProfile[]> => {
  try {
    const response = await apiClient.get(ENDPOINTS.PROFILES.GET.FOLLOWERS(profileId));
    console.log("follower: ", response.data.result);
    return response.data.result;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// 로그아웃
export const userLogout = async () => {
  try {
    const response = await apiClient.delete(ENDPOINTS.USERS.LOGOUT);
    removeAuthTokens();
    return response.data;
  } catch (error) {
    throw new Error("로그아웃에 실패했습니다.");
  }
};

// 회원탈퇴
export const userSignOut = async (memberId: number) => {
  try {
    const { data } = await apiClient.delete(ENDPOINTS.USERS.SIGNOUT(memberId));
    removeAuthTokens();
    return data;
  } catch (error) {
    throw new Error("회원탈퇴에 실패했습니다.");
  }
};

// 프로필 수정
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
