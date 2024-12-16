import Image from "next/image";
import FeedMenuModal from "../modal/feed-menu";

type ProfileProps = {
  profileImageUrl: string;
  profileName: string;
  isFollowing: boolean;
};

export default function FeedProfile({ profileImageUrl, profileName, isFollowing }: ProfileProps) {
  return (
    <div className="flex items-center justify-between mx-4 my-2">
      <div className="flex items-center">
        <Image
          // API 연결 후 profileImage로 변경
          src={profileImageUrl || "https://via.placeholder.com/40"}
          alt={`${profileName} profile`}
          width={40}
          height={40}
          className="rounded-full"
          unoptimized
        />
        <div className="font-semibold mx-2">{profileName}</div>
      </div>
      {/* {isFollowing ? (
        <FeedMenuModal />
      ) : (
        <button className="text-sm font-semibold hover:underline mr-4 bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
          팔로우
        </button>
      )} */}
    </div>
  );
}
