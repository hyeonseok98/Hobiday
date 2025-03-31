interface ProfileNameProps {
  profileNickname: string;
  profileIntroduction: string;
}

export default function ProfileName({ profileNickname, profileIntroduction }: ProfileNameProps) {
  return (
    <>
      <div className="w-full py-1">
        <h1 className="text-xl font-semibold text-center">{profileNickname}</h1>
      </div>
      <div className="w-full py-1">
        <h2 className="text-sm text-gray-500 text-center">{profileIntroduction}</h2>
      </div>
    </>
  );
}
