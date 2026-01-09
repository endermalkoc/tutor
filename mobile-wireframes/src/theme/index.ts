/**
 * TutorStudio Mobile - Theme System
 * Centralized theme exports and context
 */

import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { useColorScheme } from 'react-native';

export { colors, lightTheme, darkTheme, type ThemeColors } from './colors';
export { spacing, space, borderRadius, type Spacing, type BorderRadius } from './spacing';
export { fontFamily, fontSize, lineHeight, fontWeight, typography, type TypographyVariant } from './typography';
export { shadows, type Shadow } from './shadows';

import { lightTheme, darkTheme, type ThemeColors } from './colors';
import { spacing, borderRadius } from './spacing';
import { shadows } from './shadows';
import { typography } from './typography';

// Combined theme object
export interface Theme {
  colors: ThemeColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  typography: typeof typography;
  isDark: boolean;
}

const createTheme = (isDark: boolean): Theme => ({
  colors: isDark ? darkTheme : lightTheme,
  spacing,
  borderRadius,
  shadows,
  typography,
  isDark,
});

// Theme context
interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  const value = useMemo<ThemeContextValue>(() => ({
    theme: createTheme(isDark),
    isDark,
    toggleTheme: () => setIsDark((prev) => !prev),
    setTheme: setIsDark,
  }), [isDark]);

  return React.createElement(ThemeContext.Provider, { value }, children);
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    // Return light theme as default if no provider
    return createTheme(false);
  }
  return context.theme;
}

export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
