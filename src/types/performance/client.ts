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

export interface ClientPerformanceDetailAll {
  performanceId: string;
  name: string;
  date: {
    start: string;
    end: string;
  };
  genre: string;
  state: string;
  location: {
    place: string;
    area: string;
  };
  posterUrl: string;
  facilityId: string;
  cast: string;
  runtime: string;
  description: string;
  ticket: {
    price: string;
    reservation: {
      channel: string;
      url: string;
    };
  };
  storyImageUrl: string;
  showtime: string;
  openRun: boolean;
  likeCounts: number;
  feedCounts: number;
  isLiked: boolean;
}

// 추천 공연 검색어
export interface ClientRecommendedSearchWords {
  performanceId: string;
  performanceName: string;
  genreName: string;
}
