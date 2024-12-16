import { ClientPerformanceDetails } from "../client";
import { ServerPerformanceDetails } from "../server";

export function performanceDetailAdapter(data: ServerPerformanceDetails[]): ClientPerformanceDetails[] {
  return data.map((item) => ({
    performanceId: item.performId,
    facilityId: item.facilityId,
    cast: item.cast,
    runtime: item.runtime,
    description: item.perform,
    ticketPrice: item.ticketPrice,
    storyImageUrl: item.storyUrl,
    showtime: item.showtime,
    reservationChannel: item.reservationChannel,
    reservationUrl: item.reservationUrl,
  }));
}
