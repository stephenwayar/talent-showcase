import './index.css'
import '@mantine/core/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppStateProvider from './providers';
import AppRouter from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStateProvider>
      <AppRouter />
    </AppStateProvider>
  </StrictMode>
)