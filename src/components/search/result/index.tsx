"use client";

import Location from "@/assets/icons/location.svg";
import Search from "@/assets/icons/search.svg";
import Card from "@/components/card";
import Chip from "@/components/commons/chip";
import Icon from "@/components/commons/icons";
import { SectionLayout } from "@/components/layout";
import { useSearchStore } from "@/stores/useSearchStore";

export default function SearchResult() {
  const { searchQuery } = useSearchStore();

  // searchQuery를 공연명으로 검색 결과 조회 API 호출

  return (
    <SectionLayout className="flex flex-col py-4 gap-3">
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
          <Card href={"/"} key={performance.performId} className="w-full">
            <Card.Image src={performance.poster} alt={performance.performName} width={"w-[88px]"} height={"h-[88px]"} />
            <Card.Content>
              <Card.Category>
                <Chip label={performance.genreName} state="hashTag" />
              </Card.Category>
              <Card.Title>{performance.performName}</Card.Title>
              <Card.Info svgr={<Location />} info={performance.placeName} />
            </Card.Content>
          </Card>
        ))
      )}
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
