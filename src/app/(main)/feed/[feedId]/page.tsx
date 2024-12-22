import SvgPencil from "@/assets/svgr-icons/Pencil";
import SvgSearch from "@/assets/svgr-icons/Search";
import { MainLayout } from "@/components/layout";
import FeedIdComponent from "./_components";

export default function FeedIdPage({ params }: { params: { feedId: string } }) {
  const feedId = Number(params.feedId);
  const headerProps = {
    title: "피드",
    showBackButton: true,
    rightIcons: [
      { icon: <SvgPencil />, path: "/feed/upload", size: 24 },
      { icon: <SvgSearch />, path: "/search", size: 24 },
    ],
  };

  return (
    <MainLayout headerProps={headerProps}>
      <FeedIdComponent feedId={feedId} />
    </MainLayout>
  );
}
