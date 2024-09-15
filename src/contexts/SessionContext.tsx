/* eslint-disable react-refresh/only-export-components */
import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export interface ISessionContext {
  session: Session | null;
  setSession: (session: Session) => void;
  signOut: () => void;
}

export const SessionContext = createContext<ISessionContext>({
  session: null,
  setSession: () => {},
  signOut: () => {},
});

export const SessionContextProvider = SessionContext.Provider;

export const useSessionContext = () => useContext(SessionContext);
