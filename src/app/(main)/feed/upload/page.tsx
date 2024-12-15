import { MainLayout } from "@/components/layout";
import UploadPage from "@/components/feed/upload";

const headerProps = {
  title: "피드",
  showBackButton: true,
  rightText: "올리기",
  // onRightTextClick: () => {},
};

export default function FeedUploadPage() {
  // function handleFeedUpload() {
  //   console.log("API 연결 예정");
  // }

  return (
    <MainLayout headerProps={headerProps}>
      <UploadPage />
    </MainLayout>
  );
}
