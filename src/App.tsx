import { PropsWithChildren, StrictMode, useMemo, useState } from 'react';
import { Ijersey } from './model/jersey';
import { IFilters } from './model/filters';
import {
  emptyFilters,
  FiltersContextProvider,
} from './contexts/FiltersContext';
import { JerseysViewContextProvider } from './contexts/JerseysViewContext';
import { ViewMode } from './model/ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSupabase from './hooks/useSupabase';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';

const router = createRouter({ routeTree, context: { dbClient: undefined! } });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  const dbClient = useSupabase();
  return (
    <StrictMode>
      <RouterProvider router={router} context={{ dbClient }} />
    </StrictMode>
  );
}

export default function AppProviders({ children }: PropsWithChildren) {
  const [jerseys, setJerseys] = useState<Ijersey[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJersey, setSelectedJersey] = useState<Ijersey | null>(null);
  const [viewMode, setViewMode] = useState(ViewMode.GRID);
  const [filters, setFilters] = useState<IFilters>(emptyFilters);

  const queryClient = useMemo(() => new QueryClient(), []);

  const editJersey = (jersey: Ijersey) => {
    setJerseys(jerseys.map((j) => (j.id === jersey.id ? jersey : j)));
    setIsFormOpen(false);
    setIsEditMode(false);
    setSelectedJersey(null);
  };

  const updateFilters = (update: Partial<IFilters>) => {
    setFilters((prev) => ({ ...prev!, ...update }));
  };

  const updateJerseys = (update: Ijersey) => {
    setFilters((prev) => ({ ...prev!, ...update }));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <JerseysViewContextProvider
        value={{
          jerseys,
          viewMode,
          isEditMode,
          isFormOpen,
          selectedJersey,
          editJersey,
          setSelectedJersey,
          setIsEditMode,
          setIsFormOpen,
          setViewMode,
          setJerseys,
          updateJerseys,
        }}
      >
        <FiltersContextProvider value={{ filters, updateFilters }}>
          {children}
        </FiltersContextProvider>
      </JerseysViewContextProvider>
    </QueryClientProvider>
  );
}

