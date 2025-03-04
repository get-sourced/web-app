"use client";
import DropdownMenu from "@/components/DropdownMenu";
import React, { useState } from "react";
import { langs, year } from "../utils/values";
import { jetBrains_font } from "@/assets/fonts";
import { useRepositories } from "../context/RepositoryContext";
import useQuery from "@/hooks/useQuery";
import { useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Filter({ count }: { count: number }) {
  const query = useSearchParams();
  const [state, setState] = useState({
    lang: query.get("lang") ?? "Javascript",
    year: query.get("year") ?? "2024",
    star: query.get("star") ?? ">5",
  });
  const store = useRepositories();
  const star = useDebounce(state.star);
  const loading = useQuery(state.lang, state.year, star);
  return (
    <div
      className={`flex gap-2 items-center justify-end w-full sticky top-[48px] flex-col gap ${jetBrains_font.className} hidden md:flex`}
    >
      <div className="flex items-center bg-primary_color p-2 gap-3 shadow-sm">
        <span>
          Total: {store?.items.length > 0 ? store.total_count : count}
        </span>
        <input
          placeholder="stars no. eg. >4 "
          className={`outline-none text-secondary_color bg-primary_color p-2 border-[1px] rounded-sm border-repoBg ${
            !/[<>]\d+/.test(state.star) ? "border-red-400" : ""
          }`}
          type="text"
          value={state.star}
          onChange={(e) =>
            setState((pre) => ({ ...pre, star: e.target.value }))
          }
        />
        <span className="w-[120px]">
          <DropdownMenu
            handleClick={(val) => setState((pre) => ({ ...pre, year: val }))}
            value={state.year}
            values={year()}
          />
        </span>
        <DropdownMenu
          handleClick={(val) => setState((pre) => ({ ...pre, lang: val }))}
          value={state.lang}
          values={langs}
        />
      </div>
      {loading && (
        <div className="animate-spin bg-secondary_color text-primary_color rounded-full p-2">
          <AiOutlineLoading3Quarters />
        </div>
      )}
    </div>
  );
}

export default Filter;
