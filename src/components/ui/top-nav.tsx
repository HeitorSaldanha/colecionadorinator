import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  PlusIcon,
  LayoutList,
  LayoutGrid,
  SlidersHorizontal,
  Moon,
  Sun,
} from 'lucide-react';
import { JerseyForm } from '@/components/form/jersey-form';
import { useEffect, useState } from 'react';
import { Ijersey } from '@/model/jersey';
import { useFiltersContext } from '@/contexts/FiltersContext';
import MultipleSelector from './multiple-select';
import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { ViewMode } from '@/model/ui';
import { useSessionContext } from '@/contexts/SessionContext';
import { useNavigate } from '@tanstack/react-router';

export function TopNav() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const { filters } = useFiltersContext();
  const {
    isEditMode,
    isFormOpen,
    selectedJersey,
    viewMode,
    setIsEditMode,
    setIsFormOpen,
    setViewMode,
  } = useJerseysViewContext();

  const isGridView = viewMode === ViewMode.GRID;

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const handleAddJersey = (jersey: Omit<Ijersey, 'id' | 'imageUrl'>) => {
    /*
    setJerseys([
      ...jerseys,
      {
        ...jersey,
        id: jerseys.length + 1,
        imageUrl: 'https://placehold.co/300x300',
      },
    ]);
    setIsOpen(false);
    */
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const { session, signOut } = useSessionContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    signOut();
    navigate({ to: '/' });
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Football Jersey Collection</h1>
      <div className="flex space-x-2">
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{session.user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>
                <Button onClick={handleSignOut}>Logout</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
        <Button variant="outline" size="icon" onClick={toggleTheme}>
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" size="icon">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filter Jerseys</DrawerTitle>
              <DrawerDescription>
                Apply filters to narrow down your jersey collection
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="team-filter">
                  Team
                  <MultipleSelector
                    defaultOptions={[]}
                    value={filters.teams}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </Label>
              </div>
              <div>
                <Label htmlFor="player-filter">
                  Player
                  <MultipleSelector
                    defaultOptions={[]}
                    value={filters.players}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </Label>
              </div>
              <div>
                <Label htmlFor="number-filter">
                  Number
                  <MultipleSelector
                    defaultOptions={[]}
                    value={filters.numbers}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </Label>
              </div>
              <div>
                <Label htmlFor="season-filter">
                  Season
                  <MultipleSelector
                    defaultOptions={[]}
                    value={filters.seasons}
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </Label>
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setViewMode(isGridView ? ViewMode.LIST : ViewMode.GRID)
          }
        >
          {isGridView ? (
            <LayoutList className="h-4 w-4" />
          ) : (
            <LayoutGrid className="h-4 w-4" />
          )}
        </Button>
        <Dialog
          open={isFormOpen}
          onOpenChange={(isOpen) => {
            setIsFormOpen(isOpen);
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setIsEditMode(false);
                setIsFormOpen(true);
              }}
            >
              <PlusIcon className="mr-2 h-4 w-4" /> Add Jersey
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? 'Edit Jersey' : 'Add New Jersey'}
              </DialogTitle>
            </DialogHeader>
            <JerseyForm
              onSubmit={isEditMode ? () => {} : handleAddJersey}
              initialData={selectedJersey}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
