import { DefaultTheme } from "styled-components/dist/types";

// theme colors for light mode
export const lightTheme: DefaultTheme = {
  disabledBackground: "#e0e0e0",
  accentBackgroundColor: "#eeeeee",
  disabledText: "#CCC",
  textGrey: "#848889",
  darkGrey: "#808080",
  backgroundColor: "#f5f5f5",
  blue: "#3f93b2",
  green: "#41bc7a",
  yellow: "#f1c232",
  red: "#ff6961",
  white: "#FFFFFF"
}

// theme colors for dark mode
export const darkTheme: DefaultTheme = {
  disabledBackground: "#4a4a4a",
  accentBackgroundColor: "#3a3a3a",
  disabledText: "#434343",
  textGrey: "#848889",
  darkGrey: "#808080",
  backgroundColor: "#2c2c2c",
  blue: "#3f93b2",
  green: "#41bc7a",
  yellow: "#f1c232",
  red: "#ff6961",
  white: "#3a3a3a"
}

// colors for heatmap shades
export const greenHeatMapShades = {
  Light: "#9af4a0",
  MediumLight: "#66d979",
  Medium: "#41bc7a",
  MediumDark: "#339a55",
  Dark: "#1e7f39",
  Darkest: "#005600",
};