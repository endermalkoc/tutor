/**
 * TutorStudio Mobile - Spacing System
 * Based on 4px grid (matching web design tokens)
 */

export const spacing = {
  /** 4px */
  xs: 4,
  /** 8px */
  sm: 8,
  /** 12px */
  md: 12,
  /** 16px */
  lg: 16,
  /** 20px */
  xl: 20,
  /** 24px */
  '2xl': 24,
  /** 32px */
  '3xl': 32,
  /** 40px */
  '4xl': 40,
  /** 48px */
  '5xl': 48,
} as const;

// Numeric spacing for programmatic access
export const space = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
} as const;

export const borderRadius = {
  /** 4px */
  sm: 4,
  /** 6px */
  md: 6,
  /** 8px */
  lg: 8,
  /** 12px */
  xl: 12,
  /** 16px */
  '2xl': 16,
  /** 9999px - Fully rounded */
  full: 9999,
} as const;

export type Spacing = keyof typeof spacing;
export type BorderRadius = keyof typeof borderRadius;
