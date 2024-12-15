export interface ServerPerformance {
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
