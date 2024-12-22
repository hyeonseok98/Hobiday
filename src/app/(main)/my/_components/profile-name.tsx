interface ProfileNameProps {
  profileNickname: string;
  profileIntroduction: string;
}

export default function ProfileName({ profileNickname, profileIntroduction }: ProfileNameProps) {
  return (
    <>
      <div className="flex flex-col items-center mb-4">
        <h1 className="text-xl font-semibold">{profileNickname}</h1>
        <p className="text-sm text-gray-500">{profileIntroduction}</p>
      </div>
    </>
  );
}
