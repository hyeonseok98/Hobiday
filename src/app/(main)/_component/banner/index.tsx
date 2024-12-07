import SectionLayout from "@/components/section-layout";
import Image from "next/image";
import Link from "next/link";

export default function AdBanner() {
  return (
    <SectionLayout className="h-[432px] pt-4 pb-[18px]">
      <Link href="/my" className="relative block w-[398px] h-[398px]">
        <Image src="/banner/snowFlake.svg" alt="콘서트 눈꽃의 여정" fill className="object-cover" />
      </Link>
    </SectionLayout>
  );
}
