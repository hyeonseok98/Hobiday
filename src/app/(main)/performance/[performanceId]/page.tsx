import { MainLayout } from "@/components/layout";
import PerformanceDeatil from "./_components/performance-detail";

export default function PerformanceDetailPage() {
  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <PerformanceDeatil />
    </MainLayout>
  );
}
