import UploadPage from "@/components/feed/upload";
import { Suspense } from "react";

export default function FeedUploadPage() {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <UploadPage />
      </Suspense>
    </div>
  );
}
