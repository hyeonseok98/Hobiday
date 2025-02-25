import cn from "@/lib/tailwind-cn";
import Link from "next/link";

type NavigationTabProps = {
  name: string;
  href: string;
  defaultIcon: React.ReactElement;
  pressedIcon: React.ReactElement;
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
      aria-current={isActive ? "page" : undefined}
      aria-label={`${name} 페이지로 이동`}
    >
      <div className="flex justify-center items-center w-6 h-6">{Icon}</div>
      <span className={`text-xs font-semibold ${isActive ? "text-primary" : "text-gray-500"}`}>{name}</span>
    </Link>
  );
}
