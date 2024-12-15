import Icon from "@/components/commons/icon";
import Link from "next/link";
import ArrowBottom from "src/assets/icons/arrow-bottom.svg";
import PlusCircle from "src/assets/icons/plus-circle.svg";

export default function AddInfo() {
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
    </>
  );
}
