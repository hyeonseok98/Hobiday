interface FollowButtonProps {
  isFollowing: boolean;
  onFollowToggle: () => void;
}

export default function FollowButton({ isFollowing, onFollowToggle }: FollowButtonProps) {
  return (
    <button
      onClick={onFollowToggle}
      className={`px-2 py-1 text-sm rounded-full transition ${
        isFollowing ? "border-2 border-primary bg-white text-primary" : "border-2 border-primary bg-primary text-white"
      }`}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </button>
  );
}
