"use client";

import { useSearchStore } from "@/stores/use-search.store";
import { useEffect } from "react";
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
