import { MainLayout } from "@/components/layout";
import CommentPage from "@/components/feed/comment";
import { Suspense } from "react";

export default function CommentsPage() {
  return (
    <MainLayout headerProps={{ title: "댓글", showBackButton: true }}>
      <Suspense>
        <CommentPage />
      </Suspense>
    </MainLayout>
  );
}
