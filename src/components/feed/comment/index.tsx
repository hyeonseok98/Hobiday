"use client";

import CommentCard from "@/components/comment";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";
import { useAddCommentMutation, useAllCommentQuery } from "@/hooks/comment/use-comment-query";
import { useUserStore } from "@/stores";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CommentPage() {
  const searchParams = useSearchParams();
  const feedId = Number(searchParams.get("feedId"));
  const { user } = useUserStore();
  const [comment, setComment] = useState("");
  const addCommentMutation = useAddCommentMutation();
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  // 댓글 데이터 가져오기
  const { data: allComment, isLoading: isAllCommentLoading, isError: isAllCommentError } = useAllCommentQuery(feedId);

  const allComments = allComment;
  const isLoading = isAllCommentLoading;
  const isError = isAllCommentError;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-content">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="flex justify-center items-center h-content">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  const handleCommentSubmit = () => {
    addCommentMutation.mutate(
      { feedId, data: { contents: comment } },
      {
        onSuccess: () => {
          setToast({ type: "Complete", message: "댓글이 등록되었습니다." });
          setComment("");
        },
        onError: (error) => {
          console.error("댓글 등록 중 오류 발생:", error);
          setToast({ type: "Error", message: "댓글 등록에 실패했습니다." });
        },
      },
    );
  };

  return (
    <>
      {/* 댓글 데이터 표시 */}
      <div className="overflow-y-auto">
        {allComments && allComments.length > 0 ? (
          allComments.map((comment) => (
            <CommentCard
              id={comment.id}
              key={comment.id}
              profileImageUrl={comment.profileImageUrl}
              profileName={comment.profileName}
              relativeTime={comment.relativeTime}
              contents={comment.contents}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-content">댓글이 없습니다.</div>
        )}
      </div>

      {/* 댓글 입력창 */}
      <div className="absolute bottom-20 w-[430px] px-4 shadow-[0_-35px_60px_-15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center h-[60px] space-x-2">
          {/* 사용자 정보 전역 상태로 저장해 놓았다가 호출하는 걸로 바꾸기 */}
          <img
            src={user?.profileImageUrl || "https://via.placeholder.com/40"}
            alt="profile"
            className="w-7 h-7 rounded-full"
          />
          <input
            type="text"
            placeholder="댓글 쓰기"
            className="flex-grow text-sm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="text-xs w-[46px] h-[28px] bg-blue-500 text-white rounded-md" onClick={handleCommentSubmit}>
            등록
          </button>
        </div>
      </div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </>
  );
}
