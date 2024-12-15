import { BaseResponse } from "../base-response";

export interface AllFeeds {
  feedId: number;
  contents: string;
  profileName: string;
  profileId: number;
  profileImageUrl: string;
  hashTag: string[];
  feedFiles: string[];
  likeCount: number;
  commentCount: number;
  performId: string;
  performName: string;
  startDate: string;
  endDate: string;
  genreName: string;
  performState: string;
  placeName: string;
  openRun: boolean;
  area: string;
  poster: string;
  performLikeCount: number;
  relativeTime: string;
  liked: boolean;
}

export type AllFeedsResponse = BaseResponse<AllFeeds[]>;
