"use client";

import { getMyProfile } from "@/apis/user-api";
import { MainLayout } from "@/components/layout";
import { useModal } from "@/contexts";
import { useUserStore } from "@/stores/useUserStore";
import { useEffect } from "react";

export default function MyPage() {
  const { open, close } = useModal();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const data = await getMyProfile();
        console.log(data);
        setUser(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        고도화 기간 중 업데이트 예정입니다.
      </div>
    </MainLayout>
  );
}
