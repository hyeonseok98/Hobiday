import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const refreshToken = request.cookies.get("refreshToken");

  const isLoginPage = pathname.startsWith("/login");
  const isOnboardingPage = pathname.startsWith("/onboarding");

  // playwright 온보딩 E2E 테스트를 위해 임시 우회(카카오 로그인이 아닌 우회 로그인)
  const e2eBypass = request.cookies.get("e2e-test-skip-auth");
  if (e2eBypass?.value === "true") {
    return NextResponse.next();
  }

  // CASE1. 로그인 유저
  if (refreshToken) {
    // 로그인 유저는 login 페이지 접근 불가하며 메인 화면으로 리다이렉트
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 프로필 등록 온보딩 페이지는 URL로 직접 접근 불가
    // !!백엔드 수정 이후 복구!!
    // if (isOnboardingPage) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    return NextResponse.next();
  }
  // CASE2. 비로그인 유저
  else {
    // 비로그인 유저는 login 외 다른 페이지 접근 불가
    if (!isLoginPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|img).*)",
};
