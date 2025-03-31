"use client";

import AddInfoSearchResult from "@/components/search/add-info/result";
import { useSearchStore } from "@/stores/use-search.store";
import { useEffect } from "react";

export default function AddInfoSearchPages() {
  const { searchQuery, setSearchQuery } = useSearchStore();

  // 검색어 초기화
  useEffect(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  return <>{searchQuery && <AddInfoSearchResult />}</>;
}
