"use client";

import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import UserFollowCard from "@/components/follow";
import { useFollowerList, useFollowToggleMutation } from "@/hooks/user/use-profile-update";
import { useUserStore } from "@/stores";
import { useState } from "react";

interface UserData {
  profileId: number;
  profileNickName: string;
  profileIntroduction: string | null;
  profileImageUrl: string | null;
  following: boolean;
}

export default function FollowerList() {
  const user = useUserStore((state) => state.user);
  const currentUserProfileId = user?.profileId;
  const profileId = currentUserProfileId ?? 0;
  const followToggleMutation = useFollowToggleMutation();
  const { data: followerList = [], isLoading, isError } = useFollowerList(profileId);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  const handleFollowToggle = (targetProfileId: number) => {
    followToggleMutation.mutate(targetProfileId);
  };

  return (
    <div className="border-t border-t-gray-100">
      {followerList.map((user) => (
        <UserFollowCard
          key={user.profileId}
          profileId={user.profileId}
          profileImageUrl={user.profileImageUrl}
          profileNickname={user.profileNickName}
          profileIntroduction={user.profileIntroduction}
          isFollowing={user.following}
          onFollowToggle={handleFollowToggle}
        />
      ))}

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
