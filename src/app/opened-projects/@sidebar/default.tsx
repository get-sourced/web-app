"use client";
import { jetBrains_font } from "@/assets/fonts";
import MapComponents from "@/components/mapComponents";
import { sidebar_links } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function SideBar() {
	const path = usePathname();
	return (
		<aside className="w-fit h-fit px-2 py-3">
			<MapComponents
				className="flex-col flex gap-1"
				items_to_map={sidebar_links}
				method={(item) => {
					return (
						<Link
							className={`${jetBrains_font.className} ${path === item.url && "bg-zinc-600/15"} p-1 px-3 rounded-lg flex gap-3 items-center`}
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
