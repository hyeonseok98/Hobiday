"use client";

import Search from "@/assets/icons/search.svg";
import { MainLayout } from "@/components/layout";
import TextLogo from "../../../public/img/logo-text.svg";
import AdBanner from "./_components/banner";
import PerformanceList from "./_components/performance-list";

export default function HomePage() {
  const headerProps = {
    leftIcons: [{ icon: <TextLogo />, path: "/", alt: "Go main page" }],
    rightIcons: [{ icon: <Search />, path: "/search", size: 24, alt: "Go search page" }],
  };

  return (
    <MainLayout headerProps={headerProps}>
      <AdBanner />
      <PerformanceList />
    </MainLayout>
  );
}
