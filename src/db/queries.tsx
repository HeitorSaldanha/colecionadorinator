import { Database } from '@/model/supabase';
import { SupabaseClient } from '@supabase/supabase-js';

export function getUserJerseys(client: SupabaseClient<Database>) {
  return client.from('collections').select('*').limit(1).single();
}
