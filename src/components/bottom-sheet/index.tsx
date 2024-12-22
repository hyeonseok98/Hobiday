"use client";

import { useBottomSheet } from "@/contexts/bottom-sheet.context";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";

type BottomSheetProps = {
  id: string;
  children: ReactNode;
  height?: string;
};

const TITLE_ID = "bottom-sheet-title";
const DESCRIPTION_ID = "bottom-sheet-description";
export default function BottomSheet({ id, children, height = "45%" }: BottomSheetProps) {
  const { isOpen, close } = useBottomSheet();
  const sheetRef = useRef<HTMLDivElement>(null);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen(id)) {
        close(id);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen(id) && (
        <>
          {/* 반투명 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-bottomSheet"
            onClick={() => close(id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* 바텀 시트 */}
          <motion.div
            ref={sheetRef}
            className={cn(
              "fixed bottom-0 max-w-[430px] w-full gap-4 bg-white rounded-t-2xl shadow-lg mx-auto overflow-hidden z-bottomSheet",
            )}
            style={{ height }}
            role="dialog"
            aria-labelledby={TITLE_ID}
            aria-describedby={DESCRIPTION_ID}
            initial={{ y: "140%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 29, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
          >
            <BottomSheetHeader />
            <div id={DESCRIPTION_ID}>{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function BottomSheetHeader() {
  return (
    <section className="flex justify-center items-center w-full h-9">
      <div className="w-10 h-1 bg-gray-400 rounded-full" />
    </section>
  );
}

function BottomSheetTitle({ children }: { children: string }) {
  return (
    <section className="flex justify-center items-center w-full">
      <h3 id="bottom-sheet-title" className="font-medium text-center">
        {children}
      </h3>
    </section>
  );
}

function BottomSheetContents({ children }: PropsWithChildren) {
  return <section className="p-4">{children}</section>;
}

BottomSheet.Title = BottomSheetTitle;
BottomSheet.Contents = BottomSheetContents;
