"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type BottomSheetContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

export function BottomSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // 바텀 시트 외부 영역 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return <BottomSheetContext.Provider value={{ isOpen, open, close }}>{children}</BottomSheetContext.Provider>;
}

export function useBottomSheet() {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("Error! Use within a BottomSheetProvider");
  }
  return context;
}
