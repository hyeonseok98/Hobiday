import { CheckNicknameResponse } from "@/types/user";
import { apiClient } from ".";
import { ENDPOINTS } from "./end-points";

/**
 * 닉네임 중복 확인 API
 * @param nickname - 중복 여부를 확인할 닉네임
 * @returns 중복 상태 메시지 (overlapping | non-overlapping)
 */
export const getCheckNickname = async (nickname: string): Promise<CheckNicknameResponse> => {
  const response = await apiClient.get<CheckNicknameResponse>(ENDPOINTS.USERS.NICKNAME_CHECK(nickname));
  return response.data;
};
