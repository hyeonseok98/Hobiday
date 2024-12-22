import CommentGradient from "@/utils/comment-gradient";
import { getCookie } from "@/utils/get-refresh-cookie";
import LikeGradientDefault from "@/utils/like-gradient-default";
import LikeGradientPressed from "@/utils/like-gradient-pressed";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ActionsProps = {
  feedId: number;
  liked: boolean;
  likeCount: number;
  commentCount: number;
};

export default function FeedActions({ feedId, likeCount, liked, commentCount }: ActionsProps) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(liked);
  const [likes, setLikes] = useState(likeCount);

  const handleLikeToggle = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = await getCookie("refreshToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (isLiked) {
        await axios.post(`/api/likes/${feedId}?token=${refreshToken}`, {}, config);
        setLikes(likes - 1);
      } else {
        await axios.post(`/api/likes/${feedId}?token=${refreshToken}`, {}, config);
        setLikes(likes + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="flex items-center mx-4 pb-3">
      <div className="flex items-center space-x-1 cursor-pointer" onClick={handleLikeToggle}>
        {isLiked ? <LikeGradientPressed /> : <LikeGradientDefault />}
        <div className="font-medium text-gray-500">{likes}</div>
      </div>
      <div
        className="flex items-center ml-4 space-x-1 cursor-pointer"
        onClick={() => router.push(`/feed/comments?feedId=${feedId}`)}
      >
        <CommentGradient />
        <div className="font-medium text-gray-500">{commentCount}</div>
      </div>
    </div>
  );
}
