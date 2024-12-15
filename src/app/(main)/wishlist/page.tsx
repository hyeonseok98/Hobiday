"use client";

import BottomSheet from "@/components/bottom-sheet";
import { MainLayout } from "@/components/layout";
import { useBottomSheet } from "@/contexts/bottom-sheet.context";

export default function WishlistPage() {
  const { open, close } = useBottomSheet();

  const headerProps = {
    title: "위시",
    showBackButton: true,
    rightText: "저장",
    // onRightTextClick: () => {},
  };

  return (
    <MainLayout headerProps={headerProps}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <button className="px-4 py-2 bg-primary text-white rounded" onClick={open}>
          위시리스트 관리
        </button>

        <BottomSheet height="50%">
          <BottomSheet.Title>위시리스트 항목 추가</BottomSheet.Title>
          <BottomSheet.Contents>
            <p className="text-sm text-gray-600 mb-4">아래 항목을 추가하거나 위시리스트를 업데이트하세요.</p>
            <ul className="pl-5 mb-4">
              <li>항목 1: 최신 기기</li>
              <li>항목 2: 여행 계획</li>
              <li>항목 3: 새로운 책</li>
            </ul>
            <button
              className="w-full px-4 py-2 bg-primary text-white rounded-lg mb-2"
              onClick={() => alert("새 항목 추가 버튼 클릭")}
            >
              새 항목 추가
            </button>
            <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={close}>
              닫기
            </button>
          </BottomSheet.Contents>
        </BottomSheet>
      </div>
    </MainLayout>
  );
}
