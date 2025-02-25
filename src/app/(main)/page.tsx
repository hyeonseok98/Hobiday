import Search from "@/assets/icons/search.svg";
import { MainLayout } from "@/components/layout";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TextLogo from "../../../public/img/logo-text.svg";
import AdBanner from "./_components/banner";
import PerformanceList from "./_components/performance-list";

export default function HomePage() {
  const headerProps = {
    leftIcons: [{ icon: <TextLogo />, path: "/", alt: "Go main page" }],
    rightIcons: [{ icon: <Search />, path: "/search", size: 24, alt: "Go search page" }],
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
