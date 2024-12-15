import { useSearchStore } from "@/stores/useSearchStore";

type Recommendation = {
  performId: string;
  performName: string;
  genreName: string;
};

export default function SearchRecommend() {
  const { setSearchQuery } = useSearchStore();

  // 추천 검색어 목록 API 호출

  // 추천 검색어 클릭 시 검색창에 추천 검색어 입력
  function handleClick(item: Recommendation) {
    return () => {
      setSearchQuery(item.performName);
    };
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">추천 검색어</h2>
      <ul>
        {RECOMMEND_MOCKUP_DATA.map((item, index) => (
          <li key={item.performId} className="text-base">
            <div className="flex items-center gap-3 py-2 text-gray-600 cursor-pointer" onClick={handleClick(item)}>
              <span>{index + 1}</span>
              <span>{item.performName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const RECOMMEND_MOCKUP_DATA: Recommendation[] = [
  {
    performId: "PF255055",
    performName: "원: 죄 [창원]",
    genreName: "연극",
  },
  {
    performId: "PF255289",
    performName: "고래바위에서 기다려",
    genreName: "연극",
  },
  {
    performId: "PF255046",
    performName: "마음 속 사거리 좌회전 [대구]",
    genreName: "연극",
  },
  {
    performId: "PF255477",
    performName: "머더",
    genreName: "연극",
  },
  {
    performId: "PF255478",
    performName: "머더",
    genreName: "연극",
  },
  {
    performId: "PF255029",
    performName: "하나의 소리 여러 개의 이야기: 하마 [대전]",
    genreName: "연극",
  },
  {
    performId: "PF255449",
    performName: "모삐-삐-삐-딕!",
    genreName: "연극",
  },
  {
    performId: "PF255448",
    performName: "모삐-삐-삐-딕!",
    genreName: "연극",
  },
  {
    performId: "PF255081",
    performName: "정원사와의 산책",
    genreName: "연극",
  },
  {
    performId: "PF255444",
    performName: "대진대학교 연기예술학과, More Than Hamlet (모어 댄 햄릿)",
    genreName: "연극",
  },
];
