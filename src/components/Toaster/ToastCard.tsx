import React, { useEffect, useRef } from "react";
import type { Toast } from "./toastStore";
import { motion } from "framer-motion";
import { IoClose, IoCheckmarkSharp } from "react-icons/io5";
import { CiWarning } from "react-icons/ci";
function ToastCard({
  toast,
  handleClick,
  duration,
}: {
  toast: Toast;
  handleClick: () => void;
  duration: number;
}) {
  const ref = useRef(handleClick);
  // Sync the latest handleClick function
  useEffect(() => {
    ref.current = handleClick;
  }, [handleClick]);

  useEffect(() => {
    const timer = setTimeout(() => ref.current(), duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);
  return (
    <motion.span
      initial={{ opacity: 0, x: 50 }} // Animate in from right
      animate={{ opacity: 1, x: 0 }} // Normal position
      exit={{ opacity: 0, x: -50 }} // Animate out to left
      transition={{ duration: 0.5 }}
      className={`${
        toast.state === "success"
          ? "bg-success"
          : toast.state === "error"
          ? "bg-error"
          : "bg-warning"
      } shadow-sm flex items-center w-fit flex-shrink-0 p-2  min-w-[200px] justify-between rounded-sm text-black transition-all overflow-hidden duration-500 relative gap-2`}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-[27px] h-[27px] rounded-full p-1 border-black border-[1px]">
          {toast.state === "success" ? (
            <IoCheckmarkSharp />
          ) : toast.state === "error" ? (
            "!"
          ) : (
            <CiWarning />
          )}
        </div>
        <p>{toast.message}</p>
      </div>
      <button
        className="rounded-full aspect-square p-1 border-[1px] text-black font-semibold border-black"
        onClick={handleClick}
        type="button"
      >
        <IoClose />
      </button>
    </motion.span>
  );
}

export default ToastCard;
