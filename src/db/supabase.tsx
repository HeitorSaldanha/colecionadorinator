import { Database } from '@/model/supabase';
import { createBrowserClient } from '@supabase/ssr';
import invariant from 'tiny-invariant';

let client: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function getSupabaseBrowserClient() {
  if (client) {
    return client;
  }

  const { VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY } = import.meta.env;

  invariant(VITE_SUPABASE_URL, `Supabase URL was not provided`);
  invariant(VITE_SUPABASE_API_KEY, `Supabase Anon key was not provided`);

  return createBrowserClient<Database>(
    VITE_SUPABASE_URL,
    VITE_SUPABASE_API_KEY
  );
}
