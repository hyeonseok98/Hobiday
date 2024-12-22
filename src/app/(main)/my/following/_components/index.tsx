"use client";

import { getFollowingById } from "@/apis/user-api";
import UserFollowCard from "@/components/follow";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

interface FollowingUser {
  profileId: number;
  profileNickName: string;
  profileImageUrl: string;
  following: boolean;
}

export default function FollowingList() {
  const { user } = useUserStore();
  const [followingList, setFollowingList] = useState<FollowingUser[]>([]);

  useEffect(() => {
    async function fetchFollowing() {
      if (!user) return;
      try {
        const data: FollowingUser[] = await getFollowingById(user.profileId);
        console.log("followingList: ", data);
        setFollowingList(data);
      } catch (error) {
        console.error("Failed to fetch following list", error);
      }
    }

    if (user?.profileId) {
      fetchFollowing();
    }
  }, [user]);

  return (
    <div className="border-t border-t-gray-100">
      {followingList.map((user) => (
        <UserFollowCard
          key={user.profileId}
          profileId={user.profileId}
          profileImageUrl={user.profileImageUrl}
          profileNickname={user.profileNickName}
          // profileIntroduction={user.profileIntroduction}
          isFollowing={user.following}
          onFollowToggle={() => console.log("Follow Toggle")}
        />
      ))}
    </div>
  );
}
