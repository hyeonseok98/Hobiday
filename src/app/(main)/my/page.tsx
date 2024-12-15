"use client";

import { MainLayout } from "@/components/layout";
import Modal from "@/components/modal";
import { useModal } from "@/contexts";

export default function MyPage() {
  const { open, close } = useModal();

  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* 모달 열기 버튼 */}
        <button className="px-4 py-2 bg-primary text-white rounded-lg" onClick={open}>
          모달 열기
        </button>

        {/* 모달 컴포넌트 */}
        <Modal>
          <Modal.Title>모달 제목</Modal.Title>
          <Modal.Description>모달 본문 내용입니다. 설명을 여기에 추가하세요.</Modal.Description>
          <Modal.Buttons>
            <button onClick={close} className="w-full px-4 py-2 bg-primary text-white rounded-lg">
              확인
            </button>
            <button onClick={close} className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
              취소
            </button>
          </Modal.Buttons>
        </Modal>
      </div>
    </MainLayout>
  );
}
