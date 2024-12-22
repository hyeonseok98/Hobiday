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
      FACILITY: (facilityId: string) => `${API_BASE_URL}/api/performs/facility/${facilityId}`,
    },
  },
  USERS: {
    REGISTRATION_CHECK: `${API_BASE_URL}/api/profiles/registration/check`,
    GET_TOKEN: `${API_BASE_URL}/api/token`,
    LOGOUT: `${API_BASE_URL}/api/members/logout`,
  },
  FEED: {
    GET: {
      LATEST: `${API_BASE_URL}/api/feeds`,
      POPULAR: `${API_BASE_URL}/api/feeds/likes`,
      BY_ID: (profileId: number) => `${API_BASE_URL}/api/profiles/${profileId}/feeds`,
      DETAIL: (feedId: number) => `${API_BASE_URL}/api/profiles/feeds/${feedId}`, // 피드 상세 페이지
    },
    CREATE: `${API_BASE_URL}/api/feeds`, // 피드 등록
    UPDATE: (feedId: number) => `${API_BASE_URL}/api/feeds/${feedId}`, // 피드 수정
    DELETE: (feedId: number) => `${API_BASE_URL}/api/feeds/${feedId}`, // 피드 삭제
    SAVE_IMAGE: `${API_BASE_URL}/api/v1/file`, // 이미지 저장
    LIKE: (feedId: number) => `${API_BASE_URL}/api/likes/${feedId}`, // 피드 좋아요
  },
  COMMENT: {
    GET: (feedId: string) => `${API_BASE_URL}/api/comments/${feedId}`, // 댓글 조회
    CREATE: (feedId: number) => `${API_BASE_URL}/api/comments/${feedId}`, // 댓글 등록
    UPDATE: (commentId: number) => `${API_BASE_URL}/api/comments/${commentId}`, // 댓글 수정
    DELETE: (commentId: number) => `${API_BASE_URL}/api/comments/${commentId}`, // 댓글 삭제
  },
  WISHLIST: {
    POST: (performId: string) => `${API_BASE_URL}/api/wishlist/${performId}`,
    GET: {
      ALL: `${API_BASE_URL}/api/wishlist`,
      GENRE: `${API_BASE_URL}/api/wishlist/genre`,
    },
    DELETE: (performId: string) => `${API_BASE_URL}/api/wishlist/${performId}`,
  },
  PROFILES: {
    GET: {
      BY_ID: (profileId: number) => `${API_BASE_URL}/api/profiles/myprofile?profileId=${profileId}`, // 프로필 조회
      FOLLOWING: (profileId: number) => `${API_BASE_URL}/api/profiles/${profileId}/following`, // 팔로잉 조회
      FOLLOWERS: (profileId: number) => `${API_BASE_URL}/api/profiles/${profileId}/followers`, // 팔로워 조회
    },
    REGISTRATION: `${API_BASE_URL}/api/profiles/registration`,
    NICKNAME_CHECK: (nickname: string) => `${API_BASE_URL}/api/profiles/registration/${nickname}`,
    PROFILE: `${API_BASE_URL}/api/profiles/myprofile`, // 내 프로필 정보
    UPDATE: `${API_BASE_URL}/api/profiles/update`,
    FOLLOW: (targetProfileId: number) => `${API_BASE_URL}/api/profiles/follow?targetProfileId=${targetProfileId}`,
  },
};
