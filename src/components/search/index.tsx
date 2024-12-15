"use client";

import { useEffect } from "react";
import { useSearchStore } from "@/stores/useSearchStore";
import SearchRecommend from "./recommend";
import SearchResult from "./result";

export default function SearchPages() {
  const { searchQuery, setSearchQuery } = useSearchStore();

  // 검색어 초기화
  useEffect(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  return <>{searchQuery ? <SearchResult /> : <SearchRecommend />}</>;
}
