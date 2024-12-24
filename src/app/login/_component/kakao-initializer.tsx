"use client";

import { useEffect } from "react";

export default function KakaoInitializer() {
  useEffect(() => {
    const kakaoSDK = document.createElement("script");
    kakaoSDK.async = false;
    kakaoSDK.src = `https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js`;
    kakaoSDK.integrity = `sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka`;
    kakaoSDK.crossOrigin = `anonymous`;
    document.head.appendChild(kakaoSDK);

    function onLoadKakaoAPI() {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_API_KEY);
        console.log("first Init!: ", window.Kakao.isInitialized());
      }
    }
    kakaoSDK.addEventListener("load", onLoadKakaoAPI);
  }, []);

  return null;
}
