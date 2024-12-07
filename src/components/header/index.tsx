import cn from "@/lib/tailwind-cn";
import { PropsWithChildren } from "react";

export default function Header({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <header className={cn("w-full h-[56px] bg-white border border-transparent border-b-gray-100", className)}>
      {children}
    </header>
  );
}
