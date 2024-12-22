import { BaseResponse } from "../base-response";

// 전체 공연 조회
export interface ServerAllPerformances {
  performId: string; // 공연 ID
  performName: string; // 공연명
  startDate: string; // 시작일
  endDate: string; // 종료일
  genreName: string; // 장르명
  performState: string; // 공연 상태
  placeName: string; // 공연 시설명
  openRun: boolean; // 오픈런 가능 여부
  area: string; // 공연 지역
  poster: string; // 포스터 주소
  likeCount: number; // 좋아요 수
}

export type AllPerformancesResponse = BaseResponse<ServerAllPerformances[]>;

// 장르별 공연 조회
export interface ServerPerformancesByGenre {
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

export type PerformancesByGenreResponse = BaseResponse<ServerPerformancesByGenre[]>;

// 공연 상세 조회
export interface ServerPerformanceDetails {
  performId: string; // 공연 ID
  facilityId: string; // 시설 상세 ID
  cast: string; // 공연 출연진
  runtime: string; // 공연 런타임
  perform: string; // 공연 상세 설명
  ticketPrice: string; // 티켓 가격
  storyUrl: string; // 소개 이미지 URL
  showtime: string; // 공연 시간
  reservationChannel: string; // 예약 채널
  reservationUrl: string; // 예약 사이트
}

export type PerformanceDetailResponse = BaseResponse<ServerPerformanceDetails[]>;

// 공연 기본 조회 + 상세 조회
export interface ServerPerformanceDetailAll {
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
  facilityId: string;
  cast: string;
  runtime: string;
  perform: string;
  ticketPrice: string;
  storyUrl: string;
  showtime: string;
  reservationChannel: string;
  reservationUrl: string;
  wishCount: number;
  feedCount: number;
  isWished: boolean;
}

export type PerformanceDetailAllResponse = BaseResponse<ServerPerformanceDetailAll>;

// 공연 추천 검색어
export interface ServerRecommendedSearchWords {
  performId: string;
  performName: string;
  genreName: string;
}

export type RecommendedSearchWordsResponse = BaseResponse<ServerRecommendedSearchWords[]>;

// 공연 시설 정보
export interface ServerFacilityInfo {
  facilityId: string;
  facilityName: string;
  telephone: string;
  address: string;
  latitude: string;
  longitude: string;
  cafe: boolean;
  parkingLot: boolean;
}

export type FacilityInfoResponse = BaseResponse<ServerFacilityInfo>;
