import { useEffect, useRef, useState } from "react";

type ContentProps = {
  contents: string;
};

export default function FeedContent({ contents }: ContentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 텍스트 컨텐츠가 3줄 이상인지 확인
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    }
  }, [contents]);

  return (
    <div className="text-sm mx-4 mt-2 relative">
      <section
        ref={contentRef}
        className={`overflow-hidden relative ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}
      >
        {isOverflowing && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="float-right mt-10 [shape-outside:border-box] text-gray-600 cursor-pointer px-1"
          >
            더보기
          </button>
        )}
        {contents}
      </section>
    </div>
  );
}
