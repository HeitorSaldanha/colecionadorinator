/* eslint-disable react-refresh/only-export-components */
import { Option } from "@/components/ui/multiple-select";
import { createContext, useContext } from "react";

interface IFilters {
  teams?: Option[];
  players?: Option[];
  seasons?: Option[];
}

export interface IFiltersContext {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
  updateFilters: (filters: Partial<IFilters>) => void;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: {},
  setFilters: () => {},
  updateFilters: () => {},
});

export const FiltersContextProvider = FiltersContext.Provider;

export const FiltersContextConsumer = FiltersContext.Consumer;

export const useFiltersContext = () => useContext(FiltersContext);
