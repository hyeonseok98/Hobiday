import { MainLayout } from "@/components/layout";

export default function WishlistPage() {
  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-600">
        고도화 기간 중 업데이트 예정입니다.
      </div>
    </MainLayout>
  );
}
