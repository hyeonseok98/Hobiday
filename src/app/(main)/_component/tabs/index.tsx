import Chip from "@/components/commons/chip";
import SectionLayout from "@/components/section-layout";

export default function Tabs() {
  return (
    <SectionLayout className="flex h-11 gap-3 py-[6px]">
      <Chip label="전체" />
      <Chip label="연극" />
      <Chip label="무용" />
      <Chip label="대중무용" />
      <Chip label="서커스/마술" />
      <Chip label="복합" />
    </SectionLayout>
  );
}
