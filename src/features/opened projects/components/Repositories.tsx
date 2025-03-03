"use client";
import MapComponents from "@/components/mapComponents";
import React from "react";
import { useRepositories } from "../context/RepositoryContext";
import type { RepositoryTypes } from "../lib/types";
import { jetBrains_font } from "@/assets/fonts";

function Repositories({ reposProp }: { reposProp: RepositoryTypes[] }) {
  const repos = useRepositories();
  return (
    <MapComponents
      className="flex gap-5 flex-wrap w-full  py-6 items-center justify-center h-full overflow-y-scroll"
      items_to_map={repos.length > 0 ? repos : reposProp}
      method={(item) => {
        return (
          <article
            key={item.id}
            className="max-w-[300px] w-full  bg-zinc-600/15 rounded-xl flex flex-col items-center shadow-sm flex-shrink-0 min-h-[400px]"
          >
            <MapComponents
              className="-translate-y-[50%] flex gap-3 "
              items_to_map={["JS", "Python", "Angular"]}
              method={(item) => {
                return (
                  <span
                    className={`bg-blue_custom text-xs p-2 py-1 rounded-3xl ${jetBrains_font.className} text-white`}
                    key={item}
                  >
                    {item}
                  </span>
                );
              }}
            />
          </article>
        );
      }}
    />
  );
}

export default Repositories;
