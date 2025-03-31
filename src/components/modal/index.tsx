"use client";

import { useModal } from "@/contexts";
import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren, useEffect } from "react";
import ReactDOM from "react-dom";

type ModalProps = PropsWithChildren & {
  onClose?: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const { isOpen, close } = useModal();

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    return null;
  }

  // ESC 키로 모달
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose ? onClose() : close();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, close]);

  function handleOverlayClick() {
    if (onClose) {
      onClose();
    } else {
      close();
    }
  }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 반투명 배경 */}
          <motion.div
            className="fixed inset-0 bg-black/30 z-modalBackgroud"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* 모달 컨텐츠 */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-modal"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <div
              className="w-[220px] pt-6 pb-4 px-4 gap-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    portalRoot,
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
