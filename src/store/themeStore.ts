import { create } from 'zustand';
import { storage } from '../utils/storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  isHydrated: boolean;
  toggleTheme: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: 'light',
  isHydrated: false,

  toggleTheme: async () => {
    const next: ThemeMode = get().mode === 'light' ? 'dark' : 'light';
    await storage.setThemeMode(next);
    set({ mode: next });
  },

  hydrate: async () => {
    const stored = await storage.getThemeMode();
    set({
      mode: stored === 'dark' ? 'dark' : 'light',
      isHydrated: true,
    });
  },
}));
