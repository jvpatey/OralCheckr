import "styled-components";

// Theme type based the theme structure
declare module "styled-components" {
  export interface DefaultTheme {
    // Legacy colors (for backward compatibility)
    disabledBackground: string;
    accentBackgroundColor: string;
    disabledText: string;
    textGrey: string;
    darkGrey: string;
    backgroundColor: string;
    blue: string;
    green: string;
    yellow: string;
    red: string;
    white: string;

    // Primary Colors (Cyan - Fresh, clean, dental)
    primary: string;
    primaryLight: string;
    primaryDark: string;
    primaryGradient: string;

    // Secondary Colors (Emerald - Health, growth)
    secondary: string;
    secondaryLight: string;
    secondaryDark: string;
    secondaryGradient: string;

    // Accent Colors (Violet - Modern sophistication)
    accent: string;
    accentLight: string;
    accentGradient: string;

    // Semantic Colors
    success: string;
    successLight: string;
    warning: string;
    warningLight: string;
    error: string;
    errorLight: string;
    info: string;
    infoLight: string;

    // Surface & Background Colors
    surfaceColor: string;
    surfaceElevated: string;
    backgroundGradient: string;

    // Text Colors (Better hierarchy)
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    textDisabled: string;

    // Border Colors
    borderLight: string;
    borderMedium: string;
    borderDark: string;

    // Special Effects
    glassBg: string;
    glassBlur: string;
    shadowSm: string;
    shadowMd: string;
    shadowLg: string;
    shadowXl: string;
    glowColor: string;
    overlayBg: string;
  }
}
