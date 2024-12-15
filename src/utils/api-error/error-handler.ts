import { getErrorMessage } from "./api-error-messages";

export const handleApiError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    console.error(`API Error [${status}]: ${data?.message || "Api Response Error!: 서버 관리자에게 문의해주세요."}`);
    return getErrorMessage(status, data?.message);
  }
  console.error("Network Error!:", error.message);
  return "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
};
