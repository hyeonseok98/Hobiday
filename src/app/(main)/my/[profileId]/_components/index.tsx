"use client";

import { fetchAllFeedById, fetchFeedById } from "@/apis/feed-api";
import { getProfileById } from "@/apis/user-api";
import React, { useEffect, useState } from "react";
import ProfileImage from "../../_components/profile-image";
import ProfileName from "../../_components/profile-name";
import ProfileGenres from "../../_components/profile-genres";
import ProfileStats from "../../_components/profile-stats";
import LoadingSpinner from "@/components/commons/spinner";
import ProfileFeed from "../../_components/profile-feed";

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

interface FeedThumbnail {
  feedId: number;
  imageUrl: string; // 첫 번째 사진만 사용
}

export default function ProfileIdInfo({ profileId: profileId }: { profileId: number }) {
  const [userInfo, setUserInfo] = useState<Profile>();
  const [userFeed, setUserFeed] = useState<FeedThumbnail[]>([]);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await getProfileById(profileId);
        console.log("profiledata: ", data);
        setUserInfo(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getUserFeed = async () => {
      try {
        const feedData: FeedData[] = await fetchAllFeedById(profileId);

        const thumbnailData = feedData.map((feed) => ({
          feedId: feed.feedId,
          imageUrl: feed.feedFiles[0],
        }));
        setUserFeed(thumbnailData);
      } catch (error) {
        console.log(error);
      }
    };

    getUserProfile();
    getUserFeed();
  }, [setUserInfo]);

  if (!userInfo)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  return (
    <div className="bg-flat min-h-screen flex flex-col items-center">
      <div className="bg-white w-full p-4 shadow-md">
        <ProfileImage profileImageUrl={userInfo.profileImageUrl} />
        <ProfileName profileNickname={userInfo.profileNickname} profileIntroduction={userInfo.profileIntroduction} />
        <ProfileGenres profileGenres={userInfo.profileGenres} />
        <ProfileStats
          postCount={userInfo.totalFeedCount}
          followerCount={userInfo.followerCount}
          followingCount={userInfo.followingCount}
        />

        {/* 버튼 */}
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary">팔로우</button>
        </div>
      </div>

      {/* 하단 섹션 */}
      {userFeed.length === 0 ? <></> : <ProfileFeed myFeeds={userFeed} />}
    </div>
  );
}
