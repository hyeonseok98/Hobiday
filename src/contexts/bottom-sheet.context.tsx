"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type BottomSheetContextType = {
  open: (id: string) => void;
  close: (id: string) => void;
  isOpen: (id: string) => boolean;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [openSheets, setOpenSheets] = useState<Map<string, boolean>>(new Map());

  const open = (id: string) => {
    setOpenSheets((prev) => new Map(prev).set(id, true));
  };

  const close = (id: string) => {
    setOpenSheets((prev) => new Map(prev).set(id, false));
  };

  const isOpen = (id: string) => openSheets.get(id) || false;

  // 바텀 시트 외부 영역 스크롤 방지
  useEffect(() => {
    const hasOpenSheets = Array.from(openSheets.values()).some((value) => value);
    document.body.style.overflow = hasOpenSheets ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openSheets]);

  return <BottomSheetContext.Provider value={{ open, close, isOpen }}>{children}</BottomSheetContext.Provider>;
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("Error! Use within a BottomSheetProvider");
  }
  return context;
}
