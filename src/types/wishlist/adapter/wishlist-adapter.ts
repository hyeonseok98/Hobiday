import { ClientWishlist } from "../client";
import { ServerWishlist } from "../server";

export function wishlistAdapter(data: ServerWishlist[]): ClientWishlist[] {
  return data.map((item) => ({
    wishListId: item.wishId,
    performanceId: item.performId,
    genreName: item.genreName,
    performanceName: item.performName,
    state: item.performState,
    placeName: item.placeName,
    area: item.area,
    posterUrl: item.poster,
  }));
}
