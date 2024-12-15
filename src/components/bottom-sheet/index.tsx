import { useBottomSheet } from "@/contexts/bottom-sheet.context";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, ReactNode } from "react";

type BottomSheetProps = {
  children: ReactNode;
  height?: string;
};

export default function BottomSheet({ children, height = "45%" }: BottomSheetProps) {
  const { isOpen, close } = useBottomSheet();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 반투명 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-bottomSheet"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* 바텀 시트 */}
          <motion.div
            className={cn(
              "fixed bottom-0 max-w-[430px] w-full gap-4 bg-white rounded-t-2xl shadow-lg mx-auto overflow-hidden z-bottomSheet",
            )}
            style={{ height }}
            initial={{ y: "140%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 29, stiffness: 250 }}
            onClick={(e) => e.stopPropagation()}
          >
            <BottomSheetHeader />
            {children}
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
      <h3 className="font-medium text-center">{children}</h3>
    </section>
  );
}

function BottomSheetContents({ children }: PropsWithChildren) {
  return <section className="p-4">{children}</section>;
}

BottomSheet.Title = BottomSheetTitle;
BottomSheet.Contents = BottomSheetContents;
