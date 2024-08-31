import { useState } from 'react';
import { JerseyCard } from './components/ui/jersey';
import { Ijersey, JerseyType } from './model/jersey';
import { JerseyTable } from './components/ui/jersey-table';
import { IFilters } from './model/filters';
import {
  emptyFilters,
  FiltersContextProvider,
} from './contexts/FiltersContext';
import { TopNav } from './components/ui/top-nav';
import { JerseysViewContextProvider } from './contexts/JerseysViewContext';
import { ViewMode } from './model/ui';

export default function JerseyDashboard() {
  const [jerseys, setJerseys] = useState<Ijersey[]>([
    {
      id: 1,
      team: 'Manchester United',
      number: '7',
      type: JerseyType.HOME,
      player: 'Cristiano Ronaldo',
      season: '2008',
      imageUrl: 'https://placehold.co/300x300',
    },
    {
      id: 2,
      team: 'Barcelona',
      number: '10',
      player: 'Lionel Messi',
      type: JerseyType.HOME,
      season: '2015',
      imageUrl: 'https://placehold.co/300x300',
    },
    {
      id: 3,
      team: 'Real Madrid',
      number: '9',
      player: 'Ronaldo',
      type: JerseyType.HOME,
      season: '2002',
      imageUrl: 'https://placehold.co/300x300',
    },
  ]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedJersey, setSelectedJersey] = useState<Ijersey | null>(null);
  const [viewMode, setViewMode] = useState(ViewMode.GRID);
  const [filters, setFilters] = useState<IFilters>(emptyFilters);
  const [filteredJerseys, setFilteredJerseys] = useState<Ijersey[]>(jerseys);

  const editJersey = (jersey: Ijersey) => {
    setJerseys(jerseys.map((j) => (j.id === jersey.id ? jersey : j)));
    setIsFormOpen(false);
    setIsEditMode(false);
    setSelectedJersey(null);
  };

  const handleDeleteJersey = (id: number) => {
    setJerseys(jerseys.filter((jersey) => jersey.id !== id));
  };

  const updateFilters = (update: Partial<IFilters>) => {
    setFilters((prev) => ({ ...prev!, ...update }));
  };

  const updateJerseys = (update: Ijersey) => {
    setFilters((prev) => ({ ...prev!, ...update }));
  };

  return (
    <div className="container mx-auto p-4">
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
          <TopNav />
          {viewMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredJerseys.map((jersey) => (
                <JerseyCard
                  jersey={jersey}
                  variant="grid"
                  onDelete={handleDeleteJersey}
                />
              ))}
            </div>
          ) : (
            <JerseyTable jerseys={filteredJerseys} />
          )}
        </FiltersContextProvider>
      </JerseysViewContextProvider>
    </div>
  );
}

