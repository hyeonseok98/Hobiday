import { useRouter } from "next/navigation";

interface ProfileStatsProps {
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export default function ProfileStats({ postCount, followerCount, followingCount }: ProfileStatsProps) {
  const router = useRouter();

  function handleFollowersClick() {
    router.push("/my/followers");
  }

  function handleFollowingClick() {
    router.push("/my/following");
  }
  return (
    <>
      {/* 통계 정보 */}
      <div className="flex justify-center items-center mb-6 space-x-10">
        <div className="text-center">
          <h3 className="text-base font-semibold text-gray-500">포스트</h3>
          <h3>{postCount}</h3>
        </div>
        <div className="h-6 w-px bg-gray-300 mx-4"></div>
        <div className="text-center cursor-pointer" onClick={handleFollowersClick}>
          <h3 className="text-base font-semibold text-gray-500">팔로워</h3>
          <h3>{followerCount}</h3>
        </div>
        <div className="h-6 w-px bg-gray-300 mx-4"></div>
        <div className="text-center cursor-pointer" onClick={handleFollowingClick}>
          <h3 className="text-base font-semibold text-gray-500">팔로잉</h3>
          <h3>{followingCount}</h3>
        </div>
      </div>
    </>
  );
}
