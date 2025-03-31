import { useUserStore } from "@/stores";

// access token/cookie 제거
export const removeAuthTokens = () => {
  localStorage.removeItem("accessToken");
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  useUserStore.getState().clearUser(); // 전역 상태 내 유저정보 삭제
};
