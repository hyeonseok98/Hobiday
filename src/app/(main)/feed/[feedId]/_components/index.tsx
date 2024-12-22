"use client";

import { fetchFeedById } from "@/apis/feed-api";
import FeedItem from "@/components/feed/item";
import { useUserStore } from "@/stores/useUserStore";
import { AllFeeds } from "@/types/feed/feed.type";
import { useEffect, useState } from "react";

export default function FeedIdComponent({ feedId: feedId }: { feedId: number }) {
  const [feedData, setFeedData] = useState<AllFeeds | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchFeedData = async () => {
      if (!user) return;
      try {
        const data = await fetchFeedById(feedId);
        setFeedData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedData();
  }, [feedId]);

  return (
    <>
      {feedData && (
        <FeedItem key={feedData.feedId} className="w-full">
          <FeedItem.Profile feed={feedData} />
          <FeedItem.Image feedFiles={feedData.feedFiles} />
          <FeedItem.Content contents={feedData.contents} />
          <FeedItem.HashTags hashTag={feedData.hashTag} />
          <FeedItem.Actions
            feedId={feedData.feedId}
            likeCount={feedData.likeCount}
            commentCount={feedData.commentCount}
            liked={feedData.liked}
          />
        </FeedItem>
      )}
    </>
  );
}
