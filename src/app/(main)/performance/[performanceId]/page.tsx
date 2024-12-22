import { MainLayout } from "@/components/layout";
import PerformanceDeatil from "./_components";

export default function PerformanceDetailPage() {
  return (
    <MainLayout headerProps={{ showBackButton: true }}>
      <PerformanceDeatil />
    </MainLayout>
  );
}
