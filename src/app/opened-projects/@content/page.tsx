import Repositories from "@/features/opened projects/components/Repositories";
import { RepositoryContextProvider } from "@/features/opened projects/context/RepositoryContext";
import type { DataFromGithub } from "@/features/opened projects/lib/types";
import { fetchQuery } from "@/libs/fetch";
import React from "react";

async function Projects() {
  const githubRepoQuery = fetchQuery<DataFromGithub>();
  const reposData = await githubRepoQuery.queryWithoutToast(
    "stars:>5+is:public+language:JavaScript+created:>=2024-01-01&sort=created&order=desc&page=1&per_page=70",
    {
      items: [],
    }
  );
  // console.log(reposData.items);
  return (
    <section className="h-full">
      <RepositoryContextProvider>
        <Repositories reposProp={reposData.items} />
      </RepositoryContextProvider>
    </section>
  );
}

export default Projects;
