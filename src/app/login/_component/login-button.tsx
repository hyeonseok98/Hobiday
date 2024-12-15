"use client";

import KakaoLogo from "@/assets/icons/kakao-logo.svg";
import Icon from "@/components/commons/icons";
import { useEffect } from "react";

const redirectUri = `${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/kakao`;

// 카카오 SDK 초기화 재확인
export default function LoginButton() {
  useEffect(() => {
    console.log("window.Kakao: ", window.Kakao);
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY);
        console.log("after Init: ", window.Kakao.isInitialized());
      }
    }
  }, []);

  function kakaoLoginHandler() {
    window.location.href = redirectUri;
  }
  return (
    <section className="flex flex-col justify-center items-center mt-28 gap-2">
      <button onClick={kakaoLoginHandler} className="bg-kakao w-[330px] rounded-full font-normal text-black py-3">
        <div className="flex justify-center items-center">
          <Icon size={24}>
            <KakaoLogo />
          </Icon>
          <h2 className="text-sm ml-1">카카오톡으로 5초만에 시작하기</h2>
        </div>
      </button>
    </section>
  );
}
