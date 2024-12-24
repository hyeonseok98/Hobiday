import { CalendarMonth, Location } from "@/assets/svgr-icons";
import FeedGradation from "@/assets/svgr-icons/FeedsGradation";
import LikeGradientDefault from "@/assets/svgr-icons/like-gradient-default";
import LikeGradientPressed from "@/assets/svgr-icons/like-gradient-pressed";
import Chip from "@/components/commons/chip";
import Gap from "@/components/commons/gap";
import Icon from "@/components/commons/icons";
import { SectionLayout } from "@/components/layout";
import { useToggleWishlistMutation } from "@/hooks/wishlist/use-wishlist-query";
import Link from "next/link";

interface Performance {
  genre: string;
  name: string;
  location: string;
  dateStart: string;
  dateEnd: string;
  likeCounts: number;
  performanceId: string;
  feedCounts: number;
  isLiked: boolean;
}

export default function PerformanceDetailHeader({ performance }: { performance: Performance }) {
  const { genre, name, location, dateStart, dateEnd, likeCounts, performanceId, feedCounts, isLiked } = performance;

  const toggleWishlistMutation = useToggleWishlistMutation();

  const handleLikeToggle = () => {
    toggleWishlistMutation.mutate({
      performanceId,
      isCurrentlyLiked: performance.isLiked,
    });
  };

  return (
    <SectionLayout className="py-6">
      <div className="mb-4">
        <Chip label={genre} state="hashTag" />
      </div>
      <h1 className="mb-3 text-xl font-bold">{name}</h1>

      <div className="flex items-center">
        <Icon size={16} className="mr-1">
          <Location width={9.29} height={13} className="fill-black" />
        </Icon>
        <h3 className="text-textColor text-sm">{location}</h3>
      </div>
      <div className="flex items-center">
        <Icon size={16} className="mr-1">
          <CalendarMonth width={12} height={13} className="fill-black" />
        </Icon>
        <h3 className="text-textColor text-sm">
          {dateStart} - {dateEnd}
        </h3>
      </div>

      <Gap vertical size={16} />
      <div className="flex justify-evenly items-center max-w-[398px] w-full min-h-[112px] bg-white text-sm text-gray-600 font-medium shadow-md">
        <div onClick={handleLikeToggle} className="cursor-pointer flex flex-col items-center gap-1">
          <Icon size={40} className="cursor-pointer">
            {isLiked ? <LikeGradientPressed width={33} height={31} /> : <LikeGradientDefault width={33} height={31} />}
          </Icon>
          <p>
            위시 <span>{likeCounts}</span>
          </p>
        </div>
        <div className="h-20 w-[1px] bg-gray-300 mx-4" />
        <Link href={`/feed/search/${performanceId}`} className="flex flex-col items-center gap-1">
          <Icon size={40} className="cursor-pointer">
            <FeedGradation width={33} height={33} />
          </Icon>
          <p>피드 {feedCounts}</p>
        </Link>
      </div>
    </SectionLayout>
  );
}
