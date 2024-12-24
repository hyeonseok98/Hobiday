import { useQuery } from "@tanstack/react-query";
import { feedKeys } from "../queries/feed-keys";
import {
  fetchAllFeedById,
  fetchAllFeedByLatest,
  fetchAllFeedByPerformId,
  fetchAllFeedByPopular,
} from "@/apis/feed-api";
import { FEED_KEYS } from "../queries";
import { Feed, FeedData } from "@/types/feed";
import { AllFeeds } from "@/types/feed/feed.type";

// 최신순 피드 조회
export const useLatestFeedsQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: feedKeys.latest(),
    queryFn: async () => {
      const data = await fetchAllFeedByLatest();
      return data;
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
      return data;
    },
    enabled,
    select: (data) => data || [],
  });
};

// 사용자 Id로 작성된 모든 피드 조회
export const useAllFeedsByProfileIdQuery = (profileId: number) => {
  return useQuery({
    queryKey: FEED_KEYS.byProfileId(profileId),
    queryFn: async () => {
      const data: FeedData[] = await fetchAllFeedById(profileId);
      return data;
    },
    enabled: !!profileId,
    select: (data) => data || [],
  });
};

// 공연명으로 작성된 모든 피드 조회
export const useAllFeedsByPerformIdQuery = (performId: string) => {
  return useQuery<AllFeeds[]>({
    queryKey: FEED_KEYS.byPerformId(performId),
    queryFn: async () => {
      const data: AllFeeds[] = await fetchAllFeedByPerformId(performId);
      return data;
    },
    enabled: !!performId,
    select: (data) => data || [],
  });
};
