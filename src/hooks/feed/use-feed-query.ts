import { useQuery } from "@tanstack/react-query";
import { feedKeys } from "../queries/feed-keys";
import { fetchAllFeedByLatest, fetchAllFeedByPopular } from "@/apis/feed-api";

// 최신순 피드 조회
export const useLatestFeedsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: feedKeys.latest(),
    queryFn: async () => {
      const data = await fetchAllFeedByLatest();
      return data.result;
    },
    enabled,
    select: (data) => data || [],
  });
};

// 인기순 피드 조회
export const usePopularFeedsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: feedKeys.popular(),
    queryFn: async () => {
      const data = await fetchAllFeedByPopular();
      return data.result;
    },
    enabled,
    select: (data) => data || [],
  });
};
