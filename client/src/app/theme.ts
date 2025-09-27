/**
 * Central theme configuration for the Israel Open Weather app
 * All theme values are defined here and used throughout the application
 *
 * Usage:
 * - Import the theme object: import { theme } from './theme'
 * - Use in styles: style={{ background: theme.colors.primary }}
 * - Use in Tailwind classes where possible, or combine with inline styles
 *
 * The theme includes:
 * - Colors for different weather conditions
 * - Gradients for backgrounds
 * - Typography settings
 * - Spacing, radius, and shadow utilities
 */

export const theme = {
  colors: {
    // Base colors
    background: 'var(--background)',
    foreground: 'var(--foreground)',

    // Weather theme colors
    primary: 'var(--weather-primary)',
    secondary: 'var(--weather-secondary)',
    accent: 'var(--weather-accent)',

    // Weather conditions
    sunny: 'var(--sunny)',
    cloudy: 'var(--cloudy)',
    rainy: 'var(--rainy)',
    snowy: 'var(--snowy)',
    stormy: 'var(--stormy)',

    // UI elements
    cardBg: 'var(--card-bg)',
    cardBorder: 'var(--card-border)',
    inputBg: 'var(--input-bg)',
    buttonPrimary: 'var(--button-primary)',
    buttonPrimaryText: 'var(--button-primary-text)',
  },

  gradients: {
    sky: 'var(--gradient-sky)',
    sunny: 'var(--gradient-sunny)',
    cloudy: 'var(--gradient-cloudy)',
    rainy: 'var(--gradient-rainy)',
  },

  fonts: {
    primary: 'var(--font-primary)',
    mono: 'var(--font-mono)',
  },

  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
  },

  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    xl: 'var(--radius-xl)',
  },

  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
} as const;

// Type helpers
export type ThemeColors = typeof theme.colors;
export type ThemeGradients = typeof theme.gradients;
export type ThemeFonts = typeof theme.fonts;
export type ThemeSpacing = typeof theme.spacing;
export type ThemeRadius = typeof theme.radius;
export type ThemeShadows = typeof theme.shadows;