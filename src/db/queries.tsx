import { Ijersey } from '@/model/jersey';
import { Database } from '@/model/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export function getUserJerseys(client: SupabaseClient<Database>) {
  return client.from('collections').select('*').limit(1).single();
}

export function updateJerseys(
  client: SupabaseClient<Database>,
  jerseys: Ijersey[],
  ownerId: string
) {
  return client
    .from('collections')
    .update({ jerseys })
    .eq('owner', ownerId)
    .select();
}
