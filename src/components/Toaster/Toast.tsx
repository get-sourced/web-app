"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ToastClass, type Toast as ToastType } from "./toastStore";
import { jetBrains_font } from "@/assets/fonts";
import ToastCard from "./ToastCard";
const toastInstance = new ToastClass();
type ToastFunction = ((msg: string) => string) & ToastClass;
function createToast(): ToastFunction {
  // Define the main function
  const toastFn = (msg: string) => {
    toastInstance.success(msg);
  };

  // Create the hybrid by type assertion after we add all properties
  const hybrid = toastFn as ToastFunction;

  // Copy methods from the instance to the function
  const methods = Object.getOwnPropertyNames(ToastClass.prototype).filter(
    (prop) => prop !== "constructor"
  );

  for (const method of methods) {
    type key = keyof ToastClass;
    const methodName = method as key;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        hybrid[methodName] = toastInstance[methodName].bind(toastInstance) as any;
  }
  return hybrid;
}

// Create and export the toast hybrid
export const toast = createToast();

export function Toast({ duration }: { duration: number }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);
  useEffect(() => {
    const unsubscribe = toastInstance.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div
      className={`fixed z-[100] bottom-[20px] flex-col justify-end gap-3 flex transition-[height] left-[30px] ${jetBrains_font.className}`}
    >
      <AnimatePresence>
        {toasts.map((toast_) => {
          return (
            <ToastCard
              duration={duration}
              key={toast_.id}
              toast={toast_}
              handleClick={() => toastInstance.reducer("remove", toast_.id)}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
