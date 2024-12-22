import { BaseResponse } from "../base-response";

export interface ServerWishlist {
  wishId: number;
  performId: string;
  genreName: string;
  performName: string;
  performState: string;
  placeName: string;
  area: string;
  poster: string;
}

export type WishlistResponse = BaseResponse<ServerWishlist[]>;
