/* eslint-disable react-refresh/only-export-components */
import { IFilters } from '@/model/filters';
import { createContext, useContext } from 'react';

export const emptyFilters: IFilters = {
  teams: [],
  players: [],
  numbers: [],
  seasons: [],
};

export interface IFiltersContext {
  filters: IFilters;
  updateFilters: (filter: Partial<IFilters>) => void;
}

export const FiltersContext = createContext<IFiltersContext>({
  filters: emptyFilters,
  updateFilters: () => {},
});

export const FiltersContextProvider = FiltersContext.Provider;

export const FiltersContextConsumer = FiltersContext.Consumer;

export const useFiltersContext = () => useContext(FiltersContext);
