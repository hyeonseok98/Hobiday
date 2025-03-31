import { createFeed, updateFeed } from "@/apis/feed-api";
import { UploadFeed } from "./../../types/feed/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FEED_KEYS } from "../queries";

export const useFeedRegistrationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data }: { data: UploadFeed }) => {
      return createFeed({ data });
    },

    onMutate: async (payload) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({ queryKey: [...FEED_KEYS.all] });

      // 이전 데이터 백업
      const prevFeedData = queryClient.getQueryData<UploadFeed[]>([...FEED_KEYS.all]);

      // 낙관적 업데이트
      if (prevFeedData) {
        queryClient.setQueryData<UploadFeed[]>([...FEED_KEYS.all], [...prevFeedData, payload.data]);
      }

      return { prevFeedData };
    },

    // 에러 발생 시 롤백
    onError: (error, payload, context) => {
      if (context?.prevFeedData) {
        queryClient.setQueryData<UploadFeed[]>([...FEED_KEYS.all], context.prevFeedData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: FEED_KEYS.all });
    },
  });
};

export const useFeedUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { feedId: number; data: UploadFeed }) => {
      const response = await updateFeed(params);
      return response;
    },
    onMutate: async ({ feedId, data }) => {
      // 기존 쿼리 취소 → 낙관적 업데이트 충돌 방지
      await queryClient.cancelQueries({ queryKey: [...FEED_KEYS.all] });

      // 이전 데이터 백업
      const prevFeedData = queryClient.getQueryData<UploadFeed[]>([...FEED_KEYS.all]);

      // 낙관적 업데이트
      if (prevFeedData) {
        queryClient.setQueryData<UploadFeed[]>([...FEED_KEYS.all], (prevFeedData) =>
          prevFeedData?.map((feed) => (feedId === feedId ? { ...feed, ...data } : feed)),
        );
      }

      return { prevFeedData };
    },

    // 에러 발생 시 롤백
    onError: (error, { feedId }, context) => {
      if (context?.prevFeedData) {
        queryClient.setQueryData<UploadFeed[]>([...FEED_KEYS.all], context.prevFeedData);
      }
    },

    onSettled: (data, error, { feedId }) => {
      queryClient.invalidateQueries({ queryKey: [...FEED_KEYS.all] });
    },
  });
};
