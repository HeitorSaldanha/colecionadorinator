import { useJerseysViewContext } from '@/contexts/JerseysViewContext';
import { useSessionContext } from '@/contexts/SessionContext';
import { getUserJerseys, updateJerseys } from '@/db/queries';
import useSupabase from '@/hooks/useSupabase';
import { Ijersey } from '@/model/jersey';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export function useFetchJerseys() {
  const client = useSupabase();

  const queryFn = async () => {
    return getUserJerseys(client).then((result) => result.data);
  };

  return useQuery({ queryKey: ['jerseys'], queryFn });
}

export function useUpdateJerseys() {
  const client = useSupabase();
  const queryClient = useQueryClient();
  const { jerseys } = useJerseysViewContext();
  const { session } = useSessionContext();

  const mutationFn = async (update: Ijersey[]) => {
    return updateJerseys(
      client,
      [...jerseys, ...update],
      session?.user.id ?? ''
    ).then((result) => result.data);
  };

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jerseys'] });
    },
  });
}
