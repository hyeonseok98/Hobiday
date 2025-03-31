import LoadingSpinner from "@/components/commons/spinner";
import { useRecommendedPerformances } from "@/hooks";
import { useSearchStore } from "@/stores/use-search.store";
import { ClientRecommendedSearchWords } from "@/types/performance/client";

export default function SearchRecommend() {
  const { setSearchQuery } = useSearchStore();

  const { data: recommendSearchWords, isLoading, isError } = useRecommendedPerformances();

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-content gap-4">
        <LoadingSpinner size={50} />
        <p className="text-sm text-gray-600">추천 검색어 로딩중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-content">추천 검색어를 불러오는데 실패했습니다.</div>
    );
  }

  function handleClick(item: ClientRecommendedSearchWords) {
    return () => {
      setSearchQuery(item.performanceName);
    };
  }

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-4">추천 검색어</h2>
      <ul>
        {recommendSearchWords?.map((item, index) => (
          <li key={index} className="text-base">
            <div className="flex items-center gap-3 py-2 text-gray-600 cursor-pointer" onClick={handleClick(item)}>
              <span>{index + 1}</span>
              <span>{item.performanceName}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
