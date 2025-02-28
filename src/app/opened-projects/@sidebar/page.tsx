"use client";
import { jetBrains_font } from "@/assets/fonts";
import MapComponents from "@/components/mapComponents";
import { useClickOutside } from "@/hooks/useClickOutside";
import { sidebar_links } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef, useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
function SideBar() {
  const path = usePathname();
  const aside = useRef(null);
  const [open, setOpen] = useState(false);
  useClickOutside(aside, () => setOpen(false), open);
  return (
    <aside
      ref={aside}
      className={`max-w-fit md:h-fit px-2  w-full flex-shrink-0 md:static fixed bg-primary_color md:bg-transparent z-20 md:z-0 h-full top-[48px]  ${
        open ? "left-0" : "left-[-500%]"
      } pt-5 md:pt-0  transition-all duration-700`}
    >
      <button
        type="button"
        onClick={() => setOpen((pre) => !pre)}
        className="fixed top-[21px] right-[70px] z-[2] text-secondary_color font-bold text-xl md:hidden flex"
      >
        {!open && <GoSidebarCollapse />}
        {open && <GoSidebarExpand />}
      </button>
      <MapComponents
        className="flex-col flex gap-1"
        items_to_map={sidebar_links}
        method={(item) => {
          return (
            <Link
              onClick={() => setOpen((pre) => !pre)}
              className={`${jetBrains_font.className} ${
                path === item.url && "bg-zinc-600/15"
              } p-1 px-3 rounded-lg flex gap-3 items-center text-sm md:text-base`}
              href={item.url}
            >
              <span className="text-zinc-700">
                <item.Icon />
              </span>
              {item.label}
            </Link>
          );
        }}
      />
    </aside>
  );
}

export default SideBar;
