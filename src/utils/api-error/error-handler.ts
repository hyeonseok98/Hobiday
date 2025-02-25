import axios from "axios";
import { getErrorMessage } from "./api-error-messages";

// API 에러 처리 유틸 함수
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || "관리자에게 문의해주세요.";

    console.error(`🚨 [API Error] Status: ${status || "unknown"}, Message: ${message}`);
    console.error("📝 요청 정보:", error.config);

    return getErrorMessage(status ?? 500, message);
  }

  // 네트워크 오류 또는 Axios 외의 에러 처리
  console.error("❌ [Network Error]:", error instanceof Error ? error.message : "알 수 없는 오류입니다.");
  return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
};
