import CommentPage from "@/components/feed/comment";
import { MainLayout } from "@/components/layout";
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
