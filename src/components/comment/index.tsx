import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface CommentCardProps {
  id: number;
  contents: string;
  profileName: string;
  profileImageUrl: string;
  relativeTime: string;
}

export default function CommentCard({ id, contents, profileName, profileImageUrl, relativeTime }: CommentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 텍스트 컨텐츠가 3줄 이상인지 확인
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [contents]);

  return (
    <div className="p-4 mb-4">
      {/* 유저 프로필 */}
      <div className="flex items-center mb-3">
        <Image
          src={profileImageUrl || "https://via.placeholder.com/40"}
          alt={`${profileName} profile`}
          width={28}
          height={28}
          className="rounded-full mr-2"
          unoptimized
        />
        <div className="font-semibold text-xs">{profileName}</div>
      </div>

      {/* 댓글 내용 */}
      <div className="text-xs relative mx-9">
        <section
          ref={contentRef}
          className={`overflow-hidden relative ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}
        >
          {isOverflowing && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="float-right mt-8 [shape-outside:border-box] text-gray-600 cursor-pointer px-1"
            >
              더보기
            </button>
          )}
          {contents}
        </section>
      </div>

      {/* 작성 시간 및 옵션 */}
      <div className="flex items-center mx-9 my-3 text-[10px] text-gray-500">
        <div className="mr-3">{relativeTime}</div>
        {/* {profileName && (
          <div className="flex space-x-2">
            <button>수정</button>
            <button>삭제</button>
          </div>
        )} */}
      </div>
    </div>
  );
}
