import { Location } from "@/assets/svgr-icons";
import Icon from "@/components/commons/icons";
import SearchCard from "@/components/search/card";
import useUploadTextStore from "@/stores/useUploadTextStore";
import Link from "next/link";
import ArrowBottom from "src/assets/icons/arrow-bottom.svg";
import PlusCircle from "src/assets/icons/plus-circle.svg";

export default function AddInfo() {
  const { selectedPerformance } = useUploadTextStore();

  return (
    <>
      <div className="p-3 flex items-center gap-x-2 h-12 border-b border-b-gray-100">
        <Icon size={24}>
          <PlusCircle />
        </Icon>
        <h3 className="text-sm font-semibold">추가정보 입력하기</h3>
        <h4 className="text-sm font-semibold text-gray-500">(선택)</h4>
        <Link href="/search/add-info" className="ml-auto cursor-pointer">
          <Icon size={24}>
            <ArrowBottom />
          </Icon>
        </Link>
      </div>

      {selectedPerformance && (
        <div className="flex items-center justify-center p-2">
          <SearchCard
            key={selectedPerformance.performanceId}
            className="cursor-pointer flex items-center justify-start w-[356px]"
          >
            <SearchCard.Image
              src={selectedPerformance.posterUrl}
              alt={selectedPerformance.performanceName}
              width={"w-[60px]"}
              height={"h-[60px]"}
            />
            <SearchCard.Content
              title={selectedPerformance.performanceName}
              category={selectedPerformance.genre}
              info={selectedPerformance.location}
              svgr={<Location />}
            />
          </SearchCard>
        </div>
      )}
    </>
  );
}
