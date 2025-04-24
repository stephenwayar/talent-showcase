import React, { useState } from 'react';
import { IUser } from '../types/user.types';
import { AppStateContext } from '../contexts/appState';
import { MantineProvider } from '@mantine/core';
import { getCookieItem } from '@/helpers/functions/cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

const queryClient = new QueryClient()

const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(getCookieItem('session-user'))

  return (
    <QueryClientProvider client={queryClient}>
      <AppStateContext.Provider
        value={{
          user,
          setUser
        }}
      >
        <MantineProvider>
          {children}
        </MantineProvider>
      </AppStateContext.Provider>
    </QueryClientProvider>
  )
}

export default AppStateProvider