import Pencil from "@/assets/icons/pencil.svg";
import Search from "@/assets/icons/search.svg";
import FeedPageList from "@/components/feed/index";
import { MainLayout } from "@/components/layout";
import TextLogo from "../../../../public/img/logo-text.svg";

export default function FeedPage() {
  const headerProps = {
    title: "피드",
    leftIcons: [{ icon: <TextLogo />, path: "/" }],
    rightIcons: [
      { icon: <Pencil />, path: "/feed/upload", size: 24 },
      { icon: <Search />, path: "/search", size: 24 },
    ],
  };

  return (
    <MainLayout headerProps={headerProps}>
      <FeedPageList />
    </MainLayout>
  );
}
