"use client";

import ToastTrue from "@/assets/icons/toast-true.svg";
import ToastFalse from "@/assets/icons/toast-false.svg";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ToastProps {
  type: "Complete" | "Error";
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const isComplete = type === "Complete";

  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className={`absolute bottom-8 px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2 z-50 border-2
          ${isComplete ? "bg-blue-70 border-primary" : "bg-red-100 border-error"}`}
      >
        <div className={`w-6 h-6 flex items-center justify-center`}>
          {isComplete ? <ToastTrue className="text-white w-6 h-6" /> : <ToastFalse className="w-6 h-6 text-white" />}
        </div>

        <span className="text-sm font-medium">{message}</span>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
