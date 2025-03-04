import FetchMoreComp from "@/features/opened-projects/components/fetchMore";
import Filter from "@/features/opened-projects/components/Filter";
import Repositories from "@/features/opened-projects/components/Repositories";
import { RepositoryContextProvider } from "@/features/opened-projects/context/RepositoryContext";
import type {
  DataFromGithub,
  RepositoryTypes,
} from "@/features/opened-projects/lib/types";
import { fetchQuery } from "@/libs/fetch";
import React from "react";

async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ year: number; star: string; lang: string }>;
}) {
  const param = await searchParams;
  const query = { year: "2024", lang: "Javascript", star: ">5" };
  if (param?.year && !Number.isNaN(param.year)) query.year = `${param.year}`;
  if (param?.lang) {
    let lang = param?.lang.toLowerCase();
    lang = `${lang.charAt(0).toUpperCase()}${lang.slice(1)}`;
    query.lang = lang;
  }
  if (param?.star) {
    query.star = param?.star;
  }
  const githubRepoQuery = fetchQuery<DataFromGithub>();
  const repos = await githubRepoQuery.queryWithoutToast(
    `stars:${query.star}+is:public+language:${query.lang}+created:>=${query.year}-01-01&sort=created&order=desc&page=1&per_page=30`,
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
  // console.log(repos.total_count);
  return (
    <section className="h-full w-full mt-5 min-h-[100vh] flex flex-col justify-between">
      <RepositoryContextProvider>
        <Filter count={repos.total_count} />
        <Repositories reposProp={res} />
        <FetchMoreComp />
      </RepositoryContextProvider>
    </section>
  );
}

export default Projects;
