import { BaseResponse } from "../base-response";

// 전체 공연 조회
export interface AllPerformances {
  performId: string;
  performName: string;
  startDate: string;
  endDate: string;
  genreName: string;
  performState: string;
  placeName: string;
  openRun: boolean;
  area: string;
  poster: string;
  likeCount: number;
}

export type AllPerformancesResponse = BaseResponse<AllPerformances[]>;

// 장르별 공연 조회
export interface PerformancesByGenre {
  performId: string;
  performName: string;
  startDate: string;
  endDate: string;
  genreName: string;
  performState: string;
  placeName: string;
  openRun: boolean;
  area: string;
  poster: string;
  likeCount: number;
}

export type PerformancesByGenreResponse = BaseResponse<PerformancesByGenre[]>;

// 공연 상세 조회
export interface PerformanceDetail {
  performId: string;
  facilityId: string;
  cast: string;
  runtime: string;
  perform: string;
  ticketPrice: string;
  storyUrl: string;
  showtime: string;
  reservationChannel: string;
  reservationUrl: string;
}

export type PerformancesDetailResponse = BaseResponse<PerformanceDetail[]>;
