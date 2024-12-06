"use client";

import cn from "@/lib/tailwind-cn";
import { useState } from "react";
import NavigationTab from "./navigation-tab";

import AccountDefault from "@/assets/icons/account-default.svg";
import AccountPressed from "@/assets/icons/account-pressed.svg";
import FeedDefault from "@/assets/icons/feed-default.svg";
import FeedPressed from "@/assets/icons/feed-pressed.svg";
import WishlistDefault from "@/assets/icons/heart-default.svg";
import WishlistPressed from "@/assets/icons/heart-pressed.svg";
import HomeDefault from "@/assets/icons/home-default.svg";
import HomePressed from "@/assets/icons/home-pressed.svg";

const TABS = [
  {
    name: "홈",
    defaultIcon: HomeDefault,
    pressedIcon: HomePressed,
  },
  {
    name: "피드",
    defaultIcon: FeedDefault,
    pressedIcon: FeedPressed,
  },
  {
    name: "위시리스트",
    defaultIcon: WishlistDefault,
    pressedIcon: WishlistPressed,
  },
  {
    name: "마이페이지",
    defaultIcon: AccountDefault,
    pressedIcon: AccountPressed,
  },
];
export default function NavigationBar({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<string>("홈");

  return (
    <section
      className={cn(
        "flex w-full h-20 justify-around items-center gap-[10px] border border-transparent border-t-gray-400",
        className,
      )}
    >
      {TABS.map((tab) => (
        <NavigationTab
          key={tab.name}
          name={tab.name}
          defaultIcon={tab.defaultIcon}
          pressedIcon={tab.pressedIcon}
          isActive={activeTab === tab.name}
          onClick={() => setActiveTab(tab.name)}
        />
      ))}
    </section>
  );
}
