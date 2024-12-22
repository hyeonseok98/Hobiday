"use client";

import cn from "@/lib/tailwind-cn";
import NavigationTab from "./navigation-tab";

import AccountDefault from "@/assets/icons/account-default.svg";
import AccountPressed from "@/assets/icons/account-pressed.svg";
import FeedDefault from "@/assets/icons/feed-default.svg";
import FeedPressed from "@/assets/icons/feed-pressed.svg";
import WishlistDefault from "@/assets/icons/heart-default.svg";
import WishlistPressed from "@/assets/icons/heart-pressed.svg";
import HomeDefault from "@/assets/icons/home-default.svg";
import HomePressed from "@/assets/icons/home-pressed.svg";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const NAVIGATION_TABS = [
  {
    name: "홈",
    path: "/",
    defaultIcon: HomeDefault,
    pressedIcon: HomePressed,
  },
  {
    name: "피드",
    path: "/feed",
    defaultIcon: FeedDefault,
    pressedIcon: FeedPressed,
  },
  {
    name: "위시리스트",
    path: "/wishlist",
    defaultIcon: WishlistDefault,
    pressedIcon: WishlistPressed,
  },
  {
    name: "마이페이지",
    path: "/my",
    defaultIcon: AccountDefault,
    pressedIcon: AccountPressed,
  },
];

export default function NavigationBar({ className }: { className?: string }) {
  const pathname = usePathname();

  const activeTab = useMemo(() => {
    // feed 이하 경로도 feed로 간주
    if (pathname.startsWith("/feed")) {
      return "피드";
    }
    // my 이하 경로도 my로 간주
    if (pathname.startsWith("/my")) {
      return "마이페이지";
    }
    return NAVIGATION_TABS.find((tab) => tab.path === pathname)?.name || "홈";
  }, [pathname]);

  return (
    <section
      className={cn(
        "flex w-full h-20 justify-around items-center gap-[10px] bg-white border border-transparent border-t-gray-400",
        className,
      )}
    >
      {NAVIGATION_TABS.map((tab) => (
        <NavigationTab
          key={tab.name}
          name={tab.name}
          href={tab.path}
          defaultIcon={tab.defaultIcon}
          pressedIcon={tab.pressedIcon}
          isActive={activeTab === tab.name}
        />
      ))}
    </section>
  );
}
