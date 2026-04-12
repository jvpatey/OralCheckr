import { css } from "styled-components";

/**
 * Fixed `ModernNavBar` + breathing room. Sidebar and habit/analytics fixed columns
 * must use the same `top` and `100vh` subtraction so cards aren’t tucked under the nav.
 * (Landing content uses up to 120px top padding for the same bar.)
 */
export const AUTH_FIXED_MAIN_TOP = "120px";
export const AUTH_FIXED_MAIN_HEIGHT_CALC = `calc(100vh - ${AUTH_FIXED_MAIN_TOP})`;

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
