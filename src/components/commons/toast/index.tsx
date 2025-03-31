"use client";

import ToastFalse from "@/assets/icons/toast-false.svg";
import ToastTrue from "@/assets/icons/toast-true.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import ReactDOM from "react-dom";

interface ToastProps {
  type: "Complete" | "Error";
  message: string;
  onClose: () => void;
}

const Toast = ({ type, message, onClose }: ToastProps) => {
  const isComplete = type === "Complete";

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const portalRoot = document.getElementById("portal-root");
  if (!portalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] pointer-events-none flex flex-col items-center justify-end pb-8">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.4 }}
          className={`px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 border-2
          ${isComplete ? "bg-blue-70 border-primary" : "bg-red-100 border-error"}`}
        >
          <div className={`w-6 h-6 flex items-center justify-center`}>
            {isComplete ? <ToastTrue className="text-white w-6 h-6" /> : <ToastFalse className="w-6 h-6 text-white" />}
          </div>
          <span className="text-sm font-medium">{message}</span>
        </motion.div>
      </AnimatePresence>
    </div>,
    portalRoot,
  );
};

export default Toast;
