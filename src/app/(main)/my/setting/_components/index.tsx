"use client";

import { userLogout, userSignOut } from "@/apis/user-api";
import SvgArrowForward from "@/assets/svgr-icons/ArrowForward";
import Toast from "@/components/commons/toast";
import { useUserStore } from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSettingPage() {
  const router = useRouter();
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);
  const { user } = useUserStore();

  async function handleLogout() {
    try {
      await userLogout();
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setToast({ type: "Error", message: error.message });
      } else {
        setToast({ type: "Error", message: "로그아웃 중 오류 발생" });
      }
    }
  }

  // 회원탈퇴
  async function handleSignOut(memberId: number) {
    if (!window.confirm("회원탈퇴를 진행할까요?")) {
      return;
    }

    try {
      await userSignOut(memberId);
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setToast({ type: "Error", message: error.message });
      } else {
        setToast({ type: "Error", message: "회원탈퇴 중 오류 발생" });
      }
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
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => {
            if (!user?.memberId) {
              setToast({ type: "Error", message: "회원 정보를 찾을 수 없습니다." });
              return;
            }

            handleSignOut(user.memberId);
          }}
        >
          <span className="font-semibold">회원 탈퇴</span>
          <SvgArrowForward />
        </div>
      </div>
      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
