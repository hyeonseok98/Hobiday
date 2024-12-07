import cn from "@/lib/tailwind-cn";
import { PropsWithChildren } from "react";

export default function SectionLayout({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("px-4", className)}>{children}</section>;
}
