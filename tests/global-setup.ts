import fs from "fs";
import { testerLogin } from "./utils/tester-login-helper";

// 테스트 전 tester 계정 로그인 로직
async function globalSetup() {
  const { accessToken, refreshToken } = await testerLogin("sample1");

  const loggedInStorage = {
    cookies: [
      {
        name: "refreshToken",
        value: refreshToken,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false, // HTTPS 환경이 아닌 로컬 환경에서도 쿠키를 전송 하기위해 false 처리
      },
      {
        name: "e2e-test-skip-auth",
        value: "true",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
      },
    ],
    origins: [
      {
        origin: "http://localhost:3000",
        localStorage: [
          {
            name: "accessToken",
            value: accessToken,
          },
        ],
      },
    ],
  };

  fs.writeFileSync("./tests/storage/logged-in-storage.json", JSON.stringify(loggedInStorage));

  // 온보딩 테스트용 계정: 회원가입 완료했으나 온보딩 미진행
  const { accessToken: accessTokenBeforeOnboarding, refreshToken: refreshTokenBeforeOnboarding } = await testerLogin(
    "account4",
  );

  const onboardingStorage = {
    cookies: [
      {
        name: "refreshToken",
        value: refreshTokenBeforeOnboarding,
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
      },
      {
        name: "e2e-test-skip-auth",
        value: "true",
        domain: "localhost",
        path: "/",
        httpOnly: true,
        secure: false,
      },
    ],
    origins: [
      {
        origin: "http://localhost:3000",
        localStorage: [
          {
            name: "accessToken",
            value: accessTokenBeforeOnboarding,
          },
        ],
      },
    ],
  };

  fs.writeFileSync("./tests/storage/onboarding-storage.json", JSON.stringify(onboardingStorage));
}

export default globalSetup;
