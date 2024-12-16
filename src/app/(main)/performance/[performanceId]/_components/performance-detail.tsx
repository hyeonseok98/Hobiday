"use client";

import Chip from "@/components/commons/chip";
import Gap from "@/components/commons/gap";
import { SectionLayout } from "@/components/layout";
import Image from "next/image";
import { useParams } from "next/navigation";

import { CalendarMonth, Location } from "@/assets/svgr-icons";
import Icon from "@/components/commons/icons";
import LoadingSpinner from "@/components/commons/spinner";
import { usePerformanceDetailAll } from "@/hooks";

interface InfoSectionProps {
  title: string;
  content: string | null | undefined;
  placeholder: string;
  children?: React.ReactNode;
}

const InfoSection = ({ title, content, placeholder, children }: InfoSectionProps) => (
  <SectionLayout className="px-5 py-6">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    {children ? (
      <div className="flex flex-col justify-center items-start">{children}</div>
    ) : (
      <p className="text-sm text-textColor">{content?.trim() || placeholder}</p>
    )}
  </SectionLayout>
);

export default function PerformanceDetail() {
  const params = useParams();
  const performanceId = params?.performanceId?.toString();

  const { data, isLoading, isError } = usePerformanceDetailAll(performanceId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError || !data) {
    return <div className="flex justify-center items-center h-[300px]">데이터를 불러오는데 문제가 생겼습니다...</div>;
  }

  return (
    <section className="min-h-screen">
      <div className="relative w-full h-[170px]">
        <Image src={data.posterUrl} alt={data.name} fill className="object-cover" />
      </div>
      {/* 검은색 반투명 레이어 */}
      <div className="absolute inset-0 h-[170px] mt-header bg-black/40" />

      {/* 포스터 이미지 */}
      <div className="absolute pl-4" style={{ top: "calc(var(--header-height) + 72px)" }}>
        <Image src={data.posterUrl} alt={data.name} className="object-cover rounded-lg" width={144} height={205.76} />
      </div>

      <Gap vertical size={103} />
      {/* 기본 정보 */}
      <SectionLayout className="py-6">
        <div className="mb-4">
          <Chip label={data.genre} state="hashTag" />
        </div>
        <h1 className="mb-3 text-xl font-bold">{data.name}</h1>
        <div className="flex items-center">
          <Icon size={16} className="mr-1">
            <Location width={9.29} height={13} className="fill-black" />
          </Icon>
          <h3 className="text-textColor text-sm">{data.location.place}</h3>
        </div>
        <div className="flex items-center">
          <Icon size={16} className="mr-1">
            <CalendarMonth width={12} height={13} className="fill-black" />
          </Icon>
          <h3 className="text-textColor text-sm">
            {data.date.start} - {data.date.end}
          </h3>
        </div>
      </SectionLayout>

      <Gap vertical size={16} className="bg-blue-50" />
      {/* 상세 내용 */}
      <InfoSection title="공연 상세내용" content="" placeholder="">
        <Image src={data.storyImageUrl} alt={data.name} width={360} height={450} />
      </InfoSection>

      <Gap vertical size={16} className="bg-blue-50" />
      <InfoSection title="공연 출연진" content={data.cast} placeholder="공연자 정보가 없습니다." />

      <Gap vertical size={16} className="bg-blue-50" />
      <InfoSection title="티켓 가격" content={data.ticket.price} placeholder="티켓 가격 정보가 없습니다." />

      <Gap vertical size={16} className="bg-blue-50" />
      <InfoSection title="공연 기간 및 시간" content={data.showtime} placeholder="공연 시간 정보가 없습니다." />

      <Gap vertical size={16} className="bg-blue-50" />
      <InfoSection title="공연 위치" content="" placeholder="">
        <p className="text-sm text-textColor">
          {data.location.area?.trim() || "지역 정보가 없습니다."} <br />
          {data.location.place?.trim() || "장소 정보가 없습니다."}
        </p>
      </InfoSection>
    </section>
  );
}
