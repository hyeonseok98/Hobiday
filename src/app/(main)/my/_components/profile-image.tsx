interface ProfileImageProps {
  profileImageUrl: string;
}

export default function ProfileImage({ profileImageUrl }: ProfileImageProps) {
  return (
    <>
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center mb-4">
        <div className="w-20 h-20 rounded-full mb-2">
          <img
            src={profileImageUrl}
            alt="프로필 이미지"
            className="w-full h-full object-cover rounded-full shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
