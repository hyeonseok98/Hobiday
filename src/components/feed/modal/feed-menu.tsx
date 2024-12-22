import { deleteFeed } from "@/apis/feed-api";
import DotsVertical from "@/assets/icons/dots-vertical.svg";
import Icon from "@/components/commons/icons";
import Modal from "@/components/modal";
import { useModal } from "@/contexts";
import useUploadTextStore from "@/stores/useUploadTextStore";
import { AllFeeds } from "@/types/feed/feed.type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FeedMenuProps {
  feed: AllFeeds;
}

export default function FeedMenuModal({ feed }: FeedMenuProps) {
  const router = useRouter();
  const { isOpen, open, close } = useModal();
  const [selectedFeedId, setSelectedFeedId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { setPerformId, setContent, setCategory, setHashTags, setPhotos, setFileUrls, setFeedId } =
    useUploadTextStore();

  function handleEditClick() {
    // 피드 업로드 페이지에 기존 데이터 미리 불러오기
    setPerformId(feed.performId);
    setContent(feed.contents);
    setCategory(feed.genreName);
    setHashTags(feed.hashTag);
    setFileUrls(feed.feedFiles);
    setPhotos(() => feed.feedFiles);
    setFeedId(feed.feedId);
    handleDeleteModalClose();
    router.push("/feed/upload");
  }

  async function handleDeleteClick(feedId: number) {
    try {
      await deleteFeed(feedId);
      alert("삭제 성공");
      router.push("/feed");
    } catch (error) {
      alert("삭제 실패");
      console.error(error);
    }
    handleDeleteModalClose();
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
    setSelectedFeedId(null);
    close();
  }

  return (
    <>
      {/* 모달 열기 버튼 */}
      <button
        onClick={() => {
          setSelectedFeedId(feed.feedId);
          open();
        }}
        className="cursor-pointer"
      >
        <Icon alt="menu" size={24}>
          <DotsVertical />
        </Icon>
      </button>

      {/* 메뉴 모달 */}
      {isOpen && selectedFeedId === feed.feedId && (
        <Modal onClose={handleDeleteModalClose}>
          <Modal.Title>피드를 수정/삭제하시겠어요?</Modal.Title>
          <Modal.Buttons>
            <button onClick={handleEditClick} className="w-full px-4 py-2 bg-primary text-white rounded-lg">
              수정
            </button>
            <button onClick={() => setIsDeleteModalOpen(true)} className="w-full px-4 py-2 text-gray-700 rounded-lg">
              삭제
            </button>
          </Modal.Buttons>
        </Modal>
      )}

      {/* 삭제 확인 모달 */}
      {isDeleteModalOpen && selectedFeedId === feed.feedId && (
        <Modal onClose={handleDeleteModalClose}>
          <Modal.Title>피드를 삭제하시겠어요?</Modal.Title>
          <Modal.Description>삭제 버튼 선택 시, 피드가 삭제되며 복구되지 않습니다.</Modal.Description>
          <Modal.Buttons>
            <button
              onClick={() => handleDeleteClick(feed.feedId)}
              className="w-full px-4 py-2 bg-primary text-white rounded-lg"
            >
              삭제
            </button>
            <button onClick={handleDeleteModalClose} className="w-full px-4 py-2 text-gray-700 rounded-lg">
              취소
            </button>
          </Modal.Buttons>
        </Modal>
      )}
    </>
  );
}
