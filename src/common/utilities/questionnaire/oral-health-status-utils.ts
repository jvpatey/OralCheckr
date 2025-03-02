import { DefaultTheme } from "styled-components";

// Determines the color to use based on the score value

export const getScoreColor = (score: number, theme: DefaultTheme): string => {
  if (score >= 70) {
    return theme.green;
  } else if (score >= 50) {
    return theme.yellow;
  }
  return theme.red;
};
