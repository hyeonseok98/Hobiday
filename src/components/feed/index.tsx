"use client";

import Button from "@/components/commons/button";
import FeedItem from "@/components/feed/item";
import { useLatestFeedsQuery, usePopularFeedsQuery } from "@/hooks/feed/use-feed-query";
import { useState } from "react";
import LoadingSpinner from "../commons/spinner";
import Toast from "../commons/toast";

export default function FeedPageList() {
  const [filter, setFilter] = useState("latest");
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  const {
    data: latestFeeds,
    isLoading: isLatestLoading,
    isError: isLatestError,
  } = useLatestFeedsQuery(filter === "latest");
  const {
    data: popularFeeds,
    isLoading: isPopularLoading,
    isError: isPopularError,
  } = usePopularFeedsQuery(filter === "popular");

  const feedData = filter === "latest" ? latestFeeds : popularFeeds;
  const isPending = filter === "latest" ? isLatestLoading : isPopularLoading;
  const isError = filter === "latest" ? isLatestError : isPopularError;

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "피드를 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다.</div>;
  }

  function handleFilterChange(newFilter: string) {
    setFilter(newFilter);
  }

  return (
    <>
      <div className="bg-blue-50 w-full overflow-y-hidden">
        <div className="flex justify-start items-center gap-2 pl-4 bg-white">
          <Button
            variant="primary"
            size="md"
            onClick={() => handleFilterChange("latest")}
            className={`px-3 py-[6px] ${
              filter === "latest"
                ? "bg-blue-300 border border-opacity-0 hover:bg-blue-300 active:bg-blue-300"
                : "bg-white text-gray-700 border hover:bg-white active:bg-white"
            }`}
          >
            최신순
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleFilterChange("popular")}
            className={`px-3 py-[6px] ${
              filter === "popular"
                ? "bg-blue-300 border border-opacity-0 hover:bg-blue-300 active:bg-blue-300"
                : "bg-white text-gray-700 border hover:bg-white active:bg-white"
            }`}
          >
            인기순
          </Button>
        </div>

        {feedData?.map((feed) => (
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
      </div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
