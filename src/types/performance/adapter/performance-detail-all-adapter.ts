import { ClientPerformanceDetailAll } from "../client";
import { ServerPerformanceDetailAll } from "../server";

export function performanceDetailAllAdapter(data: ServerPerformanceDetailAll): ClientPerformanceDetailAll {
  return {
    performanceId: data.performId,
    name: data.performName,
    date: {
      start: data.startDate,
      end: data.endDate,
    },
    genre: data.genreName,
    state: data.performState,
    location: {
      place: data.placeName,
      area: data.area,
    },
    posterUrl: data.poster,
    facilityId: data.facilityId,
    cast: data.cast,
    runtime: data.runtime,
    description: data.perform,
    ticket: {
      price: data.ticketPrice,
      reservation: {
        channel: data.reservationChannel,
        url: data.reservationUrl,
      },
    },
    storyImageUrl: data.storyUrl,
    showtime: data.showtime,
    openRun: data.openRun,
    likeCounts: data.wishCount,
    feedCounts: data.feedCount,
    isLiked: data.isWished,
  };
}
