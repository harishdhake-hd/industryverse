import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'ADMIN';
  avatarUrl?: string;
  bio?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      setAuth: (user, token) => {
        localStorage.setItem('industryverse_token', token);
        set({ user, token, isAuthenticated: true });
      },
      clearAuth: () => {
        localStorage.removeItem('industryverse_token');
        set({ user: null, token: null, isAuthenticated: false });
      },
      setLoading: (isLoading) => set({ isLoading }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
    }),
    {
      name: 'industryverse-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
