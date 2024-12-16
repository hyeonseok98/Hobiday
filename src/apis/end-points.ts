import { API_BASE_URL } from "./index";

export const ENDPOINTS = {
  PERFORMANCES: {
    GET_ALL: `${API_BASE_URL}/api/performs`,
    GENRE: `${API_BASE_URL}/api/performs/genre`,
    GET_BY_ID: (performId: string) => `${API_BASE_URL}/api/performs/${performId}`,
    SEARCH: (keyword: string) => `/api/performs/search?keyword=${keyword}`,
    RECOMMENDS: `${API_BASE_URL}/api/performs/search/recommends`,
    DETAIL: {
      BY_ID: (performId: string) => `${API_BASE_URL}/api/performs/detail/${performId}`,
      BY_ID_ALL: (performId: string) => `${API_BASE_URL}/api/performs/all/${performId}`,
      FACILITY: (facilityId: string) => `${API_BASE_URL}/api/performs/detail/facility/${facilityId}`,
    },
  },
  USERS: {
    REGISTRATION_CHECK: `${API_BASE_URL}/api/profiles/registration/check`,
    GET_TOKEN: `${API_BASE_URL}/api/token`,
  },
  FEED: {
    GET: {
      LATEST: `${API_BASE_URL}/api/feeds`,
      POPULAR: `${API_BASE_URL}/api/feeds/likes`,
      MINE: `${API_BASE_URL}/api/profiles/feeds`, // 마이페이지
      DETAIL: (feedId: string) => `${API_BASE_URL}/api/feeds/${feedId}`, // 피드 상세 페이지
    },
    CREATE: `${API_BASE_URL}/api/feeds`, // 피드 등록
    UPDATE: (feedId: string) => `${API_BASE_URL}/api/feeds/${feedId}`, // 피드 수정
    DELETE: (feedId: string) => `${API_BASE_URL}/api/feeds/${feedId}`, // 피드 삭제
    SAVE_IMAGE: `${API_BASE_URL}/api/v1/file`, // 이미지 저장
    LIKE: (feedId: string) => `${API_BASE_URL}/api/likes/${feedId}`, // 피드 좋아요
  },
  COMMENT: {
    GET: (feedId: string) => `${API_BASE_URL}/api/comments/${feedId}`, // 댓글 조회
    CREATE: (feedId: string) => `${API_BASE_URL}/api/comments/${feedId}`, // 댓글 등록
    UPDATE: (commentId: string) => `${API_BASE_URL}/api/comments/${commentId}`, // 댓글 수정
    DELETE: (commentId: string) => `${API_BASE_URL}/api/comments/${commentId}`, // 댓글 삭제
  },
  PROFILES: {
    REGISTRATION: `${API_BASE_URL}/api/profiles/registration`,
    NICKNAME_CHECK: (nickname: string) => `${API_BASE_URL}/api/profiles/registration/${nickname}`,
    PROFILE: `${API_BASE_URL}/api/profiles/myprofile`,
  },
};
