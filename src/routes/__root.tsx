import { lazy, Suspense, useEffect, useState } from 'react';
import {
  createRootRouteWithContext,
  Outlet,
  useMatchRoute,
} from '@tanstack/react-router';
import { TopNav } from '@/components/ui/top-nav';
import AppProviders from '@/App';
import { Session } from '@supabase/supabase-js';
import { SessionContextProvider } from '@/contexts/SessionContext';
import useSupabase from '@/hooks/useSupabase';

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );

interface IRouterContext {
  dbClient: ReturnType<typeof useSupabase>;
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: Root,
});

function Root() {
  const [session, setSession] = useState<Session | null>(null);
  const client = useSupabase();

  useEffect(() => {
    client.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [client.auth]);

  const matchRoute = useMatchRoute();

  const matchedLoginRoute = matchRoute({ to: '/login' });

  return (
    <SessionContextProvider
      value={{
        session,
        setSession,
        signOut: async () => await client.auth.signOut(),
      }}
    >
      {matchedLoginRoute ? (
        <AppProviders>
          <Outlet />
        </AppProviders>
      ) : (
        <div className="container mx-auto p-4">
          <AppProviders>
            <TopNav />
            <Outlet />
          </AppProviders>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </div>
      )}
    </SessionContextProvider>
  );
}
