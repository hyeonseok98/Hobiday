import { postProfileRegistration } from "@/apis/onboarding-api";
import { getCheckNickname } from "@/apis/user-api";
import { PostProfileRegistrationRequest, ProfileRegistrationResponse } from "@/types/onboarding";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PROFILE_KEYS, USER_KEYS } from "../queries";

export const useProfileRegistration = () => {
  return useMutation<ProfileRegistrationResponse, Error, PostProfileRegistrationRequest>({
    mutationKey: [PROFILE_KEYS.PROFILE_REGISTRATION],
    mutationFn: postProfileRegistration,
  });
};

export const useCheckNickname = (nickname: string) => {
  return useQuery({
    queryKey: [USER_KEYS.CHECK_NICKNAME, nickname],
    queryFn: () => {
      if (!nickname) return Promise.resolve(null); // 빈 값이면 API 호출 막기
      return getCheckNickname(nickname);
    },
    enabled: nickname.trim().length > 0, // 공백을 제거하고 조건 확인
  });
};
