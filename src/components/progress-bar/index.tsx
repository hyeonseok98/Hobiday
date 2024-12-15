import cn from "@/lib/tailwind-cn";

type ProgressBarProps = {
  currentStepIndex: number; // 현재 Step 인덱스
  totalSteps: number; // 전체 Step 수
  className?: string;
};

export default function ProgressBar({ currentStepIndex, totalSteps, className }: ProgressBarProps) {
  const progress = ((currentStepIndex + 1) / totalSteps) * 100;

  return (
    <div className={cn("relative w-full h-1 bg-gray-200", className)}>
      <div
        className="absolute top-0 left-0 h-1 bg-primary transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
