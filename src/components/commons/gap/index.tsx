import cn from "@/lib/tailwind-cn";

type GapProps = {
  size?: number;
  horizontal?: boolean; // 가로 여백 여부
  vertical?: boolean; // 세로 여백 여부
  className?: string;
};

export default function Gap({ size = 16, horizontal = false, vertical = true, className = "" }: GapProps) {
  return (
    <div
      className={cn(className, vertical && "w-full", horizontal && "h-full")}
      style={{
        display: horizontal && vertical ? "block" : "inline-block",
        width: horizontal ? size : undefined,
        height: vertical ? size : undefined,
      }}
    />
  );
}
