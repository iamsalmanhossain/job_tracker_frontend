import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth.types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setCredentials: (user, token) => 
        set({ user, token, isAuthenticated: true }),
        
      logout: () => 
        set({ user: null, token: null, isAuthenticated: false }),
        
      updateUser: (updatedUser) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedUser } : null,
        })),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      // by default, it uses localStorage
    }
  )
);
