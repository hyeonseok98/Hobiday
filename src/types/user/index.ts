import { BaseResponse } from "../base-response";

export interface CheckNickname {
  profileMessage: string;
}

export type CheckNicknameResponse = BaseResponse<CheckNickname[]>;
