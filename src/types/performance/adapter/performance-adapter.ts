import { ClientPerformance } from "../client";
import { ServerAllPerformances } from "../server";

export function performanceAdapter(data: ServerAllPerformances[]): ClientPerformance[] {
  return data.map((item) => ({
    performanceId: item.performId,
    performanceName: item.performName,
    startDate: item.startDate,
    endDate: item.endDate,
    genre: item.genreName,
    state: item.performState,
    facility: item.placeName,
    isOpenRun: item.openRun,
    location: item.area,
    posterUrl: item.poster,
    likes: item.likeCount,
  }));
}
