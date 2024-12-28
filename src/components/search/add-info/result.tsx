"use client";

import Location from "@/assets/icons/location.svg";
import Search from "@/assets/icons/search.svg";
import Icon from "@/components/commons/icons";
import { SectionLayout } from "@/components/layout";
import { useSearchPerformances } from "@/hooks";
import { useSearchStore } from "@/stores/useSearchStore";
import useUploadTextStore from "@/stores/useUploadTextStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchCard from "../card";
import LoadingSpinner from "@/components/commons/spinner";
import Toast from "@/components/commons/toast";

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
  const { setPerformId, setSelectedPerformance } = useUploadTextStore();
  const [tempPerformance, setTempPerformance] = useState("");

  const { data: performances, isLoading, isError } = useSearchPerformances(searchQuery);
  const [toast, setToast] = useState<{ type: "Complete" | "Error"; message: string } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-content">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError) {
    setToast({ type: "Error", message: "화면을 불러올 수 없습니다. 다시 시도해 주세요." });
    return <div className="text-center py-8 text-primary">데이터를 불러오는데 실패했습니다.</div>;
  }

  function handlePerformanceChange(performanceId: string) {
    setTempPerformance(performanceId);
  }

  function handleConfirm() {
    if (tempPerformance && performances) {
      const selectedPerformance = performances.find((performance) => performance.performanceId === tempPerformance);
      if (selectedPerformance) {
        setSelectedPerformance(selectedPerformance);
      }
      setPerformId(tempPerformance);
      router.push(`/feed/upload?performId=${tempPerformance}`);
    }
  }

  return (
    <SectionLayout className="space-y-4">
      <ul className="flex flex-col py-4 gap-2 ">
        {performances && performances.length > 0 ? (
          performances.map((performance) => (
            <li key={performance.performanceId} className="flex items-center justify-start p-2">
              <label
                htmlFor={performance.performanceId}
                className="cursor-pointer flex items-center justify-center w-full "
              >
                <input
                  type="radio"
                  id={performance.performanceId}
                  name="performance"
                  value={JSON.stringify(performance)}
                  checked={tempPerformance === performance.performanceId}
                  onChange={() => handlePerformanceChange(performance.performanceId)}
                  className="w-5 h-5 text-primary border-gray-300 checked:bg-primary mr-4 flex-shrink-0"
                />
                <SearchCard
                  key={performance.performanceId}
                  className="cursor-pointer flex items-center justify-start w-[356px]"
                >
                  <SearchCard.Image
                    src={performance.posterUrl}
                    alt={performance.performanceName}
                    width={"w-[60px]"}
                    height={"h-[60px]"}
                  />
                  <SearchCard.Content
                    title={performance.performanceName}
                    category={performance.genre}
                    info={performance.location}
                    svgr={<Location />}
                  />
                </SearchCard>
              </label>
            </li>
          ))
        ) : (
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
        )}
      </ul>
      <div className="fixed bottom-24 left-0 right-0 w-[430px] mx-auto px-4">
        <SelectPerformanceButton onConfirm={handleConfirm} disabled={!tempPerformance} />
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </SectionLayout>
  );
}
