// hooks/useAuth.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/app/login/types'; // Import your existing User type

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: async () => {
        try {
          // Add your logout API call here if needed
          // await api.logout();
          
          // Clear the auth state
          set({ isAuthenticated: false, user: null });
          
          // Clear any stored tokens or other auth data
          localStorage.removeItem('token');
          
          return Promise.resolve();
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }),
    }
  )
);