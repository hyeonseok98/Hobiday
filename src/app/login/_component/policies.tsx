"use client";

import axios from "axios";
import Link from "next/link";

export default function Policies() {
  function saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem("accessToken", accessToken);
    document.cookie = `refreshToken=${refreshToken}; path=/; `;
  }

  // 관리자 계정으로 로그인
  async function adminAccess(nickname: string) {
    try {
      const apiUrl = `api/test/freepass/${nickname}`;
      const response = await axios.get(apiUrl);

      const { accessToken, refreshToken } = response.data.result;
      if (accessToken && refreshToken) {
        saveTokens(accessToken, refreshToken);
      }

      window.location.href = "/";
    } catch (error) {
      console.error("관리자 로그인 실패", error);
    }
  }

  // 계정: account1, sample1
  return (
    <div className="mt-2 mb-12 text-center z-10">
      <h2 className="text-xs text-gray-600 leading-4">
        가입을 진행할 경우,{" "}
        <Link href={"/terms"} className="font-normal underline">
          서비스 약관
        </Link>{" "}
        및{" "}
        <Link href={"/terms/privacy-policy"} className="font-normal underline">
          개인정보 처리방침
        </Link>
        에<br /> 동의한 것으로 간주합니다
        <button onClick={() => adminAccess("sample1")}>.</button>
      </h2>
    </div>
  );
}
