"use client";

import { userLogout } from "@/apis/user-api";
import SvgArrowForward from "@/assets/svgr-icons/ArrowForward";
import { useRouter } from "next/navigation";

export default function ProfileSettingPage() {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await userLogout();

      if (response.status == 200) {
        localStorage.removeItem("accessToken");
        // 리프레시 쿠키 무효화
        document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        alert("로그아웃 되었습니다.");
        router.push("/login");
      } else {
        throw new Error("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-5 border-t border-t-gray-300">
      <div className="font-semibold mb-8">계정</div>
      <div className="space-y-8">
        <div className="flex justify-between items-center cursor-pointer" onClick={handleLogout}>
          <span className="font-semibold">로그아웃</span>
          <SvgArrowForward />
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">회원 탈퇴</span>
          <SvgArrowForward />
        </div>
      </div>
    </div>
  );
}
