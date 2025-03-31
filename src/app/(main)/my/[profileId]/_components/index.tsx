"use client";

import LoadingSpinner from "@/components/commons/spinner";
import { useAllFeedsByProfileIdQuery } from "@/hooks/feed/use-feed-query";
import { useFollowingList, useFollowToggleMutation, useGetProfileById } from "@/hooks/user/use-profile-update";
import { useUserStore } from "@/stores";
import { FeedThumbnail } from "@/types/feed";
import { useEffect, useState } from "react";
import ProfileFeed from "../../_components/profile-feed";
import ProfileGenres from "../../_components/profile-genres";
import ProfileImage from "../../_components/profile-image";
import ProfileName from "../../_components/profile-name";
import ProfileStats from "../../_components/profile-stats";

export interface Profile {
  profileId: number;
  memberId: number;
  profileNickname: string;
  profileEmail: string;
  profileGenres: string[];
  profileIntroduction: string;
  profileImageUrl: string;
  totalFeedCount: number;
  followerCount: number;
  followingCount: number;
}

interface FeedData {
  feedId: number;
  feedFiles: string[];
}

export default function ProfileIdInfo({ profileId: profileId }: { profileId: number }) {
  const user = useUserStore((state) => state.user);
  const [userInfo, setUserInfo] = useState<Profile>();
  const [userFeed, setUserFeed] = useState<FeedThumbnail[]>([]);

  const followMutation = useFollowToggleMutation();
  const { data: followingList = [] } = useFollowingList(user?.profileId || 0);

  const isFollowing = followingList.some((profile) => profile.profileId === profileId && profile.following);

  async function handleFollowToggle() {
    if (!user || followMutation.isPending) return;
    followMutation.mutate(profileId);
  }

  const {
    data: getProfileById,
    isPending: isGetProfileByIdLoading,
    isError: isGetProfileByIdError,
  } = useGetProfileById(profileId);

  const {
    data: getAllFeedById,
    isPending: isGetAllFeedByIdLoading,
    isError: isGetAllFeedByIdError,
  } = useAllFeedsByProfileIdQuery(getProfileById?.profileId);

  useEffect(() => {
    if (getProfileById) {
      setUserInfo(getProfileById);
    }

    if (getAllFeedById) {
      const thumbnailData = getAllFeedById.map((feed) => ({
        feedId: feed.feedId,
        imageUrl: feed.feedFiles[0],
      }));
      setUserFeed(thumbnailData);
    }
  }, [getProfileById, getAllFeedById]);

  if (!userInfo)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={60} />
      </div>
    );

  return (
    <div className="bg-flat min-h-screen flex flex-col items-center">
      <div className="bg-white w-full px-4 shadow-md">
        <ProfileImage profileImageUrl={userInfo.profileImageUrl} />
        <ProfileName profileNickname={userInfo.profileNickname} profileIntroduction={userInfo.profileIntroduction} />
        <ProfileGenres profileGenres={userInfo.profileGenres} />
        <ProfileStats
          postCount={userInfo.totalFeedCount}
          followerCount={userInfo.followerCount}
          followingCount={userInfo.followingCount}
        />

        {/* 버튼 */}
        <div className="flex items-center justify-center w-full py-4">
          <button
            className={`text-lg w-[398px] h-[40px] rounded-md
              bg-gradient-to-r from-secondary to-primary to-80% text-white ${
                followMutation.isPending ? "cursor-not-allowed" : ""
              }`}
            onClick={handleFollowToggle}
            disabled={followMutation.isPending} // 로딩 중 버튼 비활성화
          >
            {followMutation.isPending ? "처리 중..." : isFollowing ? "팔로잉" : "팔로우"}
          </button>
        </div>
      </div>

      {/* 하단 섹션 */}
      {userFeed.length === 0 ? <></> : <ProfileFeed myFeeds={userFeed} />}
    </div>
  );
}
