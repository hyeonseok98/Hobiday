import Image from "next/image";
import FollowButton from "./button";

interface UserFollowCardProps {
  profileId: number;
  profileImageUrl: string | null;
  profileNickname: string;
  // profileIntroduction: string | null;
  isFollowing: boolean;
  onFollowToggle: () => void;
}

export default function UserFollowCard(user: UserFollowCardProps) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      {/* Profile Image */}
      <Image
        src={
          user.profileImageUrl ||
          "https://d3squc7td61jc2.cloudfront.net/image/jpeg/20241220141003-e421a566-9977-4559-9af4-995941acba1b-99FEF8395E12B91415.jpg"
        }
        alt="Profile"
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />

      {/* User Info */}
      <div className="flex-1 ml-3">
        <h3 className="text-sm font-semibold truncate">{user.profileNickname}</h3>
        {/* <p className="text-xs">{user.profileIntroduction}</p> */}
      </div>

      {/* Follow Button */}
      <FollowButton isFollowing={user.isFollowing} onFollowToggle={user.onFollowToggle} />
    </div>
  );
}
