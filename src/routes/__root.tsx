import { lazy, Suspense, useEffect, useState } from 'react';
import { createRootRoute, Outlet, useMatchRoute } from '@tanstack/react-router';
import { TopNav } from '@/components/ui/top-nav';
import JerseyDashboard from '@/App';
import { supabase } from '@/db/supabase';
import { Session } from '@supabase/supabase-js';
import { SessionContextProvider } from '@/contexts/SessionContext';

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

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const matchRoute = useMatchRoute();

  const matchedLoginRoute = matchRoute({ to: '/login' });

  return (
    <SessionContextProvider
      value={{
        session,
        setSession,
        signOut: async () => await supabase.auth.signOut(),
      }}
    >
      {matchedLoginRoute ? (
        <Outlet />
      ) : (
        <div className="container mx-auto p-4">
          <JerseyDashboard>
            <TopNav />
            <Outlet />
          </JerseyDashboard>
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </div>
      )}
    </SessionContextProvider>
  );
}
