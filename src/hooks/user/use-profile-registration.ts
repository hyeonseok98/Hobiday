import { postProfileRegistration } from "@/apis/onboarding-api";
import { getCheckNickname } from "@/apis/user-api";
import { PostProfileRegistrationRequest, ProfileRegistrationResponse } from "@/types/onboarding";
import { CheckNickname } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PROFILE_KEYS, USER_KEYS } from "../queries";

export const useProfileRegistration = () => {
  return useMutation<ProfileRegistrationResponse, Error, PostProfileRegistrationRequest>({
    mutationKey: [PROFILE_KEYS.PROFILE_REGISTRATION],
    mutationFn: postProfileRegistration,
  });
};

export const useCheckNickname = (nickname: string) => {
  return useQuery<CheckNickname | null>({
    queryKey: [USER_KEYS.CHECK_NICKNAME, nickname],
    queryFn: async () => {
      if (!nickname.trim()) {
        return null;
      }
      const data = await getCheckNickname(nickname);
      return data.result || null;
    },
    enabled: nickname.trim().length > 0,
  });
};
