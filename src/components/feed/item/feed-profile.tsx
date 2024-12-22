"use client";

import Image from "next/image";
import FeedMenuModal from "../modal/feed-menu";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import { AllFeeds } from "@/types/feed/feed.type";
import { followToggle, getFollowingById } from "@/apis/user-api";
import { useRouter } from "next/navigation";

type ProfileProps = {
  feed: AllFeeds;
};

export default function FeedProfile({ feed }: ProfileProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isMe = user ? user.profileId === feed.profileId : false;
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!user || isMe) return;
      try {
        setLoading(true);
        const followingList = await getFollowingById(user.profileId);
        setIsFollowing(followingList.includes(feed.profileId));
      } catch (error) {
        console.error("Failed to fetch following status:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingStatus();
  }, [user, feed.profileId, isMe]);

  async function handleFollowToggle() {
    if (!user || loading) return;

    try {
      setLoading(true);
      await followToggle(feed.profileId);
      console.log("follow toggle success");
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setLoading(false);
    }
  }

  function navigateToProfile() {
    router.push(`/my/${feed.profileId}`);
  }

  return (
    <div className="flex items-center justify-between mx-4 my-2">
      <div className="flex items-center cursor-pointer" onClick={navigateToProfile}>
        <Image
          src={feed.profileImageUrl || "https://via.placeholder.com/40"}
          alt={`${feed.profileName} profile`}
          width={40}
          height={40}
          className="rounded-full w-10 h-10"
          unoptimized
        />
        <div className="font-semibold mx-2">{feed.profileName}</div>
      </div>

      {isMe ? (
        <FeedMenuModal feed={feed} />
      ) : (
        <button
          className={`text-sm font-semibold hover:underline mr-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent ${
            loading ? "cursor-not-allowed" : ""
          }`}
          onClick={handleFollowToggle}
          disabled={loading} // 로딩 중 버튼 비활성화
        >
          {loading ? "처리 중..." : isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
}
