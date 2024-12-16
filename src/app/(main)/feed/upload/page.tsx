import UploadPage from "@/components/feed/upload";
import { MainLayout } from "@/components/layout";

export default function FeedUploadPage() {
  // function handleFeedUpload() {
  //   console.log("API 연결 예정");
  // }

  return (
    <div className="relative flex flex-col min-h-screen">
      <UploadPage />
    </div>
  );
}
