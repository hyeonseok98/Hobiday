interface FollowButtonProps {
  isFollowing: boolean;
  onFollowToggle: () => void;
  isDisabled?: boolean;
}

export default function FollowButton({ isFollowing, onFollowToggle, isDisabled = false }: FollowButtonProps) {
  return (
    <button
      onClick={onFollowToggle}
      disabled={isDisabled}
      className={`px-2 py-1 text-sm rounded-full transition ${
        isFollowing ? "border-2 border-primary bg-white text-primary" : "border-2 border-primary bg-primary text-white"
      }`}
    >
      {isFollowing ? "팔로우 중" : "팔로우"}
    </button>
  );
}
