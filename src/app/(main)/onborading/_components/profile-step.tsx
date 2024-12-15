"use client";

import Button from "@/components/commons/button";
import TextField from "@/components/commons/text-field";
import { useDebounce } from "@/hooks/use-debounce";
import { useCheckNickname } from "@/hooks/user/use-profile-registration";
import { useOnboardingStore } from "@/stores/use-onboarding.store";
import { ChangeEvent, useEffect, useRef, useState } from "react";

type ProfileStepProps = {
  onNext: (nickname: string) => void;
};

export default function ProfileStep({ onNext }: ProfileStepProps) {
  const { nickname, setNickname } = useOnboardingStore();
  const [inputValue, setInputValue] = useState(nickname);
  const debouncedValue = useDebounce(inputValue, 500); // 디바운싱 적용

  const [status, setStatus] = useState<"default" | "success" | "error">("default");
  const [message, setMessage] = useState("");

  const prevNicknameRef = useRef<string | null>(null); // 이전 값 추적

  // 닉네임 중복 체크 API 호출
  const { data, isLoading } = useCheckNickname(debouncedValue);

  // API 결과에 따른 상태 설정
  useEffect(() => {
    if (!debouncedValue || debouncedValue === prevNicknameRef.current) return;

    const profileMessage = data?.result?.[0]?.profileMessage;

    if (isLoading) {
      setStatus("default");
      setMessage("닉네임을 확인 중입니다...");
      return;
    }

    switch (profileMessage) {
      case "non-overlapping":
        setStatus("success");
        setMessage("사용 가능한 닉네임입니다.");
        break;
      case "overlapping":
        setStatus("error");
        setMessage("이미 사용 중인 닉네임입니다.");
        break;
      default:
        setStatus("default");
        setMessage("");
    }

    prevNicknameRef.current = debouncedValue; // 이전 값 업데이트
  }, [data, isLoading, debouncedValue]);

  // 입력값 변경 핸들러
  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value); // 입력값 상태 업데이트
    setNickname(value); // Zustand 상태 업데이트
  };

  return (
    <div className="flex flex-col h-[calc(100vh-var(--header-height)-4px)]">
      {/* Header */}
      <div className="mt-9 px-[23px]">
        <h1 className="text-[32px] font-semibold">
          시작하기 전 <br /> 당신의 닉네임을 정해주세요.
        </h1>
      </div>

      {/* 닉네임 입력 필드 */}
      <div className="mt-[101px] px-[89px]">
        <TextField>
          <TextField.Label status={status}>닉네임</TextField.Label>
          <TextField.Input
            placeholder="닉네임을 입력하세요"
            value={inputValue}
            onChange={handleNicknameChange}
            status={status}
            maxLength={15}
          />
          <TextField.HelperText status={status}>{message}</TextField.HelperText>
        </TextField>
      </div>

      {/* 버튼 */}
      <div className="mt-auto px-4 pb-5">
        <div className="text-center text-sm text-gray-600 mb-5">닉네임은 나중에 다시 수정할 수 있어요!</div>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => onNext(nickname)}
          disabled={status !== "success"} // 성공 상태에서만 버튼 활성화
        >
          다음
        </Button>
      </div>
    </div>
  );
}
