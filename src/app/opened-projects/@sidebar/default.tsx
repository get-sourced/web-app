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
      className={"absolute md:static z-40 top-[7%]  flex-shrink-0 w-fit"}
    >
      <button
        type="button"
        onClick={() => setOpen((pre) => !pre)}
        className="text-secondary_color font-bold text-xl md:hidden z-[100] flex fixed bg-primary_color p-2 rounded-full shadow-md top-2 right-20"
      >
        {!open && <GoSidebarCollapse />}
        {open && <GoSidebarExpand />}
      </button>
      <MapComponents
        className={`${
          open ? "sidebar-in" : "sidebar-out"
        } bg-primary_color md:bg-transparent w-fit p-4 transition-all duration-700  rounded-md shadow-md md:shadow-none md:rounded-none md:top-0 md:translate-x-0 flex-shrink-0`}
        items_to_map={sidebar_links}
        method={(item) => {
          return (
            <Link
              key={item.label}
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
