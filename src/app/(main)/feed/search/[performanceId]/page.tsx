import LikeGradientPressed from "@/assets/svgr-icons/like-gradient-pressed";
import Icon from "@/components/commons/icons";
import { MainLayout } from "@/components/layout";
import PerformSearchFeed from "./_components";

export default function page() {
  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <div className="flex flex-col items-center justify-center h-content text-gray-600 gap-4">
        <PerformSearchFeed />
      </div>
    </MainLayout>
  );
}
