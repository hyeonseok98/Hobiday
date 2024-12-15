"use client";

import { useEffect } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import AddInfoSearchResult from "@/components/search/add-info/result";

export default function AddInfoSearchPages() {
  const { searchQuery, setSearchQuery } = useSearchStore();

  // 검색어 초기화
  useEffect(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  return <>{searchQuery && <AddInfoSearchResult />}</>;
}
