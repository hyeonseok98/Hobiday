"use client";

import cn from "@/lib/tailwind-cn";
import { ReactNode } from "react";

type StepLayoutProps = {
  children: ReactNode;
  className?: string;
};

function StepLayout({ children, className }: StepLayoutProps) {
  return (
    <section className={cn("flex flex-col h-[calc(100vh-var(--header-height)-4px)]", className)}>{children}</section>
  );
}

function Title({ className, children }: { className?: string; children: ReactNode }) {
  return <h1 className={cn("px-6 pt-9 text-[32px] font-semibold leading-snug", className)}>{children}</h1>;
}

function Content({ children }: { children: ReactNode }) {
  return <div className="flex-grow px-6">{children}</div>;
}

function Footer({ children }: { children: ReactNode }) {
  return <footer className="px-4 pb-5">{children}</footer>;
}

StepLayout.Title = Title;
StepLayout.Content = Content;
StepLayout.Footer = Footer;

export default StepLayout;
