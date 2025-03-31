interface ProfileGenresProps {
  profileGenres: string[];
}

export default function ProfileGenres({ profileGenres }: ProfileGenresProps) {
  return (
    <>
      {/* 태그 리스트 */}
      <div className="flex flex-wrap gap-2 justify-center items-center py-2">
        {profileGenres.map((tag, index) => (
          <span key={index} className="w-[72px] py-1 text-center bg-flat text-xs text-gray-700 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
