import { useFetchJerseys } from '@/apis/UseCollections';
import { Button } from '@/components/ui/button';
import { JerseyCard } from '@/components/ui/jersey';
import { JerseyTable } from '@/components/ui/jersey-table';
import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { ViewMode } from '@/model/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { PlusIcon } from 'lucide-react';
import { useCallback, useEffect } from 'react';

export const Route = createLazyFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const { jerseys, viewMode, setJerseys, setIsFormOpen } =
    useJerseysViewContext();

  const { data: collections, isLoading, isError } = useFetchJerseys();

  useEffect(() => {
    if (collections?.jerseys?.length && collections?.jerseys?.length > 0) {
      setJerseys(collections.jerseys);
    }
  }, [collections, setJerseys]);

  const handleDeleteJersey = useCallback(
    (id: string) => {
      setJerseys(jerseys.filter((jersey) => jersey.id !== id));
    },
    [jerseys, setJerseys]
  );

  if (isLoading) return <>Loading...</>;

  if (isError) return <>Error!</>;

  if (jerseys.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold mb-2">
          Your jersey collection is empty
        </h2>
        <p className="text-gray-600 mb-4">
          Start adding jerseys to your collection!
        </p>
        <Button onClick={() => setIsFormOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Your First Jersey
        </Button>
      </div>
    );
  }

  return viewMode === ViewMode.GRID ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jerseys.map((jersey) => (
        <JerseyCard
          jersey={jersey}
          variant="grid"
          onDelete={handleDeleteJersey}
        />
      ))}
    </div>
  ) : (
    <JerseyTable jerseys={jerseys} />
  );
}

