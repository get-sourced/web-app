"use client";
import React, { type ReactNode, useRef, useState } from "react";
import MapComponents from "./mapComponents";
import { jetBrains_font } from "@/assets/fonts";
import { useClickOutside } from "@/hooks/useClickOutside";
function DropdownMenu({
  children,
  border = "",
  values,
  value,
  handleClick,
}: {
  children?: ReactNode;
  border?: string;
  values: string[];
  handleClick: (i: string) => void;
  value: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useClickOutside(ref, () => setOpen(false), open);

  return (
    <div
      ref={ref}
      className={`flex items-center border-[1px] border-repoBg gap-1  relative ${jetBrains_font.className} rounded-sm shadow-sm bg-primary_color w-full`}
    >
      <div className={`w-fit relative px-5 py-2 ${border} w-full`}>
        <button
          onClick={() => setOpen((pre) => !pre)}
          type="button"
          className="flex items-center justify-center w-full "
        >
          {value}
        </button>
        {open && (
          <MapComponents
            className="bg-primary_color text-secondary_color absolute top-[104%] flex-col flex w-full left-0 shadow-md rounded-sm max-h-[150px] overflow-y-scroll overflow-x-hidden"
            items_to_map={values}
            method={(item) => {
              return (
                <button
                  onClick={() => {
                    handleClick(item);
                    setOpen((pre) => !pre);
                  }}
                  className="p-2 border-repoBg hover:bg-repoBg flex-shrink-0 border-b-[0.5px] "
                  key={item}
                  type="button"
                >
                  {item}
                </button>
              );
            }}
          />
        )}
      </div>
      {children}
    </div>
  );
}

export default DropdownMenu;
