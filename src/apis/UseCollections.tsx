import { getUserJerseys } from '@/db/queries';
import useSupabase from '@/hooks/useSupabase';
import { useQuery } from '@tanstack/react-query';

export function useFetchJerseys() {
  const client = useSupabase();

  const queryFn = async () => {
    return getUserJerseys(client).then((result) => result.data);
  };

  return useQuery({ queryKey: ['jerseys'], queryFn });
}
