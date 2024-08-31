/* eslint-disable react-refresh/only-export-components */
import { Ijersey } from '@/model/jersey';
import { ViewMode } from '@/model/ui';
import { createContext, useContext } from 'react';

export interface IJerseysViewContext {
  jerseys: Ijersey[];
  viewMode: ViewMode;
  selectedJersey: Ijersey | null;
  isEditMode: boolean;
  isFormOpen: boolean;
  setSelectedJersey: (jersey: Ijersey) => void;
  setIsEditMode: (editMode: boolean) => void;
  setIsFormOpen: (isFormOpen: boolean) => void;
  setViewMode: (viewMode: ViewMode) => void;
  setJerseys: (jerseys: Ijersey[]) => void;
  updateJerseys: (jersey: Ijersey) => void;
  editJersey: (update: Ijersey) => void;
}

export const JerseysViewContext = createContext<IJerseysViewContext>({
  jerseys: [],
  viewMode: ViewMode.GRID,
  selectedJersey: null,
  isEditMode: false,
  isFormOpen: false,
  editJersey: () => {},
  setSelectedJersey: () => {},
  setIsEditMode: () => {},
  setIsFormOpen: () => {},
  setViewMode: () => {},
  setJerseys: () => {},
  updateJerseys: () => {},
});

export const JerseysViewContextProvider = JerseysViewContext.Provider;

export const JerseysViewContextConsumer = JerseysViewContext.Consumer;

export const useJerseysViewContext = () => useContext(JerseysViewContext);
