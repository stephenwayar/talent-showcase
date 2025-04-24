import { IUser } from '@/types/user.types';
import { createContext } from 'react';

export type AppStateContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const AppStateContext = createContext({} as AppStateContextType);