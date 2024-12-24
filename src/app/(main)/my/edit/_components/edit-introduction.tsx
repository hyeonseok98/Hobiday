import { updateMyProfile } from "@/apis/user-api";
import SvgPencil from "@/assets/svgr-icons/Pencil";
import BottomSheet from "@/components/bottom-sheet";
import Button from "@/components/commons/button";
import { useBottomSheet } from "@/contexts";
import { useUpdateProfileMutation } from "@/hooks/user/use-profile-update";
import { useState } from "react";

interface ProfileIntroductionProps {
  profileIntroduction: string;
}

export default function EditProfileIntroduction({ profileIntroduction }: ProfileIntroductionProps) {
  const { open, close } = useBottomSheet();
  const bottomSheetId = "editProfileIntroduction";
  const [content, setContent] = useState(profileIntroduction || "");
  const { mutate: updateProfile } = useUpdateProfileMutation();

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  async function handleUpdate() {
    updateProfile(
      {
        profileIntroduction: content,
      },
      {
        onSuccess: () => {
          alert("수정이 완료되었습니다.");
        },
        onError: () => {
          alert("수정에 실패했습니다.");
        },
        onSettled: () => {
          close(bottomSheetId);
        },
      },
    );
  }
  return (
    <>
      {/* 자기소개 */}
      <div className="w-full bg-white py-4 mb-1 flex items-center justify-between">
        <div className="flex items-center px-4">
          <h3 className="text-sm font-semibold whitespace-nowrap">자기소개</h3>
          <div className="flex text-sm px-6">
            <span>{profileIntroduction}</span>
          </div>
        </div>

        <button onClick={() => open(bottomSheetId)} className="px-4">
          <SvgPencil />
        </button>

        <BottomSheet id={bottomSheetId} height="40%">
          <BottomSheet.Title>자기소개</BottomSheet.Title>
          <BottomSheet.Contents>
            <div className="w-[300px] border border-gray-400 rounded-lg mx-auto relative">
              <textarea
                value={content}
                maxLength={150}
                onChange={handleContentChange}
                className="w-full min-h-16 text-sm p-2 border-none focus:outline-none resize-none "
              />

              <div className="absolute bottom-2 right-2">
                <span className="text-right text-gray-500 text-xs">{content.length} / 150</span>
              </div>
            </div>
            <span className="flex justify-center text-xs text-gray-500">
              자기소개는 공백 포함 10자 ~ 150자까지 입력 가능합니다.
            </span>

            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleUpdate}
              className="mt-8 text-base font-semibold"
            >
              적용하기
            </Button>
          </BottomSheet.Contents>
        </BottomSheet>
      </div>
    </>
  );
}
