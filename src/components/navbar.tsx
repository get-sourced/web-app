"use client";
import Image from "next/image";
import React from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import MapComponents from "./mapComponents";
import { navbar_links } from "@/utils/navbar";
import { jetBrains_font } from "@/assets/fonts";
import { LuSunMoon } from "react-icons/lu";
import { IoSunny } from "react-icons/io5";
import { useTheme } from "@/hooks/theme";
import { HiMenuAlt3 } from "react-icons/hi";
import { useMobileMenuToggle } from "@/hooks/useMobileMenuToggle";
import { MdClose } from "react-icons/md";
function Navbar() {
	const { dark, toggle } = useTheme();
	const { open, toggleMobileMenu } = useMobileMenuToggle();
	return (
		<header className={`w-full ${jetBrains_font.className} relative px-2 `}>
			<nav className="w-full flex justify-between items-center">
				{/* Logo */}
				<Link href={"/"}>
					{" "}
					<Image className="h-[60px] w-[60px] contain" src={logo} alt="Logo" />
				</Link>

				{/* navbar links */}
				<button
					onClick={toggleMobileMenu}
					type="button"
					className="md:hidden flex text-secondary_color text-2xl"
				>
					{!open ? <HiMenuAlt3 /> : <MdClose />}
				</button>
				<span
					className={`flex md:gap-4 gap-1 md:items-center text-secondary_color font-semibold  flex-shrink-0 md:flex-row flex-col absolute top-[100%]  md:left-0 md:relative md:p-0 p-3 bg-primary_color border-b-[0.5px] md:border-none md:w-fit w-full ${open ? "left-0" : "-left-[100%]"} transition-all`}
				>
					<MapComponents
						items_to_map={navbar_links}
						method={(item) => {
							return (
								<Link
									className="w-fit flex-shrink-0"
									key={item.label}
									href={item.url}
								>
									{item.label}
								</Link>
							);
						}}
					/>
					<button
						onClick={toggle}
						type="button"
						className={`bg-gray-500/10  p-1 w-[50px] rounded-2xl items-center flex ${dark ? "justify-start" : "justify-end"}`}
					>
						<span className="aspect-square bg-zinc-500/20 p-1 rounded-full">
							{!dark ? <IoSunny /> : <LuSunMoon />}
						</span>
					</button>
				</span>
			</nav>
		</header>
	);
}

export default Navbar;
