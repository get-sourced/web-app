export interface RepositoryTypes {
  id: number;
  languages_url: string;
  langs_: { [key: string]: number } | null;
  url: string;
  language: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  full_name: string;
  forks: number;
  created_at: Date;
  description: string;
  stargazers_count: number;
}

export interface DataFromGithub {
  items: RepositoryTypes[] | [];
  total_count: number;
}
