import { useMemo } from 'react';
import { useThemeStore } from '../store';
import { darkColors, lightColors, ThemeColors } from '../theme';

export function useTheme(): {
  colors: ThemeColors;
  isDark: boolean;
} {
  const mode = useThemeStore(state => state.mode);
  return useMemo(
    () => ({
      colors: mode === 'dark' ? darkColors : lightColors,
      isDark: mode === 'dark',
    }),
    [mode],
  );
}
