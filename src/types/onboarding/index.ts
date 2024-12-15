import { BaseResponse } from "../base-response";

export interface PostProfileRegistrationRequest {
  profileNickname: string;
  profileGenres: string[];
}

export interface PostProfileRegistrationResponse {
  profileId: number;
  memberId: number;
  profileNickname: string;
  profileEmail: string;
  profileGenres: string[];
  profileIntroduction: string;
  profileImageUrl: string;
}

export type ProfileRegistrationResponse = BaseResponse<PostProfileRegistrationResponse[]>;
