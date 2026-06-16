import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  user: '@mediquick/user',
  theme: '@mediquick/theme',
} as const;

export const storage = {
  async getUser<T>(): Promise<T | null> {
    const raw = await AsyncStorage.getItem(KEYS.user);
    return raw ? (JSON.parse(raw) as T) : null;
  },

  async setUser<T>(user: T): Promise<void> {
    await AsyncStorage.setItem(KEYS.user, JSON.stringify(user));
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(KEYS.user);
  },

  async getThemeMode(): Promise<'light' | 'dark' | null> {
    return AsyncStorage.getItem(KEYS.theme) as Promise<'light' | 'dark' | null>;
  },

  async setThemeMode(mode: 'light' | 'dark'): Promise<void> {
    await AsyncStorage.setItem(KEYS.theme, mode);
  },
};
