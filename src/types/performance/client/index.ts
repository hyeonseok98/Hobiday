export interface ClientPerformance {
  performanceId: string;
  performanceName: string;
  startDate: string;
  endDate: string;
  genre: string;
  state: string;
  facility: string;
  isOpenRun: boolean;
  location: string;
  posterUrl: string;
  likes: number;
}

export interface ClientPerformanceDetails {
  performanceId: string;
  facilityId: string;
  cast: string;
  runtime: string;
  description: string;
  ticketPrice: string;
  storyImageUrl: string;
  showtime: string;
  reservationChannel: string;
  reservationUrl: string;
}
