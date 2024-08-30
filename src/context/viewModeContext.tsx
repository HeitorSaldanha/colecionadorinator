/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";

export enum ViewMode {
  LIST = "list",
  GRID = "grid",
}

interface IViewModeContext {
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

export const ViewModeContext = createContext<IViewModeContext>({
  viewMode: ViewMode.GRID,
  setViewMode: () => {},
});

export const ViewModeContextProvider = ViewModeContext.Provider;

export const ViewModeContextConsumer = ViewModeContext.Consumer;

export const useViewModeContext = () => useContext(ViewModeContext);
