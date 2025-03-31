import CommentGradationIcon from "@/assets/svgr-icons/CommentGradation";
import HeartGradationIcon from "@/assets/svgr-icons/HeartGradation";
import Icon from "@/components/commons/icons";
import { LikeGradientDefault } from "@/styles/gradients";
import { getCookie } from "@/utils/get-refresh-cookie";
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
      <div className="flex items-center gap-[2px] cursor-pointer" onClick={handleLikeToggle}>
        {isLiked ? (
          <Icon size={24}>
            <HeartGradationIcon />
          </Icon>
        ) : (
          <Icon size={24}>
            <LikeGradientDefault />
          </Icon>
        )}
        <div className="font-medium text-gray-500 min-w-3 text-center">{likes}</div>
      </div>
      <div
        className="flex items-center ml-4 gap-[2px] cursor-pointer"
        onClick={() => router.push(`/feed/comments?feedId=${feedId}`)}
      >
        <Icon size={24}>
          <CommentGradationIcon />
        </Icon>
        <div className="font-medium text-gray-500 min-w-3 text-center">{commentCount}</div>
      </div>
    </div>
  );
}
