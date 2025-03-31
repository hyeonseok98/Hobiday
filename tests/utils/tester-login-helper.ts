import axios from "axios";

/**
 * freepass API를 호출하여 tester 계정의 인증 토큰 반환
 * 실제 로컬 스토리지 및 쿠키에 저장하지 않음
 * @param account - 로그인할 계정명
 */
export async function testerLogin(account: string) {
  const testerLoginApiUrl = `http://localhost:3000/api/test/freepass/${account}`;
  const response = await axios.get(testerLoginApiUrl);

  const { accessToken, refreshToken } = response.data.result;

  return { accessToken, refreshToken };
}
