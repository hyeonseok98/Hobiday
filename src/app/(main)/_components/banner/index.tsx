import SectionLayout from "@/components/layout/section-layout";
import Image from "next/image";

export default function AdBanner() {
  return (
    <SectionLayout className="h-[432px] pt-4 pb-[18px]">
      {/* <Link href="/my" className="relative block w-[398px] h-[398px]"> */}
      <div className="relative block w-[398px] h-[398px]">
        <Image src="/banner/temp-snowflake.svg" alt="콘서트 눈꽃의 여정" fill className="object-cover" />
      </div>
      {/* </Link> */}
    </SectionLayout>
  );
}
