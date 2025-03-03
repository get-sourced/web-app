import Repositories from "@/features/opened projects/components/Repositories";
import { RepositoryContextProvider } from "@/features/opened projects/context/RepositoryContext";
import type { RepositoryTypes } from "@/features/opened projects/lib/types";
import { fetchQuery } from "@/libs/fetch";
import React from "react";

async function Projects() {
  const githubRepoQuery = fetchQuery<{ items: RepositoryTypes[] }>();
  const reposData = await githubRepoQuery.queryWithoutToast(
    "stars:<5+is:public+language:JavaScript&sort=created&order=desc",
    {
      items: [],
    }
  );
  return (
    <section className="h-full">
      <RepositoryContextProvider>
        <Repositories reposProp={reposData.items} />
      </RepositoryContextProvider>
    </section>
  );
}

export default Projects;
