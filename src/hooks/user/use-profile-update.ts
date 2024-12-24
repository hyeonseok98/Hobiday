import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FOLLOW_KEYS, PROFILE_KEYS } from "../queries";
import { followToggle, getFollowerById, getFollowingById, getMyProfile, updateMyProfile } from "@/apis/user-api";
import { useUserStore } from "@/stores/useUserStore";
import React from "react";
import { FollowProfile } from "@/types/user";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: { [key: string]: string | string[] }) => {
      const response = await updateMyProfile(data);
      return response;
    },
    onMutate: async (data: { [key: string]: string | string[] }) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({
        queryKey: [...PROFILE_KEYS.updateMyProfile],
      });

      // 이전 데이터 백업
      const prevProfileData = queryClient.getQueryData([...PROFILE_KEYS.updateMyProfile]);

      // 낙관적 업데이트
      queryClient.setQueryData([...PROFILE_KEYS.updateMyProfile], (oldData: any) => {
        if (!oldData) return;

        return {
          ...oldData,
          ...data,
        };
      });

      // 전역 상태 업데이트
      const currentUser = useUserStore.getState().user;
      if (currentUser) {
        setUser({ ...currentUser, ...data });
      }
      return { prevProfileData };
    },

    // 에러 발생 시 롤백
    onError: (error, data, context) => {
      queryClient.setQueryData([...PROFILE_KEYS.updateMyProfile], context?.prevProfileData);
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [...PROFILE_KEYS.updateMyProfile],
      });
    },
  });
};

export const useGetMyProfile = () => {
  const setUser = useUserStore((state) => state.setUser);

  const queryResult = useQuery({
    queryKey: [PROFILE_KEYS.myProfile],
    queryFn: async () => {
      const data = await getMyProfile();
      return data;
    },
    select: (data) => data || null,
  });

  // 프로필 데이터 전역 상태에 저장
  const { data } = queryResult;

  React.useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return queryResult;
};

// 팔로잉/팔로우 토글
export function useFollowToggleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (targetProfileId: number) => {
      return followToggle(targetProfileId);
    },

    // 낙관적 업데이트
    onMutate: async (targetProfileId: number) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({ queryKey: [FOLLOW_KEYS.followingList] });
      await queryClient.cancelQueries({ queryKey: [PROFILE_KEYS.myProfile] });

      // 이전 데이터 백업
      const prevFollowList = queryClient.getQueryData<FollowProfile[]>([FOLLOW_KEYS.followingList]);
      const prevProfileData = queryClient.getQueryData([PROFILE_KEYS.myProfile]);

      // 팔로우 목록 캐시 수정
      queryClient.setQueryData<FollowProfile[]>([FOLLOW_KEYS.followingList], (oldList = []) =>
        oldList.map((user) => (user.profileId === targetProfileId ? { ...user, following: !user.following } : user)),
      );

      // 프로필 데이터 캐시 수정
      queryClient.setQueryData([PROFILE_KEYS.myProfile], (oldData: any) => {
        if (!oldData) return oldData;
        const isCurrentlyFollowing = prevFollowList?.some(
          (user) => user.profileId === targetProfileId && user.following,
        );
        return {
          ...oldData,
          followingCount: oldData.followingCount + (isCurrentlyFollowing ? -1 : 1),
        };
      });

      return { prevFollowList, prevProfileData };
    },

    // 에러 발생 시 롤백
    onError: (error, targetProfileId, context) => {
      // 팔로우 목록 롤백
      if (context?.prevFollowList) {
        queryClient.setQueryData([FOLLOW_KEYS.followingList], context.prevFollowList);
      }

      // 프로필 데이터 롤백
      if (context?.prevProfileData) {
        queryClient.setQueryData([PROFILE_KEYS.myProfile], context.prevProfileData);
      }
    },

    // 성공/실패 상관없이 최종 무효화를 통해 서버와 동기화
    onSettled: (data, error, targetProfileId) => {
      // 팔로우 목록 최종 무효화
      queryClient.invalidateQueries({ queryKey: [FOLLOW_KEYS.followingList] });

      // 프로필 데이터 최종 무효화
      queryClient.invalidateQueries({ queryKey: [PROFILE_KEYS.myProfile, targetProfileId] });
    },
  });
}

export function useFollowingList(profileId: number) {
  return useQuery<FollowProfile[]>({
    queryKey: [FOLLOW_KEYS.followingList, profileId],
    queryFn: () => getFollowingById(profileId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFollowerList(profileId: number) {
  return useQuery<FollowProfile[]>({
    queryKey: [FOLLOW_KEYS.followerList, profileId],
    queryFn: () => getFollowerById(profileId),
    staleTime: 1000 * 60 * 5,
  });
}
