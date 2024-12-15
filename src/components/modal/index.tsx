import { useModal } from "@/contexts";
import cn from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Modal({ children }: PropsWithChildren) {
  const { isOpen, close } = useModal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 반투명 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-modal"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* 모달 컨텐츠 */}
          <motion.div
            className={cn(
              "fixed flex flex-col justify-center items-center w-[220px] pt-6 pb-4 px-4 gap-4 bg-white rounded-lg shadow-lg z-modal",
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalTitle({ children }: { children: string }) {
  return <h3 className="font-semibold text-center">{children}</h3>;
}

function ModalDescription({ children }: { children: string }) {
  return <p className="text-sm text-gray-600 text-center">{children}</p>;
}

function ModalButtons({ children }: PropsWithChildren) {
  return <div className="flex flex-col w-full gap-2">{children}</div>;
}

Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Buttons = ModalButtons;
