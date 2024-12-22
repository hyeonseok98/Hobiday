import { MainLayout } from "@/components/layout";
import FollowerList from "./_components";

export default function FollowerPage() {
  const headerProps = {
    showBackButton: true,
    title: "팔로워",
  };

  return (
    <MainLayout headerProps={headerProps}>
      <FollowerList />
    </MainLayout>
  );
}
