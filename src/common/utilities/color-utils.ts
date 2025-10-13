import { DefaultTheme } from "styled-components/dist/types";

// 2025 Modern Color Scheme - Fresh & Medical
// Optimized for oral health applications with clean, trustworthy aesthetics

// theme colors for light mode
export const lightTheme: DefaultTheme = {
  // ============================================
  // LEGACY COLORS (Backward Compatibility)
  // ============================================
  disabledBackground: "#E2E8F0",
  accentBackgroundColor: "#F8FAFC",
  disabledText: "#CBD5E1",
  textGrey: "#94A3B8",
  darkGrey: "#64748B",
  backgroundColor: "#FAFBFC",
  blue: "#06B6D4", // Mapped to new primary
  green: "#10B981", // Mapped to new secondary
  yellow: "#F59E0B", // Mapped to new warning
  red: "#EF4444", // Mapped to new error
  white: "#FFFFFF",

  // ============================================
  // PRIMARY COLORS - Cyan (Cleanliness & Trust)
  // ============================================
  primary: "#06B6D4", // Cyan 500 - Fresh, clean, dental
  primaryLight: "#22D3EE", // Cyan 400 - Lighter variant
  primaryDark: "#0891B2", // Cyan 600 - Darker variant
  primaryGradient: "linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)",

  // ============================================
  // SECONDARY COLORS - Emerald (Health & Growth)
  // ============================================
  secondary: "#10B981", // Emerald 500 - Health, positive habits
  secondaryLight: "#34D399", // Emerald 400
  secondaryDark: "#059669", // Emerald 600
  secondaryGradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",

  // ============================================
  // ACCENT COLORS - Violet (Modern & Premium)
  // ============================================
  accent: "#8B5CF6", // Violet 500 - Modern sophistication
  accentLight: "#A78BFA", // Violet 400
  accentGradient: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",

  // ============================================
  // SEMANTIC COLORS (Status & Feedback)
  // ============================================
  success: "#10B981", // Emerald 500 - Success states
  successLight: "#34D399", // Emerald 400
  warning: "#F59E0B", // Amber 500 - Warnings
  warningLight: "#FBBF24", // Amber 400
  error: "#EF4444", // Red 500 - Errors
  errorLight: "#F87171", // Red 400
  info: "#06B6D4", // Cyan 500 - Info
  infoLight: "#22D3EE", // Cyan 400

  // ============================================
  // SURFACE & BACKGROUND COLORS
  // ============================================
  surfaceColor: "#FFFFFF", // Pure white for cards
  surfaceElevated: "#F8FAFC", // Slate 50 - Elevated surfaces
  backgroundGradient: "linear-gradient(135deg, #FAFBFC 0%, #F1F5F9 100%)",

  // ============================================
  // TEXT COLORS (Typography Hierarchy)
  // ============================================
  textPrimary: "#0F172A", // Slate 900 - Main text
  textSecondary: "#475569", // Slate 600 - Secondary text
  textTertiary: "#94A3B8", // Slate 400 - Tertiary text
  textDisabled: "#CBD5E1", // Slate 300 - Disabled text

  // ============================================
  // BORDER COLORS
  // ============================================
  borderLight: "#E2E8F0", // Slate 200 - Subtle borders
  borderMedium: "#CBD5E1", // Slate 300 - Medium borders
  borderDark: "#94A3B8", // Slate 400 - Prominent borders

  // ============================================
  // SPECIAL EFFECTS (Glassmorphism & Shadows)
  // ============================================
  glassBg: "rgba(255, 255, 255, 0.7)",
  glassBlur: "12px",
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  shadowMd:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  shadowLg:
    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  shadowXl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  glowColor: "rgba(6, 182, 212, 0.4)", // Cyan glow
  overlayBg: "rgba(15, 23, 42, 0.5)", // Dark overlay
};

