import cn from "@/lib/tailwind-cn";

interface SkeletonCardProps {
  count?: number;
}

export default function SkeletonCard({ count = 1 }: SkeletonCardProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={cn("flex p-4 gap-4 mb-3 border border-gray-200 rounded-lg animate-pulse")}>
          {/* 왼쪽 이미지 */}
          <div className="flex-shrink-0 w-[88px] h-[88px] bg-gray-100 rounded-lg" />

          {/* 오른쪽 텍스트 */}
          <div className="flex flex-col justify-center min-w-0 flex-grow">
            <div className="w-[80px] h-4 bg-gray-100 rounded mb-2" />
            <div className="w-[120px] h-4 bg-gray-100 rounded mb-2" />
            <div className="w-full h-4 bg-gray-100 rounded" />
          </div>
        </div>
      ))}
    </>
  );
}
