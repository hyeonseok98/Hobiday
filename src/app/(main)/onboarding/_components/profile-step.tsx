import Button from "@/components/commons/button";
import Gap from "@/components/commons/gap";
import TextField from "@/components/commons/text-field";
import { StepLayout } from "@/components/layout";
import { useDebounce } from "@/hooks/use-debounce";
import { useCheckNickname } from "@/hooks/user/use-profile-registration";
import { useOnboardingStore } from "@/stores/use-onboarding.store";
import { validateNickname } from "@/utils/validate-nickname";
import { ChangeEvent, useEffect, useState } from "react";

type ProfileStepProps = {
  onNext: (profile: string) => void;
};

export default function ProfileStep({ onNext }: ProfileStepProps) {
  const { nickname, setNickname } = useOnboardingStore();
  const [inputValue, setInputValue] = useState(nickname);
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

  return (
    <StepLayout>
      <StepLayout.Title>
        시작하기 전 <br /> 당신의 닉네임을 정해주세요.
      </StepLayout.Title>

      <StepLayout.Content>
        <Gap vertical size={101} className="w-full" />
        <TextField className="px-[65px]">
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
      </StepLayout.Content>

      <StepLayout.Footer>
        <p className="text-center text-sm text-gray-600 mb-5">닉네임은 나중에 다시 수정할 수 있어요!</p>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={status !== "success"}
          onClick={status === "success" ? () => onNext(inputValue) : undefined}
        >
          다음
        </Button>
      </StepLayout.Footer>
    </StepLayout>
  );
}
