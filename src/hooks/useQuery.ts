import { repositoryQuery } from "@/features/opened-projects/context/RepositoryContext";
import type {
  DataFromGithub,
  RepositoryTypes,
} from "@/features/opened-projects/lib/types";
import { fetchQuery } from "@/libs/fetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function useQuery(lang: string, year: string, star: string) {
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState(true);
  const githubRepoQuery = fetchQuery<DataFromGithub>();
  const router = useRouter();
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    router.replace(`?lang=${lang}&star=${star}&year=${year}`);
    if (first) {
      setFirst(false);
      return;
    }
    if (star.length > 0 && !/[<>]\d+/.test(star)) return;
    (async () => {
      setLoading(true);
      const repos = await githubRepoQuery.query(
        `stars:${star}+is:public+language:${lang}+created:>=${year}-01-01&sort=created&order=desc&page=1&per_page=30`,
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
      repos.items = res;
      repositoryQuery.changeState(repos);
      setLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, star, year]);
  return loading;
}

export default useQuery;
