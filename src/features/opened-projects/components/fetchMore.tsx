"use client";
import useIO from "@/hooks/useIO";
import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { repositoryQuery, useRepositories } from "../context/RepositoryContext";
import type { DataFromGithub, RepositoryTypes } from "../lib/types";
import { fetchQuery } from "@/libs/fetch";
import { useSearchParams } from "next/navigation";
function FetchMoreComp() {
  const [page, setPage] = useState(1);
  const { items } = useRepositories();
  const githubRepoQuery = fetchQuery<DataFromGithub>();
  const query = useSearchParams();
  const lang = query.get("lang") ?? "Javascript";
  const year = query.get("year") ?? "2024";
  const star = query.get("star") ?? ">5";
  const { elementRef, isIntersecting } = useIO({
    threshold: 0.5,
    rootMargin: "0px",
  });
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    (async () => {
      if (!isIntersecting) return;
      setPage((pre) => pre + 1);
      const repos = await githubRepoQuery.query(
        `stars:${star}+is:public+language:${lang}+created:>=${year}-01-01&sort=created&order=desc&page=${page}&per_page=30`,
        {
          items: [],
          total_count: 0,
        }
      );
      const res: RepositoryTypes[] = await githubRepoQuery.subQueryArray(
        "items",
        "languages_url",
        "langs_"
      );

      repos.items = [...items, ...res];
      repositoryQuery.changeState(repos);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting, lang, star, year]);
  return (
    <div ref={elementRef} className="h-2 w-full">
      {isIntersecting && (
        <AiOutlineLoading3Quarters className="animate-spin bg-secondary_color text-primary_color rounded-full p-2 h-8 w-8 mx-auto" />
      )}
    </div>
  );
}

export default FetchMoreComp;
