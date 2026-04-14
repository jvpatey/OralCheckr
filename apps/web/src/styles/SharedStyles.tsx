import { css } from "styled-components";

/**
 * Fixed `ModernNavBar` + breathing room. Sidebar and habit/analytics fixed columns
 * must use the same `top` and viewport subtraction so cards aren’t tucked under the nav.
 * (Landing content uses up to 120px top padding for the same bar.)
 */
export const AUTH_FIXED_MAIN_TOP = "120px";

/**
 * Space below the main column / sidebar (dock, window chrome, safe area).
 * Keeps the glass shell off the bottom edge of the viewport.
 */
export const AUTH_FIXED_MAIN_BOTTOM_INSET = `calc(clamp(20px, 3vh, 48px) + env(safe-area-inset-bottom, 0px))`;

export const AUTH_FIXED_MAIN_HEIGHT_CALC = `calc(100dvh - ${AUTH_FIXED_MAIN_TOP} - ${AUTH_FIXED_MAIN_BOTTOM_INSET})`;

/**
 * Left edge of `NavContainer` / logo — matches `ModernNavBar` horizontal padding (32px)
 * plus centering when the shell is narrower than 1400px.
 */
export const SIDEBAR_LEFT = `calc(32px + max(0px, (100vw - 64px - min(1400px, 100vw - 64px)) / 2))`;

export const SIDEBAR_WIDTH = "220px";

/** Fixed habit/analytics column: flush to the right of the sidebar */
export const AUTH_HABIT_COLUMN_LEFT = `calc(${SIDEBAR_LEFT} + ${SIDEBAR_WIDTH})`;

/** Viewport inset reserved on the right of the fixed main column (matches previous 252 − 236) */
export const AUTH_MAIN_RIGHT_INSET = "16px";

export const AUTH_HABIT_COLUMN_WIDTH = `calc(100% - ${SIDEBAR_LEFT} - ${SIDEBAR_WIDTH} - ${AUTH_MAIN_RIGHT_INSET})`;

/** Authenticated questionnaire / results: small gap after sidebar (legacy 240px = 16 + 220 + 4) */
export const AUTH_QUESTIONNAIRE_MARGIN_LEFT = `calc(${SIDEBAR_LEFT} + ${SIDEBAR_WIDTH} + 4px)`;

export const scrollbarStyle = css`
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => `${theme.textGrey}40`};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => `${theme.textGrey}60`};
  }
`;
