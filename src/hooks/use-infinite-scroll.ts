"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

/**
 * 무한 스크롤 감지 훅
 * @param onIntersect - 관찰 대상이 화면에 노출됐을 때 실행할 콜백
 */
export function useScrollObserver(onIntersect: () => void) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      onIntersect();
    }
  }, [inView, onIntersect]);

  return ref;
}
