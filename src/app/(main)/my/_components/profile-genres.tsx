interface ProfileGenresProps {
  profileGenres: string[];
}

export default function ProfileGenres({ profileGenres }: ProfileGenresProps) {
  return (
    <>
      {/* 태그 리스트 */}
      <div className="flex flex-wrap gap-2 justify-start mb-6">
        {profileGenres.map((tag, index) => (
          <span key={index} className="py-1 w-[72px] text-center bg-flat text-xs text-gray-700 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </>
  );
}
