import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth.types';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  
  // Actions
  setCredentials: (user: User, token: string, refreshToken?: string | null) => void;
  setToken: (token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      setCredentials: (user, token, refreshToken = null) => 
        set({ user, token, refreshToken, isAuthenticated: true }),

      setToken: (token) =>
        set({ token, isAuthenticated: true }),
        
      logout: () => 
        set({ user: null, token: null, refreshToken: null, isAuthenticated: false }),
        
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