// theme colors for dark mode
export const darkTheme: DefaultTheme = {
  // ============================================
  // LEGACY COLORS (Backward Compatibility)
  // ============================================
  disabledBackground: "#334155",
  accentBackgroundColor: "#1E293B",
  disabledText: "#475569",
  textGrey: "#94A3B8",
  darkGrey: "#64748B",
  backgroundColor: "#0F172A",
  blue: "#22D3EE", // Brighter cyan in dark mode
  green: "#34D399", // Brighter emerald in dark mode
  yellow: "#FBBF24", // Brighter amber in dark mode
  red: "#F87171", // Brighter red in dark mode
  white: "#1E293B", // Dark surface color

  // ============================================
  // PRIMARY COLORS - Cyan (Brighter in dark)
  // ============================================
  primary: "#22D3EE", // Cyan 400 - Pops more in dark mode
  primaryLight: "#67E8F9", // Cyan 300 - Even brighter
  primaryDark: "#06B6D4", // Cyan 500 - Darker variant
  primaryGradient: "linear-gradient(135deg, #22D3EE 0%, #60A5FA 100%)",

  // ============================================
  // SECONDARY COLORS - Emerald (Brighter in dark)
  // ============================================
  secondary: "#34D399", // Emerald 400
  secondaryLight: "#6EE7B7", // Emerald 300
  secondaryDark: "#10B981", // Emerald 500
  secondaryGradient: "linear-gradient(135deg, #34D399 0%, #10B981 100%)",

  // ============================================
  // ACCENT COLORS - Violet (Brighter in dark)
  // ============================================
  accent: "#A78BFA", // Violet 400
  accentLight: "#C4B5FD", // Violet 300
  accentGradient: "linear-gradient(135deg, #A78BFA 0%, #F472B6 100%)",

  // ============================================
  // SEMANTIC COLORS
  // ============================================
  success: "#34D399", // Emerald 400
  successLight: "#6EE7B7", // Emerald 300
  warning: "#FBBF24", // Amber 400
  warningLight: "#FCD34D", // Amber 300
  error: "#F87171", // Red 400
  errorLight: "#FCA5A5", // Red 300
  info: "#22D3EE", // Cyan 400
  infoLight: "#67E8F9", // Cyan 300

  // ============================================
  // SURFACE & BACKGROUND COLORS
  // ============================================
  surfaceColor: "#1E293B", // Slate 800
  surfaceElevated: "#334155", // Slate 700
  backgroundGradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",

  // ============================================
  // TEXT COLORS
  // ============================================
  textPrimary: "#F8FAFC", // Slate 50 - Main text
  textSecondary: "#CBD5E1", // Slate 300 - Secondary text
  textTertiary: "#94A3B8", // Slate 400 - Tertiary text
  textDisabled: "#475569", // Slate 600 - Disabled text

  // ============================================
  // BORDER COLORS
  // ============================================
  borderLight: "#334155", // Slate 700
  borderMedium: "#475569", // Slate 600
  borderDark: "#64748B", // Slate 500

  // ============================================
  // SPECIAL EFFECTS
  // ============================================
  glassBg: "rgba(30, 41, 59, 0.7)",
  glassBlur: "12px",
  shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
  shadowMd:
    "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
  shadowLg:
    "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)",
  shadowXl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.6), 0 10px 10px -5px rgba(0, 0, 0, 0.5)",
  glowColor: "rgba(34, 211, 238, 0.3)", // Cyan glow (dimmer in dark)
  overlayBg: "rgba(0, 0, 0, 0.7)", // Darker overlay
};

// colors for heatmap shades
export const greenHeatMapShades = {
  Light: "#9af4a0",
  MediumLight: "#66d979",
  Medium: "#41bc7a",
  MediumDark: "#339a55",
  Dark: "#1e7f39",
  Darkest: "#005600",
};

// blue heatmap shades for modern styling
export const blueHeatMapShades = {
  Light: "#93C5FD", // Blue 300
  MediumLight: "#60A5FA", // Blue 400
  Medium: "#3B82F6", // Blue 500
  MediumDark: "#2563EB", // Blue 600
  Dark: "#1D4ED8", // Blue 700
  Darkest: "#1E40AF", // Blue 800
};
