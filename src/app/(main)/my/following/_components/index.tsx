"use client";

import LoadingSpinner from "@/components/commons/spinner";
import UserFollowCard from "@/components/follow";
import { useFollowingList } from "@/hooks/user/use-profile-update";
import { useUserStore } from "@/stores/useUserStore";

interface FollowingUser {
  profileId: number;
  profileNickName: string;
  profileIntroduction: string | null;
  profileImageUrl: string;
  following: boolean;
}

export default function FollowingList() {
  const user = useUserStore((state) => state.user);
  const currentUserProfileId = user?.profileId;
  const profileId = currentUserProfileId ?? 0;
  const { data: followingList = [], isLoading, isError } = useFollowingList(profileId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  return (
    <div className="border-t border-t-gray-100">
      {followingList.map((user) => (
        <UserFollowCard
          key={user.profileId}
          profileId={user.profileId}
          profileImageUrl={user.profileImageUrl}
          profileNickname={user.profileNickName}
          profileIntroduction={user.profileIntroduction}
          isFollowing={user.following}
          onFollowToggle={() => console.log("Follow Toggle")}
        />
      ))}
    </div>
  );
}
