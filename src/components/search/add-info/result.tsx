"use client";

import Location from "@/assets/icons/location.svg";
import Search from "@/assets/icons/search.svg";
import Icon from "@/components/commons/icon";
import { SectionLayout } from "@/components/layout";
import { useSearchStore } from "@/stores/useSearchStore";
import useUploadTextStore from "@/stores/useUploadTextStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchCard from "../card";

interface SelectPerformanceButtonProps {
  onConfirm: () => void;
  disabled: boolean;
}

function SelectPerformanceButton({ onConfirm, disabled }: SelectPerformanceButtonProps) {
  return (
    <button
      onClick={onConfirm}
      className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:bg-gray-300"
      disabled={disabled}
    >
      선택하기
    </button>
  );
}

export default function AddInfoSearchResult() {
  const router = useRouter();
  const { searchQuery } = useSearchStore();
  const { setPerformId } = useUploadTextStore();
  const [tempPerformance, setTempPerformance] = useState("");

  function handlePerformanceChange(performance: string) {
    setTempPerformance(performance);
  }

  function handleConfirm() {
    if (tempPerformance) {
      setPerformId(tempPerformance);
      router.back();
    }
  }

  // searchQuery를 공연명으로 검색 결과 조회 API 호출

  return (
    <SectionLayout className="space-y-4">
      <ul className="flex flex-col py-4 gap-2">
        {RESULT_MOCKUP_DATA.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="mb-4">
              <Icon size={24}>
                <Search />
              </Icon>
            </div>
            <p className="text-lg font-semibold text-red-500 mb-2">검색 결과가 없습니다!</p>
            <p className="text-sm text-gray-600 text-center">
              입력하신 키워드를 다시 확인하거나 다른 검색어를 입력해보세요.
            </p>
          </div>
        ) : (
          RESULT_MOCKUP_DATA.map((performance) => (
            <li key={performance.performId} className="flex items-center justify-start p-2">
              <label htmlFor={performance.performId} className="cursor-pointer flex items-center justify-center w-full">
                <input
                  type="radio"
                  id={performance.performId}
                  name="performance"
                  value={JSON.stringify(performance)}
                  checked={tempPerformance === performance.performId}
                  onChange={() => handlePerformanceChange(performance.performId)}
                  className="w-5 h-5 text-primary border-gray-300 checked:bg-primary mr-4"
                />
                <SearchCard
                  key={performance.performId}
                  className="cursor-pointer flex items-center justify-start w-[356px]"
                >
                  <SearchCard.Image
                    src={performance.poster}
                    alt={performance.performName}
                    width={"w-[60px]"}
                    height={"h-[60px]"}
                  />
                  <SearchCard.Content
                    title={performance.performName}
                    category={performance.genreName}
                    info={performance.placeName}
                    svgr={<Location />}
                  />
                </SearchCard>
              </label>
            </li>
          ))
        )}
      </ul>
      <div className="absolute bottom-20 w-[430px] px-4">
        <SelectPerformanceButton onConfirm={handleConfirm} disabled={!tempPerformance} />
      </div>
    </SectionLayout>
  );
}

const RESULT_MOCKUP_DATA = [
  {
    performId: "PF253504",
    performName: "초록마술사의 크리스마스 매직쇼 [부산]",
    startDate: "2024.11.30",
    endDate: "2024.12.25",
    genreName: "서커스/마술",
    performState: "공연중",
    placeName: "초록마술극장",
    openRun: false,
    area: "부산광역시",
    poster: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF253504_241112_155450.jpg",
    likeCount: 6,
  },
  {
    performId: "PF254935",
    performName: "신기한 마술사전 [인천 (앵콜) ]",
    startDate: "2024.11.30",
    endDate: "2025.03.30",
    genreName: "서커스/마술",
    performState: "공연중",
    placeName: "루시드아트홀",
    openRun: false,
    area: "인천광역시",
    poster: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF254935_241202_095010.jpg",
    likeCount: 4,
  },
  {
    performId: "PF255447",
    performName: "어린이 벌룬쇼, 상상풍선마술단 [창원]",
    startDate: "2024.12.07",
    endDate: "2025.01.26",
    genreName: "서커스/마술",
    performState: "공연중",
    placeName: "창원 스타인웨이홀(상상플레이스, G.I.L. 아트홀)",
    openRun: false,
    area: "경상남도",
    poster: "http://www.kopis.or.kr/upload/pfmPoster/PF_PF255447_241209_112913.png",
    likeCount: 0,
  },
];
