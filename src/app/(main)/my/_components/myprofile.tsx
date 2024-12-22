"use client";

import { getMyProfile } from "@/apis/user-api";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileImage from "./profile-image";
import ProfileName from "./profile-name";
import ProfileGenres from "./profile-genres";
import ProfileStats from "./profile-stats";
import LoadingSpinner from "@/components/commons/spinner";
import NoFeedSection from "./no-feed";
import Link from "next/link";
import ProfileFeed from "./profile-feed";
import { fetchAllFeedById } from "@/apis/feed-api";

interface FeedData {
  feedId: number;
  feedFiles: string[];
}

interface FeedThumbnail {
  feedId: number;
  imageUrl: string; // 첫 번째 사진만 사용
}

export default function MyProfilePage() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [myFeed, setMyFeed] = useState<FeedThumbnail[]>([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await getMyProfile();
        console.log("data: ", data);
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserFeed = async () => {
      if (!user) return;
      try {
        const feedData: FeedData[] = await fetchAllFeedById(user.profileId);
        console.log("feedData: ", feedData);

        // 피드 데이터에서 썸네일 데이터만 추출
        const thumbnailData = feedData.map((feed) => ({
          feedId: feed.feedId,
          imageUrl: feed.feedFiles[0],
        }));
        setMyFeed(thumbnailData);
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
    getUserFeed();
  }, [setUser]);

  if (!user) {
    return (
      <div>
        <LoadingSpinner />
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
