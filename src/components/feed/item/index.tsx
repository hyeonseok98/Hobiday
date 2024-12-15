import "swiper/css";
import "swiper/css/pagination";
import "@/app/globals.css";

import FeedProfile from "./feed-profile";
import FeedImage from "./feed-image";
import FeedContent from "./feed-content";
import FeedHashTags from "./feed-hashtags";
import FeedActions from "./feed-actions";

type FeedItemProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FeedItem({ children, className }: FeedItemProps) {
  return <div className={`mb-5 pt-1 shadow-lg bg-white ${className}`}>{children}</div>;
}

FeedItem.Profile = FeedProfile;
FeedItem.Image = FeedImage;
FeedItem.Content = FeedContent;
FeedItem.HashTags = FeedHashTags;
FeedItem.Actions = FeedActions;
