import { useFetchJerseys } from '@/apis/UseCollections';
import { JerseyCard } from '@/components/ui/jersey';
import { JerseyTable } from '@/components/ui/jersey-table';
import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { ViewMode } from '@/model/ui';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useCallback, useEffect } from 'react';

export const Route = createLazyFileRoute('/_authenticated/')({
  component: Index,
});

function Index() {
  const { jerseys, viewMode, setJerseys } = useJerseysViewContext();

  const { data: collections, isLoading, isError } = useFetchJerseys();

  useEffect(() => {
    if (collections?.jerseys?.length && collections?.jerseys?.length > 0) {
      setJerseys(collections.jerseys);
    }
  }, [collections, setJerseys]);

  const handleDeleteJersey = useCallback(
    (id: number) => {
      setJerseys(jerseys.filter((jersey) => jersey.id !== id));
    },
    [jerseys, setJerseys]
  );

  if (isLoading) return <>Loading...</>;

  if (isError) return <>Error!</>;

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

