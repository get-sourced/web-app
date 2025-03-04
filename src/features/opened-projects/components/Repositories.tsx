"use client";
import MapComponents from "@/components/mapComponents";
import React from "react";
import { useRepositories } from "../context/RepositoryContext";
import type { RepositoryTypes } from "../lib/types";
import { jetBrains_font, karla_font } from "@/assets/fonts";
import Link from "next/link";
import { CalculateLanguage } from "../utils/calculateLanguage";
import { IoStarSharp, IoCalendarSharp } from "react-icons/io5";
import { FaCodeFork,FaRegFaceSadTear } from "react-icons/fa6";
import Image from "next/image";
function Repositories({ reposProp }: { reposProp: RepositoryTypes[] }) {
  const repos = useRepositories();
  return (
    <>
      {repos.items.length === 0 && reposProp.length === 0 && (
        <div
          className={`flex flex-col w-full text-base text-secondary items-center gap-1 ${jetBrains_font.className}`}
        >
          <FaRegFaceSadTear />
          <p>It looks like we hit our limit. Wait a little longer</p>
        </div>
      )}
      <MapComponents
        className="flex gap-5 flex-wrap w-full  py-6 items-center justify-center h-full"
        items_to_map={repos?.items.length > 0 ? repos.items : reposProp}
        method={(item) => {
          return (
            <Link
              key={(Math.random() * 1000).toString(16)}
              className="w-full md:w-[340px] h-full"
              href={""}
              target="_blank"
              rel="noreferrer"
            >
              <article
                key={item.id}
                className="w-full bg-repoBg rounded-xl flex flex-col items-center shadow-sm flex-shrink-0 min-h-[200px] p-2 gap-2"
              >
                <span className={`${jetBrains_font.className} w-full`}>
                  {item.full_name}
                </span>
                <span
                  className={`${jetBrains_font.className} w-full flex items-center gap-4 text-xs`}
                >
                  <Image
                    height={30}
                    alt="owner avatar"
                    width={30}
                    className="rounded-full"
                    src={item.owner.avatar_url}
                  />{" "}
                  <span>{item.owner.login}</span>
                </span>
                <p className={`${karla_font.className} text-base w-full`}>
                  {item.description?.slice(0, 100)}
                  {item.description?.length > 100 ? "..." : ""}
                </p>
                <div
                  className={`${jetBrains_font.className} flex w-full gap-2`}
                >
                  <span className="w-fit p-2 text-xs py-1 rounded-lg flex gap-1 items-center bg-zinc-500/20">
                    <IoStarSharp /> {item.stargazers_count}
                  </span>
                  <span className="w-fit p-2 text-xs py-1 rounded-lg flex gap-1 items-center bg-zinc-500/20">
                    <FaCodeFork /> {item.forks}
                  </span>
                  <span
                    suppressHydrationWarning
                    className="w-fit p-2 text-xs py-1 rounded-lg flex gap-1 items-center bg-zinc-500/20"
                  >
                    <IoCalendarSharp />{" "}
                    {new Date(item.created_at).getFullYear()}
                  </span>
                </div>
                <div
                  className={`w-full flex flex-col gap-1 text-xs ${jetBrains_font.className} bg-slate-400/5 p-1 rounded-md`}
                >
                  <span className="font-bold">Languages :</span>
                  <MapComponents
                    className="w-full flex flex-wrap gap-2 "
                    items_to_map={
                      CalculateLanguage(item.langs_)?.slice(0, 4) ?? [
                        { key: item.language, val: 0.5 },
                      ]
                    }
                    method={(item_) => {
                      return (
                        <span
                          className={`bg-zinc-400/5  p-2 py-1 rounded-3xl ${jetBrains_font.className} text-secondary_color`}
                          key={item_.key}
                        >
                          {item_.key}-{`${(item_.val * 100).toFixed(0)}%`}
                        </span>
                      );
                    }}
                  />
                </div>
              </article>
            </Link>
          );
        }}
      />
    </>
  );
}

export default Repositories;
