import cn from "@/lib/tailwind-cn";
import Link from "next/link";

type NavigationTabProps = {
  name: string;
  href: string;
  defaultIcon: React.ElementType;
  pressedIcon: React.ElementType;
  isActive: boolean;
};

export default function NavigationTab({ ...props }: NavigationTabProps) {
  const { name, href, defaultIcon, pressedIcon, isActive } = props;
  const Icon = isActive ? pressedIcon : defaultIcon;

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center justify-center w-[96px] h-20 gap-2",
        `${isActive ? "text-primary" : "text-gray-400"}`,
      )}
      role="tab"
      aria-selected={isActive} // 활성화된 탭 스크린 리더에 표시
      aria-current={isActive ? "page" : undefined}
    >
      <div className="flex justify-center items-center w-6 h-6">
        <Icon className={`${isActive ? "fill-primary" : "fill-transparent"}`} />
      </div>
      <span className={`text-xs font-semibold ${isActive ? "text-primary" : "text-gray-400"}`}>{name}</span>
    </Link>
  );
}
