import Image from "next/image";

interface ProfileImageProps {
  profileImageUrl: string;
}

export default function ProfileImage({ profileImageUrl }: ProfileImageProps) {
  return (
    <>
      {/* 프로필 이미지 */}
      <div className="flex flex-col items-center py-4">
        <div className="relative w-20 h-20 rounded-full">
          <Image
            src={profileImageUrl}
            alt="프로필 이미지"
            fill
            className="w-full h-full object-contain rounded-full shadow-lg"
          />
        </div>
      </div>
    </>
  );
}
