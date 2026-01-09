/**
 * TutorStudio Mobile - Color System
 * Ocean Theme - Deep & Professional
 * Matches web wireframe design tokens
 */

export const colors = {
  // Neutral Scale - Ocean-tinted grays
  gray: {
    50: '#f5f8fa',
    100: '#ebf1f5',
    200: '#d8e3eb',
    300: '#b8cdd8',
    400: '#78a3b8',
    500: '#4a7d98',
    600: '#3a6278',
    700: '#2e4d5f',
    800: '#1f333f',
    900: '#16262f',
    950: '#0b1318',
  },

  // Primary - Ocean blue
  primary: {
    50: '#e8f4f8',
    100: '#c5e4ed',
    200: '#9ed3e2',
    300: '#77c1d6',
    400: '#59b3ce',
    500: '#3ba5c5',
    600: '#3397b7',
    700: '#2a84a3',
    800: '#227290',
    900: '#14536c',
  },

  // Success
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },

  // Warning
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },

  // Error
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },

  // Info
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  // Indigo - For special states
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
  },

  // Cyan - For special states
  cyan: {
    50: '#ecfeff',
    100: '#cffafe',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
  },

  // Common
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Light theme semantic colors
export const lightTheme = {
  background: {
    base: colors.gray[50],
    surface: colors.white,
    surfaceRaised: colors.white,
    muted: colors.gray[100],
    subtle: colors.gray[100],
  },
  foreground: {
    default: colors.gray[900],
    secondary: colors.gray[600],
    muted: colors.gray[500],
    faint: colors.gray[400],
    onAccent: colors.white,
  },
  border: {
    default: colors.gray[200],
    subtle: colors.gray[100],
    strong: colors.gray[300],
  },
  primary: colors.primary[500],
  primaryDark: colors.primary[600],
  success: colors.success[500],
  warning: colors.warning[500],
  error: colors.error[500],
  info: colors.info[500],
};

// Dark theme semantic colors
export const darkTheme = {
  background: {
    base: colors.gray[950],
    surface: colors.gray[900],
    surfaceRaised: colors.gray[800],
    muted: colors.gray[800],
    subtle: colors.gray[800],
  },
  foreground: {
    default: colors.gray[50],
    secondary: colors.gray[400],
    muted: colors.gray[500],
    faint: colors.gray[600],
    onAccent: colors.white,
  },
  border: {
    default: colors.gray[800],
    subtle: colors.gray[800],
    strong: colors.gray[700],
  },
  primary: colors.primary[400],
  primaryDark: colors.primary[500],
  success: '#4ade80',
  warning: '#fbbf24',
  error: '#f87171',
  info: colors.info[400],
};

export type ThemeColors = typeof lightTheme;
