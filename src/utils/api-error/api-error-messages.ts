export const getErrorMessage = (statusCode?: number, defaultMessage = "알 수 없는 오류가 발생했습니다."): string => {
  const errorMessages: Record<number, string> = {
    400: "잘못된 요청입니다. 입력 값을 확인해주세요.",
    401: "인증이 필요합니다. 다시 로그인해주세요.",
    403: "접근 권한이 없습니다.",
    404: "요청하신 데이터를 찾을 수 없습니다.",
    408: "요청 시간이 초과되었습니다. 다시 시도해주세요.",
    429: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요.",
    500: "서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    502: "잘못된 게이트웨이입니다. 서버와 통신에 실패했습니다.",
    503: "서버가 일시적으로 사용할 수 없습니다. 잠시 후 다시 시도해주세요.",
    504: "서버 응답 시간이 초과되었습니다. 다시 시도해주세요.",
  };

  // 상태 코드에 따라 에러 메시지 반환, 없으면 기본 메시지 반환
  return statusCode && errorMessages[statusCode] ? errorMessages[statusCode] : defaultMessage;
};
