import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { MantineProvider } from '@mantine/core';
import { IUser } from '@/services/types/auth.types';
import { AppStateContext } from '../contexts/appState';
import { getCookieItem } from '@/helpers/functions/cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props { children: React.ReactNode }

const queryClient = new QueryClient()

const AppStateProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(getCookieItem('session-user'))

  const toastOptions = {
    style: {
      padding: '16px',
      borderRadius: '8px',
      fontWeight: '500',
      minWidth: '280px',
      textAlign: 'center' as const, 
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    success: {
      style: {
        backgroundColor: '#10b981',
        color: 'white',
      },
      icon: '✓',
    },
    error: {
      style: {
        backgroundColor: '#ef4444',
        color: 'white',
      },
      icon: '✕',
    },
    duration: 1500,
  };

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

          <Toaster 
            position='bottom-center' 
            toastOptions={toastOptions}
          />
        </MantineProvider>
      </AppStateContext.Provider>
    </QueryClientProvider>
  )
}

export default AppStateProvider