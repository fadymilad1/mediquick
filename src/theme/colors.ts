export const palette = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  secondary: '#14B8A6',
  secondaryDark: '#0D9488',
  white: '#FFFFFF',
  black: '#000000',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
} as const;

export interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  secondary: string;
  error: string;
  success: string;
  tabInactive: string;
  overlay: string;
}

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  primary: palette.primary,
  secondary: palette.secondary,
  error: palette.error,
  success: palette.success,
  tabInactive: '#94A3B8',
  overlay: 'rgba(15, 23, 42, 0.5)',
};

export const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  border: '#334155',
  primary: '#3B82F6',
  secondary: '#2DD4BF',
  error: '#F87171',
  success: '#4ADE80',
  tabInactive: '#64748B',
  overlay: 'rgba(0, 0, 0, 0.6)',
};
