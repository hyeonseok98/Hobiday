import { deleteComment, updateComment } from "@/apis/comment-api";
import { useModal } from "@/contexts";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal";

interface CommentCardProps {
  id: number;
  contents: string;
  profileName: string;
  profileImageUrl: string;
  relativeTime: string;
  fetchComments: () => void;
}

export default function CommentCard({
  id,
  contents,
  profileName,
  profileImageUrl,
  relativeTime,
  fetchComments,
}: CommentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContents, setEditedContents] = useState(contents);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, open, close } = useModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(null);

  // 텍스트 컨텐츠가 3줄 이상인지 확인
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [contents]);

  async function handleUpdateComment() {
    try {
      const params = {
        commentId: id,
        data: { contents: editedContents },
      };
      await updateComment(params);
      setIsEditing(false);
      alert("댓글 수정 성공");
      await fetchComments();
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
      alert("댓글 수정에 실패했습니다.");
    }
  }

  async function handleDeleteComment() {
    try {
      await deleteComment(id);
      alert("댓글 삭제 성공");
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
    handleDeleteModalClose();
    await fetchComments();
  }

  function handleDeleteModalClose() {
    setIsDeleteModalOpen(false);
    setSelectedCommentId(null);
    close();
  }

  return (
    <div className="p-4">
      {/* 유저 프로필 */}
      <div className="flex items-center mb-3">
        <Image
          src={profileImageUrl || "https://via.placeholder.com/40"}
          alt={`${profileName} profile`}
          width={28}
          height={28}
          className="rounded-full mr-2 w-7 h-7"
          unoptimized
        />
        <div className="font-semibold text-xs">{profileName}</div>
      </div>

      {/* 댓글 내용 */}
      <div className="text-xs relative mx-9">
        {isEditing ? (
          <div>
            <textarea
              className="w-full border p-2 rounded resize-none"
              value={editedContents}
              onChange={(e) => setEditedContents(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button onClick={handleUpdateComment} className="bg-blue-500 text-white text-xs py-1 px-2 rounded">
                수정하기
              </button>
            </div>
          </div>
        ) : (
          <section
            ref={contentRef}
            className={`overflow-hidden relative ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}
          >
            {isOverflowing && !isExpanded && (
              <button
                onClick={() => setIsExpanded(true)}
                className="float-right mt-8 [shape-outside:border-box] text-gray-600 cursor-pointer px-1"
              >
                더보기
              </button>
            )}
            {contents}
          </section>
        )}
      </div>

      {/* 작성 시간 및 옵션 */}
      <div className="flex items-center mx-9 my-3 text-[10px] text-gray-500">
        <div className="mr-3">{relativeTime}</div>
        {profileName && (
          <div className="flex space-x-2">
            {isEditing ? (
              <button onClick={() => setIsEditing(false)} className="text-gray-500">
                취소
              </button>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)}>수정</button>
                <button
                  onClick={() => {
                    setSelectedCommentId(id);
                    open();
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {isOpen && selectedCommentId === id && (
        <Modal onClose={handleDeleteModalClose}>
          <Modal.Title>댓글을 삭제하시겠어요?</Modal.Title>
          <Modal.Description>삭제 버튼 선택 시, 댓글은 삭제되며 복구되지 않습니다.</Modal.Description>
          <Modal.Buttons>
            <button onClick={handleDeleteComment} className="w-full px-4 py-2 bg-primary text-white rounded-lg">
              삭제
            </button>
            <button onClick={handleDeleteModalClose} className="w-full px-4 py-2 text-gray-700 rounded-lg">
              취소
            </button>
          </Modal.Buttons>
        </Modal>
      )}
    </div>
  );
}
