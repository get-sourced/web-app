import { createContext, useContext, type ReactNode } from "react";
import type { stateType } from "../lib/types";
import { useAppState } from "../hooks/useAppState";
const StateContext = createContext<stateType | undefined>(undefined);
export const StateProvider = ({ children }: { children: ReactNode }) => {
  const values = useAppState();
  return (
    <StateContext.Provider value={values}>{children}</StateContext.Provider>
  );
};

export const useGlobalState = () => {
  const state = useContext(StateContext);
  if (!state) throw Error("Use in a state provider");
  return state;
};
