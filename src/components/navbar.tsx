"use client";
import Image from "next/image";
import React, { useRef } from "react";
import logo from "@/assets/images/logo.png";
import Link from "next/link";
import MapComponents from "./mapComponents";
import { navbar_links } from "@/utils/links";
import { jetBrains_font } from "@/assets/fonts";
import { LuSunMoon } from "react-icons/lu";
import { IoSunny } from "react-icons/io5";
import { HiMenuAlt3 } from "react-icons/hi";
import { useMobileMenuToggle } from "@/hooks/useMobileMenuToggle";
import { MdClose } from "react-icons/md";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useTheme } from "@/hooks/useTheme";
function Navbar() {
  const spanElement = useRef<HTMLElement>(null);
  const { dark, toggle } = useTheme();
  const { open, toggleMobileMenu } = useMobileMenuToggle();
  useClickOutside(spanElement, toggleMobileMenu, open);
  return (
    <header
      className={`w-full ${jetBrains_font.className} relative md:sticky   md:px-2 mx-auto md:top-0  md:z-50 bg-primary_color`}
    >
      <nav className="w-full flex justify-between items-center fixed md:static px-4  md:bg-transparent  z-[2] shadow-sm rounded-md bg-primary_color">
        {/* Logo */}
        <Link href={"/"}>
          {" "}
          <Image
            priority
            className="h-[45px] w-[45px] contain shrink-0"
            src={logo}
            alt="Logo"
          />
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
          ref={spanElement}
          className={`flex md:gap-4 justify-between md:justify-end md:items-center text-secondary_color   flex-shrink-0 md:flex-row  absolute top-[99%]  md:left-0 md:relative md:p-0 p-3 md:border-none w-full md:w-fit ${
            open ? "left-0" : "-left-[100%]"
          } transition-all bg-primary_color md:bg-transparent shadow-md md:shadow-none rounded-br-md md:rounded-none `}
        >
          <MapComponents
            className={"flex gap-4  items-center  "}
            items_to_map={navbar_links}
            method={(item) => {
              return (
                <Link
                  key={item.label}
                  className="w-fit flex-shrink-0 text-base"
                  onClick={toggleMobileMenu}
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
            className={`bg-gray-500/10  p-1 w-[50px] rounded-2xl items-center flex ${
              dark ? "justify-start" : "justify-end"
            }`}
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
