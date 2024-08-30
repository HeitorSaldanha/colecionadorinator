import { useCallback } from "react";
import { Button } from "./button";
import MultipleSelector from "./multiple-select";
import { useFiltersContext } from "@/context/filtersContext";
import { useViewModeContext, ViewMode } from "@/context/viewModeContext";
import { QueueListIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { useJerseysApi } from "@/apis/apis";

export function SideMenu() {
  const {
    filters: { teams, players, seasons },
    updateFilters,
  } = useFiltersContext();

  const { viewMode, setViewMode } = useViewModeContext();

  const handleViewModeChange = useCallback(() => {
    setViewMode(viewMode === ViewMode.GRID ? ViewMode.LIST : ViewMode.GRID);
  }, [viewMode, setViewMode]);

  const filterOptions = useJerseysApi();

  return (
    <aside className="bg-background border-r p-6 flex flex-col gap-6">
      <div className="grid gap-2">
        <h3 className="text-lg font-semibold">Filters</h3>
        <MultipleSelector
          hidePlaceholderWhenSelected
          placeholder="Teams"
          value={teams}
          onChange={(options) => updateFilters({ teams: options })}
          defaultOptions={filterOptions.teams}
        />
        <MultipleSelector
          hidePlaceholderWhenSelected
          value={players}
          onChange={(options) => updateFilters({ teams: options })}
          defaultOptions={filterOptions.players}
          placeholder="Player"
        />
        <MultipleSelector
          hidePlaceholderWhenSelected
          value={seasons}
          onChange={(options) => updateFilters({ teams: options })}
          defaultOptions={filterOptions.seasons}
          placeholder="Season"
        />
      </div>
      <div className="grid gap-2">
        <h3 className="text-lg font-semibold">Collection Summary</h3>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <span>Total Jerseys</span>
            <span className="font-semibold">{0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Most Valuable Jersey</span>
            <span className="font-semibold">${0}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between">
        <Button onClick={() => {}}>Add Jersey</Button>
        <Button variant="ghost" size="icon" onClick={handleViewModeChange}>
          {viewMode === ViewMode.GRID ? <QueueListIcon /> : <TableCellsIcon />}
        </Button>
      </div>
    </aside>
  );
}
