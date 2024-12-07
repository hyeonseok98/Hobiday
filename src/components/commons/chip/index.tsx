import cn from "@/lib/tailwind-cn";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";

type ChipState = "default" | "preSelected" | "selected" | "hashTag";

const chipVariants = cva(
  "inline-flex justify-center items-center px-3 py-[6px] rounded-lg font-semibold text-sm transition-colors duration-150 cursor-pointer",
  {
    variants: {
      state: {
        default: "bg-white text-gray-700 border border-gray-100 hover:bg-blue-50",
        preSelected: "bg-blue-50 text-gray-700 border border-transparent",
        selected: "bg-primary text-white border-transparent",
        hashTag: "bg-gray-50 text-gray-700 border border-transparent",
      },
    },
    compoundVariants: [
      {
        state: "hashTag",
        className: "font-normal text-xs cursor-default", // 해시태그 상태에서 hover와 pointer 제거
      },
    ],
    defaultVariants: {
      state: "default",
    },
  },
);

type ChipVariantProps = VariantProps<typeof chipVariants>;

type HtmlChipProps = Pick<ComponentProps<"button">, "onClick" | "className">;

type ChipProps = Omit<ChipVariantProps, "variant"> &
  HtmlChipProps & {
    label: string;
    state?: ChipState;
    isDelete?: boolean; // x 버튼 여부
    onClose?: () => void;
    onClick?: () => void;
    className?: string;
  };

export default function Chip({
  label,
  state = "default",
  isDelete = false,
  onClose,
  onClick,
  className,
  ...props
}: ChipProps) {
  return (
    <button className={cn(chipVariants({ state }), className)} onClick={onClick} {...props}>
      <span className="whitespace-nowrap">{label}</span>
      {isDelete && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="ml-[2px] flex items-center justify-center w-[18px] h-[18px] text-gray-500 cursor-pointer hover:text-gray-700 active:text-gray-900"
        >
          ×
        </div>
      )}
    </button>
  );
}

Chip.displayName = "Chip";
