import { MainLayout } from "@/components/layout";
import ProfileSettingPage from "./_components";

export default function SettingPage() {
  const headerprops = {
    showBackButton: true,
    title: "설정",
  };

  return (
    <MainLayout headerProps={headerprops}>
      <ProfileSettingPage />
    </MainLayout>
  );
}
