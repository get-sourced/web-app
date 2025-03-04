"use client";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { DataFromGithub } from "../lib/types";
import { RepositoryQuery } from "../lib/RepositoryQuery";

const RepositoryContext = createContext<DataFromGithub | undefined>(undefined);
export const repositoryQuery = new RepositoryQuery();
export const RepositoryContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [repository, setRepository] = useState<DataFromGithub>({
    items: [],
    total_count: 0,
  });
  useEffect(() => {
    const unsubscribe = repositoryQuery.subscribe(setRepository);
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <RepositoryContext.Provider value={repository}>
      {children}
    </RepositoryContext.Provider>
  );
};

export const useRepositories = () => {
  const repositories = useContext(RepositoryContext);
  if (!repositories) throw new Error("use inside Provider");
  return repositories;
};
