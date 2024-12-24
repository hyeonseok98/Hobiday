import { BaseResponse } from "../base-response";

export interface CheckNickname {
  profileMessage: string;
}

export type CheckNicknameResponse = BaseResponse<CheckNickname>;

export type FollowProfile = {
  profileId: number;
  profileNickName: string;
  profileImageUrl: string;
  profileIntroduction: string;
  following: boolean;
};
