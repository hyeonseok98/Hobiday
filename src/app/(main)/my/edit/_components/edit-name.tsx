import { updateMyProfile } from "@/apis/user-api";
import SvgPencil from "@/assets/svgr-icons/Pencil";
import BottomSheet from "@/components/bottom-sheet";
import Button from "@/components/commons/button";
import TextField from "@/components/commons/text-field";
import { useBottomSheet } from "@/contexts";
import { PROFILE_KEYS } from "@/hooks/queries";
import { useDebounce } from "@/hooks/use-debounce";
import { useCheckNickname } from "@/hooks/user/use-profile-registration";
import { useUpdateProfileMutation } from "@/hooks/user/use-profile-update";
import { useOnboardingStore } from "@/stores/use-onboarding.store";
import { validateNickname } from "@/utils/validate-nickname";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

interface ProfileNameProps {
  profileNickname: string;
}

export default function EditProfileName({ profileNickname }: ProfileNameProps) {
  const { open, close } = useBottomSheet();
  const bottomSheetId = "editProfileName";
  const { mutate: updateProfile } = useUpdateProfileMutation();
  const { nickname, setNickname } = useOnboardingStore();
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue.trim(), 600);

  const [status, setStatus] = useState<"default" | "success" | "error">("default");
  const [message, setMessage] = useState("");

  const { data, isLoading } = useCheckNickname(debouncedValue);

  useEffect(() => {
    if (!debouncedValue) return;

    const { isValid, message } = validateNickname(inputValue);
    if (!isValid) {
      setStatus("error");
      setMessage(message);
      return;
    }

    if (isLoading) {
      setStatus("default");
      setMessage("닉네임을 확인 중입니다...");
    } else if (data?.profileMessage === "non-overlapping") {
      setStatus("success");
      setMessage("사용 가능한 닉네임입니다.");
    } else if (data?.profileMessage === "overlapping") {
      setStatus("error");
      setMessage("이미 사용 중인 닉네임입니다.");
    }
  }, [debouncedValue, data, isLoading, inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setNickname(value);
  };

  async function handleUpdate() {
    updateProfile(
      {
        profileNickname: inputValue,
      },
      {
        onSuccess: () => {
          alert("닉네임이 수정되었습니다.");
        },
        onError: () => {
          alert("닉네임 수정에 실패했습니다.");
        },
        onSettled: () => {
          close(bottomSheetId);
        },
      },
    );
  }

  return (
    <>
      {/* 닉네임 */}
      <div className="w-full bg-white py-4 mb-1 flex items-center justify-between">
        <div className="flex items-center px-4">
          <h3 className="text-sm font-semibold mr-9">닉네임</h3>
          <span className="text-sm font-semibold">{profileNickname}</span>
        </div>

        <button onClick={() => open(bottomSheetId)} className="px-4">
          <SvgPencil />
        </button>

        <BottomSheet id={bottomSheetId} height="35%">
          <BottomSheet.Title>닉네임</BottomSheet.Title>
          <BottomSheet.Contents>
            <TextField>
              <TextField.Label status={status}>닉네임</TextField.Label>
              <TextField.Input
                placeholder="닉네임을 입력하세요"
                value={inputValue}
                onChange={handleChange}
                status={status}
                maxLength={15}
              />
              <TextField.HelperText status={status}>{message}</TextField.HelperText>
            </TextField>

            <Button variant="primary" size="md" fullWidth onClick={handleUpdate} className="mt-10">
              저장
            </Button>
          </BottomSheet.Contents>
        </BottomSheet>
      </div>
    </>
  );
}
