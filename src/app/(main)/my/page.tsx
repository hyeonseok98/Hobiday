import Settings from "@/assets/icons/setting.svg";
import { MainLayout } from "@/components/layout";
import TextLogo from "../../../../public/img/logo-text.svg";
import MyProfilePage from "./_components/myprofile";

export default function MyPage() {
  const headerProps = {
    leftIcons: [{ icon: <TextLogo />, path: "/" }],
    rightIcons: [{ icon: <Settings />, path: "/my/setting", size: 24 }],
  };

  return (
    <MainLayout headerProps={headerProps}>
      <MyProfilePage />
    </MainLayout>
  );
}
