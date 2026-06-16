import { create } from 'zustand';
import { User } from '../types/models';
import { storage } from '../utils/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: User | null) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  isAuthenticated: false,
  isHydrated: false,

  setUser: async user => {
    if (user) {
      const { password: _, ...safeUser } = user;
      await storage.setUser(safeUser);
      set({ user: safeUser as User, isAuthenticated: true });
    } else {
      await storage.removeUser();
      set({ user: null, isAuthenticated: false });
    }
  },

  hydrate: async () => {
    const stored = await storage.getUser<User>();
    set({
      user: stored,
      isAuthenticated: !!stored,
      isHydrated: true,
    });
  },

  logout: async () => {
    await storage.removeUser();
    set({ user: null, isAuthenticated: false });
  },
}));
