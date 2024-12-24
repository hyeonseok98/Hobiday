"use client";

import { useUserStore } from "@/stores/useUserStore";
import { AllFeeds } from "@/types/feed/feed.type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FeedMenuModal from "../modal/feed-menu";
import { useFollowingList, useFollowToggleMutation } from "@/hooks/user/use-profile-update";

type ProfileProps = {
  feed: AllFeeds;
};

export default function FeedProfile({ feed }: ProfileProps) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isMe = user ? user.profileId === feed.profileId : false;

  const followMutation = useFollowToggleMutation();
  const { data: followingList = [] } = useFollowingList(user?.profileId || 0);

  const isFollowing = followingList.some((profile) => profile.profileId === feed.profileId && profile.following);

  async function handleFollowToggle() {
    if (!user || followMutation.isPending) return;
    followMutation.mutate(feed.profileId);
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
          className="rounded-full w-10 h-10 object-cover"
          unoptimized
        />
        <div className="font-semibold mx-2">{feed.profileName}</div>
      </div>

      {isMe ? (
        <FeedMenuModal feed={feed} />
      ) : (
        <button
          className={`text-sm font-semibold hover:underline mr-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent ${
            followMutation.isPending ? "cursor-not-allowed" : ""
          }`}
          onClick={handleFollowToggle}
          disabled={followMutation.isPending} // 로딩 중 버튼 비활성화
        >
          {followMutation.isPending ? "처리 중..." : isFollowing ? "팔로잉" : "팔로우"}
        </button>
      )}
    </div>
  );
}
