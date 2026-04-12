import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../../styles/SharedStyles";

// Modern 2025 animations
export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Modern glassmorphism container for the entire analytics view
export const CardContainer = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 24px;
  border: 1px solid ${({ theme }) => `${theme.borderLight}60`};
  box-shadow:
    ${({ theme }) => theme.shadowXl},
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  padding: 3rem;
  height: calc(100% - 2rem);
  margin: 1rem 2rem;
  animation: ${fadeUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  width: calc(100% - 4rem);
  box-sizing: border-box;
  overflow-y: auto;
  ${scrollbarStyle}
  will-change: transform, opacity;
  transform-origin: top center;
  backface-visibility: hidden;
  position: relative;

  /* Subtle gradient overlay for depth */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.backgroundGradient};
    opacity: 0.1;
    border-radius: 24px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    margin: 1rem;
    padding: 2rem;
    height: calc(100% - 2rem);
    width: calc(100% - 2rem);
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    margin: 0.5rem;
    padding: 1.5rem;
    height: calc(100% - 1rem);
    width: calc(100% - 1rem);
    border-radius: 16px;
  }
`;

// Shared containers
export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  animation: ${fadeUp} 0.5s ease-out;
  box-sizing: border-box;

  > * {
    margin-bottom: 8px;
  }
`;

/** Fills the analytics card without extra child margins — keeps month/year views in the flex chain */
export const AnalyticsViewRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  flex: 1;
  min-height: 0;
  animation: ${fadeUp} 0.5s ease-out;
  box-sizing: border-box;
`;

export const AnalyticsContentScroll = styled.div`
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  ${scrollbarStyle}
`;

// Shared text styles
export const NoHabitMessage = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: ${({ theme }) => theme.textGrey};
  text-align: center;
`;

export const HabitsTitle = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.green};
  margin-bottom: 8px;
`;

// Modern bento-style layout components
// New layout containers
export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
`;

export const AnalyticsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1rem;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  flex: 1;
  min-height: 0;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 0.625rem;
    align-items: stretch;
    max-width: 100%;
  }
`;

export const TilesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 0;
  align-self: stretch;
  height: 100%;

  @media (max-width: 1200px) {
    flex: none;
    height: auto;
  }
`;

export const CalendarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  min-height: 0;
  align-self: stretch;
  height: 100%;
`;

export const TilesAndCalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  margin-top: 2rem;
  gap: 2rem;
  align-items: stretch;
  min-height: 450px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1200px) {
    gap: 1.5rem;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    min-height: auto;
    gap: 1.5rem;
    max-width: 100%;
  }
`;

export const TilesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 0.5625rem;
  width: 100%;
  flex: 1 1 auto;
  min-height: 0;
  align-self: stretch;

  /* Staggered animation for tiles */
  & > *:nth-child(1) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
  }

  & > *:nth-child(2) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s both;
  }

  & > *:nth-child(3) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
  }

  & > *:nth-child(4) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
  }

  & > *:nth-child(5) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
  }

  & > *:nth-child(6) {
    animation: ${scaleIn} 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s both;
  }

  @media (max-width: 1200px) {
    flex: none;
    height: auto;
    min-height: 440px;
    grid-template-rows: repeat(3, 1fr);
    gap: 0.5625rem;
  }

  @media (max-width: 1024px) {
    min-height: 400px;
    gap: 0.625rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    min-height: 360px;
  }
`;

/** Matches month calendar card: primary outline, glass fill, no heavy shadow */
export const TileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 0;
  padding: 0.875rem 0.75rem;
  box-sizing: border-box;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 16px;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  box-shadow: none;
  overflow: hidden;
  cursor: default;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.03;
    border-radius: 16px;
    pointer-events: none;
  }

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    padding: 0.8125rem 0.625rem;
    border-radius: 14px;

    &::before {
      border-radius: 14px;
    }
  }

  @media (max-width: 480px) {
    padding: 1rem 0.625rem;
    border-radius: 12px;

    &::before {
      border-radius: 12px;
    }
  }
`;

/** Habit-tile-style liquid fill for metrics that are 0–100% (e.g. completion rate) */
export const TileProgressFill = styled.div<{
  $progress: number;
  $isComplete: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => Math.min(100, Math.max(0, $progress))}%;
  z-index: 1;
  pointer-events: none;
  background: ${({ $isComplete, theme }) =>
    $isComplete
      ? `linear-gradient(135deg, ${theme.secondary}55, ${theme.secondary}32, ${theme.secondary}78)`
      : `linear-gradient(135deg, ${theme.primary}55, ${theme.primary}32, ${theme.primary}78)`};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: ${({ $isComplete }) =>
    $isComplete ? "16px" : "16px 0 0 16px"};

  @media (max-width: 1024px) {
    border-radius: ${({ $isComplete }) =>
      $isComplete ? "14px" : "14px 0 0 14px"};
  }

  @media (max-width: 480px) {
    border-radius: ${({ $isComplete }) =>
      $isComplete ? "12px" : "12px 0 0 12px"};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: width 0.2s ease-out;
  }
`;

const tileTextOverFillShadow = `
  text-shadow:
    0 1px 2px rgba(0, 0, 0, 0.12),
    0 0 14px rgba(255, 255, 255, 0.45);
`;

export const TileHeading = styled.h3<{ $overProgressFill?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.25rem 0 0 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 2;
  ${({ $overProgressFill }) => ($overProgressFill ? tileTextOverFillShadow : "")}

  @media (max-width: 1024px) {
    font-size: 11px;
    margin-top: 0.2rem;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

export const TileMainContent = styled.div<{
  $isMissedDays?: boolean;
  $isLoading?: boolean;
  $overProgressFill?: boolean;
}>`
  font-size: 36px;
  font-weight: 700;
  color: ${({ $isMissedDays, theme }) =>
    $isMissedDays ? theme.error : theme.primary};
  margin: 0;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};
  position: relative;
  z-index: 2;
  line-height: 1;
  text-align: center;
  ${({ $overProgressFill }) => ($overProgressFill ? tileTextOverFillShadow : "")}

  @media (max-width: 1024px) {
    font-size: 32px;
  }

  @media (max-width: 480px) {
    font-size: 26px;
  }
`;

export const TileSubContent = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.textTertiary};
  margin: 0.25rem 0 0 0;
  text-align: center;
  position: relative;
  z-index: 2;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

/** Short plain-language hint below the tile label or context line */
export const TileDescription = styled.p<{ $overProgressFill?: boolean }>`
  font-size: 10px;
  font-weight: 400;
  line-height: 1.35;
  color: ${({ theme }) => theme.textGrey};
  margin: 0.35rem 0 0 0;
  padding: 0 0.25rem;
  text-align: center;
  max-width: 100%;
  position: relative;
  z-index: 2;
  ${({ $overProgressFill }) => ($overProgressFill ? tileTextOverFillShadow : "")}

  @media (max-width: 480px) {
    font-size: 9px;
    margin-top: 0.3rem;
  }
`;
