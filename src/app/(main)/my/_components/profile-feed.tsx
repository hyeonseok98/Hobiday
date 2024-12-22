import { useRouter } from "next/navigation";

interface FeedThumbnail {
  feedId: number;
  imageUrl: string; // 첫 번째 사진만 사용
}

interface feedThumbnailProps {
  myFeeds: FeedThumbnail[];
}

export default function ProfileFeed({ myFeeds }: feedThumbnailProps) {
  const router = useRouter();
  const handleFeedClick = (feedId: number) => {
    router.push(`/feed/${feedId}`);
  };

  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {myFeeds.map((feed) => (
        <div key={feed.feedId} onClick={() => handleFeedClick(feed.feedId)} className="overflow-hidden cursor-pointer">
          <img src={feed.imageUrl} alt={`feed.${feed.feedId}`} className="w-36 h-36 object-cover" />
        </div>
      ))}
    </div>
  );
}
