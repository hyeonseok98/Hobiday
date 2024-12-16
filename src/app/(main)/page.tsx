import { MainLayout } from "@/components/layout";
import AdBanner from "./_components/banner";
import PerformanceList from "./_components/performance-list";

import Search from "@/assets/icons/search.svg";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TextLogo from "../../../public/img/logo-text.svg";

export default function HomePage() {
  const headerProps = {
    leftIcons: [{ icon: <TextLogo />, path: "/" }],
    rightIcons: [{ icon: <Search />, path: "/search", size: 24 }],
  };

  const refreshToken = cookies().get("refreshToken");

  if (!refreshToken) {
    redirect("/login");
  }

  return (
    <MainLayout headerProps={headerProps}>
      <AdBanner />
      <PerformanceList />
    </MainLayout>
  );
}
