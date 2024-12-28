"use client";

import LoadingSpinner from "@/components/commons/spinner";
import { useUserStore } from "@/stores/useUserStore";
import Link from "next/link";
import { useEffect, useState } from "react";
import NoFeedSection from "./no-feed";
import ProfileFeed from "./profile-feed";
import ProfileGenres from "./profile-genres";
import ProfileImage from "./profile-image";
import ProfileName from "./profile-name";
import ProfileStats from "./profile-stats";
import { FeedThumbnail } from "@/types/feed";
import { useGetMyProfile } from "@/hooks/user/use-profile-update";
import { useAllFeedsByProfileIdQuery } from "@/hooks/feed/use-feed-query";

export default function MyProfilePage() {
  const user = useUserStore((state) => state.user);
  const [myFeed, setMyFeed] = useState<FeedThumbnail[]>([]);

  const { data: getMyProfile, isPending: isGetMyProfileLoading, isError: isGetMyProfileError } = useGetMyProfile();

  const {
    data: getAllFeedById,
    isPending: isGetAllFeedByIdLoading,
    isError: isGetAllFeedByIdError,
  } = useAllFeedsByProfileIdQuery(getMyProfile?.profileId);

  useEffect(() => {
    if (getAllFeedById) {
      const thumbnailData = getAllFeedById.map((feed) => ({
        feedId: feed.feedId,
        imageUrl: feed.feedFiles[0],
      }));
      setMyFeed(thumbnailData);
    }
  }, [getAllFeedById]);

  if (isGetMyProfileLoading || isGetAllFeedByIdLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  return (
    <div className="bg-flat min-h-screen flex flex-col items-center">
      <div className="bg-white w-full p-4 shadow-md">
        <ProfileImage profileImageUrl={user.profileImageUrl} />
        <ProfileName profileNickname={user.profileNickname} profileIntroduction={user.profileIntroduction} />
        <ProfileGenres profileGenres={user.profileGenres} />
        <ProfileStats
          postCount={user.totalFeedCount}
          followerCount={user.followerCount}
          followingCount={user.followingCount}
        />

        {/* 버튼 */}
        <div className="flex gap-4 justify-center">
          <Link
            href="my/edit"
            className="px-4 py-2 w-48 text-center border border-gray-300 text-sm text-gray-700 rounded-lg"
          >
            프로필 편집하기
          </Link>
          <Link
            href="feed/upload"
            className="px-4 py-2 w-48 text-center bg-blue-500 text-sm text-white rounded-lg bg-gradient-to-br from-secondary to-primary to-80%"
          >
            글쓰기
          </Link>
        </div>
      </div>

      {/* 하단 섹션 */}
      {myFeed.length === 0 ? <NoFeedSection /> : <ProfileFeed myFeeds={myFeed} />}
    </div>
  );
}
