"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function saveTokens(accessToken: string, refreshToken: string) {
  // 현 단계에서 httpOnly, Secure 넣을 경우 쿠키에서 확인 불가능해 제외
  localStorage.setItem("accessToken", accessToken);
  document.cookie = `refreshToken=${refreshToken}; path=/; `;
}

async function checkRegistration(accessToken: string) {
  try {
    const apiUrl = `api/profiles/registration/check`;
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.result.register;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Registration check failed");
  }
}

export default function RegistrationForm() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let queryParams = new URLSearchParams(window.location.search);
    let accessToken = queryParams.get("access");
    let refreshToken = queryParams.get("refresh");

    if (accessToken && refreshToken) {
      saveTokens(accessToken, refreshToken);

      checkRegistration(accessToken)
        .then((data) => {
          if (data) {
            router.push("/");
          } else {
            router.replace("/onboarding");
          }
        })
        .catch(() => {
          console.log("로그인 오류 발생");
          router.push("/login");
        });
    } else {
      console.log("토큰 정보가 없습니다");
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <h1>Registration Form Page</h1>
    </>
  );
}
