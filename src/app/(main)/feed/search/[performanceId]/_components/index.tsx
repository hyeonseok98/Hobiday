"use client";

import LikeGradientPressed from "@/assets/svgr-icons/like-gradient-pressed";
import Icon from "@/components/commons/icons";
import LoadingSpinner from "@/components/commons/spinner";
import FeedItem from "@/components/feed/item";
import { useAllFeedsByPerformIdQuery } from "@/hooks/feed/use-feed-query";
import { useParams } from "next/navigation";

export default function PerformSearchFeed() {
  const params = useParams();
  let performId = params.performanceId;

  if (Array.isArray(performId)) {
    performId = performId[0];
  }

  const { data: feeds, isLoading, isError } = useAllFeedsByPerformIdQuery(performId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-content">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    return <div className="flex justify-center items-center h-content">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  return (
    <div>
      {feeds && feeds.length > 0 ? (
        <>
          {feeds.map((feed) => (
            <FeedItem key={feed.feedId} className="w-full">
              <FeedItem.Profile feed={feed} />
              <FeedItem.Image feedFiles={feed.feedFiles} />
              <FeedItem.Content contents={feed.contents} />
              <FeedItem.HashTags hashTag={feed.hashTag} />
              <FeedItem.Actions
                feedId={feed.feedId}
                likeCount={feed.likeCount}
                commentCount={feed.commentCount}
                liked={feed.liked}
              />
            </FeedItem>
          ))}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-content text-gray-600 gap-4">
          <Icon size={60}>
            <LikeGradientPressed width={60} height={60} />
          </Icon>
          <p>피드가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
