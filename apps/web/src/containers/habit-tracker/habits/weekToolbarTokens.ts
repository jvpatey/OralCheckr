import { css } from "styled-components";

const weekToolbarButtonReset = css`
  box-sizing: border-box !important;
  flex: 0 0 auto;
  align-self: center;
  appearance: none;
  -webkit-appearance: none;
  line-height: 1 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  margin: 0;
`;

/**
 * Today pill — `--week-toolbar-control-height` from `DateControlsRow`.
 */
export const weekToolbarControlHeight = css`
  ${weekToolbarButtonReset}
  height: var(--week-toolbar-control-height, 48px) !important;
  min-height: var(--week-toolbar-control-height, 48px) !important;
  max-height: var(--week-toolbar-control-height, 48px) !important;
`;

/**
 * Calendar icon — `--week-toolbar-calendar-size` (smaller than Today: filled + shadow reads larger).
 */
export const weekToolbarCalendarButtonBox = css`
  ${weekToolbarButtonReset}
  padding-left: 0 !important;
  padding-right: 0 !important;
  width: var(--week-toolbar-calendar-size, 40px) !important;
  min-width: var(--week-toolbar-calendar-size, 40px) !important;
  max-width: var(--week-toolbar-calendar-size, 40px) !important;
  height: var(--week-toolbar-calendar-size, 40px) !important;
  min-height: var(--week-toolbar-calendar-size, 40px) !important;
  max-height: var(--week-toolbar-calendar-size, 40px) !important;
`;
