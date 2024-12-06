import cn from "@/lib/tailwind-cn";

export default function NavigationTab({
  name,
  defaultIcon,
  pressedIcon,
  isActive,
  onClick,
}: {
  name: string;
  defaultIcon: React.ElementType;
  pressedIcon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = isActive ? pressedIcon : defaultIcon;

  return (
    <button
      className={cn(
        "flex flex-col items-center justify-center w-[96px] h-20 gap-2",
        `${isActive ? "text-primary" : "text-gray-400"}`,
      )}
      onClick={onClick}
    >
      <div className="flex justify-center items-center w-6 h-6">
        <Icon className={`${isActive ? "fill-primary" : "fill-transparent"}`} />
      </div>
      <span className={`text-xs font-semibold ${isActive ? "text-primary" : "text-gray-400"}`}>{name}</span>
    </button>
  );
}
