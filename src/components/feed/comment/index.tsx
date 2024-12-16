"use client";

import CommentCard from "@/components/comment";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchComment } from "@/apis/comment-api";
import { Comment } from "@/types/comment";
import LoadingSpinner from "@/components/commons/spinner";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect, useState } from "react";
import axios from "axios";

interface CommentCardProps {
  id: number;
  contents: string;
  profileName: string;
  profileImageUrl: string;
  relativeTime: string;
}

export default function CommentPage() {
  const searchParams = useSearchParams();
  const feedId = searchParams.get("feedId");
  const { user } = useUserStore();
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<CommentCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.get(`/api/comments/${feedId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data.result);
      setAllComments(response.data.result);
    } catch (error) {
      console.error("댓글 조회 중 오류 발생:", error);
      alert("댓글을 불러오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [feedId]);

  if (loading) {
    return <div>댓글을 불러오는 중입니다...</div>;
  }

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.post(
        `/api/comments/${feedId}`,
        {
          contents: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status === 200) {
        alert("댓글이 등록되었습니다.");
        setComment("");
        await fetchComments();
      }
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      {/* 댓글 데이터 표시 */}
      <div className="overflow-y-auto">
        {allComments.length > 0 ? (
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
          <div>댓글이 없습니다.</div>
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
    </>
  );
}
