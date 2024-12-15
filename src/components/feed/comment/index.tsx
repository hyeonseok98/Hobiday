"use client";

import CommentCard from "@/components/comment";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchComment } from "@/apis/comment-api";
import { Comment } from "@/types/comment";
import LoadingSpinner from "@/components/commons/spinner";

export default function CommentPage() {
  const searchParams = useSearchParams();
  const feedId = searchParams.get("feedId");

  const {
    data: commentList = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["comments", feedId],
    queryFn: () => fetchComment(feedId!),
    enabled: !!feedId,
  });

  console.log(commentList);

  if (!feedId) {
    return <div>feed Id가 없습니다.</div>;
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다.</div>;
  }

  return (
    <>
      {/* 댓글 데이터 표시 */}
      <div className="overflow-y-auto">
        {commentList.length > 0 ? (
          commentList.map((comment: Comment) => (
            <CommentCard
              id={comment.id}
              profileImageUrl={comment.profileImageUrl}
              profileName={comment.profileName}
              relativeTime={comment.relativeTime}
              contents={comment.contents}
            />
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="absolute bottom-20 w-[430px] px-4 shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center h-[60px] space-x-2">
          {/* 사용자 정보 전역 상태로 저장해 놓았다가 호출하는 걸로 바꾸기 */}
          <img src="https://via.placeholder.com/40" alt="profile" className="w-7 h-7 rounded-full" />
          <input type="text" placeholder="댓글 쓰기" className="flex-grow text-sm" />
          <button className="text-xs w-[46px] h-[28px] bg-blue-500 text-white rounded-md">등록</button>
        </div>
      </div>
    </>
  );
}
