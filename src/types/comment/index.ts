import { BaseResponse } from "../base-response";

export interface CommentDataResponse {
  id: number;
  contents: string;
  profileName: string;
  profileImageUrl: string;
  relativeTime: string;
}

export type CommentResponse = BaseResponse<CommentDataResponse[]>;

export interface CommentData {
  contents: string;
}
