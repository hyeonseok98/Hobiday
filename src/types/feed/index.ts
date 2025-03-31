export interface Feed {
  feedId: number;
  contents: string;
  profileName: string;
  profileId: number;
  profileImageUrl: string | null;
  hashTag: string[] | null;
  feedFiles: string[];
  likeCount: number;
  commentCount: number;
  performId: string | null;
  performName: string | null;
  startDate: string | null;
  endDate: string | null;
  genreName: string | null;
  performState: string | null;
  placeName: string | null;
  openRun: boolean;
  area: string | null;
  poster: string | null;
  performLikeCount: number | null;
  relativeTime: string;
  liked: boolean;
}

export interface UploadFeed {
  performId: string;
  content: string;
  topic: string;
  hashTags: string[];
  fileUrls: string[];
}

export interface LikeCount {
  likeCount: number;
  liked: boolean;
}

export interface FeedData {
  feedId: number;
  feedFiles: string[];
}

export interface FeedThumbnail {
  feedId: number;
  imageUrl: string; // 첫 번째 사진만 사용
}
