"use client";

import { getFollowingById } from "@/apis/user-api";
import UserFollowCard from "@/components/follow";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";

interface UserData {
  profileId: number;
  profileNickName: string;
  // profileIntroduction: string | null;
  profileImageUrl: string | null;
  isFollowing: boolean;
}

export default function FollowerList() {
  const { user } = useUserStore();
  const [followingList, setFollowingList] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchFollowing() {
      if (!user) return;
      try {
        const data: UserData[] = await getFollowingById(user.profileId);
        console.log("follower List", data);
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
          isFollowing={user.isFollowing}
          onFollowToggle={() => console.log("Follow Toggle")}
        />
      ))}
    </div>
  );
}
