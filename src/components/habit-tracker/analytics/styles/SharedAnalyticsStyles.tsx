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
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: ${({ theme }) => theme.shadowXl},
    ${({ theme }) => theme.glowColor} 0 0 40px;
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
    margin-bottom: 15px;
  }

  .dropdown {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .dropdown-toggle {
    width: 215px;
  }

  @media (max-width: 600px) {
    .dropdown-toggle {
      width: 145px;
    }
  }
`;

// Page title styling
export const AnalyticsTitle = styled.h1`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;
  animation: ${fadeUp} 0.8s ease-out;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const AnalyticsContainer = styled.div`
  /* Account for sidebar width (220px) + margin (16px) + padding (16px) */
  width: calc(100% - 252px);
  height: calc(100vh - 96px);
  overflow: hidden;
  position: absolute;
  /* Account for navbar height (96px) */
  top: 96px;
  /* Account for sidebar width (220px) + margin (16px) */
  left: 236px;
  animation: ${fadeUp} 1s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  background: ${({ theme }) => theme.backgroundGradient};
  padding: 2rem;
  overflow-y: auto;
  ${scrollbarStyle}

  @media (max-width: 800px) {
    /* Account for mobile sidebar width (70px) + margin (8px) + padding (8px) */
    width: calc(100% - 86px);
    /* Account for navbar height on mobile */
    top: 88px;
    /* Account for mobile sidebar width (70px) + margin (8px) */
    left: 78px;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }

  @media (max-height: 700px) {
    /* Account for smaller navbar height on short screens */
    top: 88px;
    height: calc(100vh - 110px);
  }
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
  gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
    max-width: 100%;
  }
`;

export const TilesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CalendarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
  gap: 1rem;
  width: 100%;
  height: 400px;
  flex-shrink: 0;

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

  @media (max-width: 1200px) {
    height: 360px;
    gap: 0.875rem;
  }

  @media (max-width: 1024px) {
    height: auto;
    min-height: 320px;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    height: 280px;
  }
`;

// Modern glassmorphism tile styles with hover effects - Dashboard format
export const TileContainer = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
  box-shadow: ${({ theme }) => theme.shadowLg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.05;
    border-radius: 20px;
    transition: opacity 0.3s ease;
  }

  /* Hover effects */
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowXl},
      ${({ theme }) => theme.glowColor} 0 0 30px;

    &::before {
      opacity: 0.1;
    }
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 1024px) {
    min-height: 160px;
    padding: 1.5rem;
    border-radius: 16px;

    &::before {
      border-radius: 16px;
    }
  }

  @media (max-width: 480px) {
    min-height: 140px;
    padding: 1.25rem;
    border-radius: 12px;

    &::before {
      border-radius: 12px;
    }
  }
`;

export const TileHeading = styled.h3`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0.25rem 0 0 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: relative;
  z-index: 1;

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
}>`
  font-size: 42px;
  font-weight: 700;
  color: ${({ $isMissedDays, theme }) =>
    $isMissedDays ? theme.error : theme.primary};
  margin: 0;
  opacity: ${({ $isLoading }) => ($isLoading ? 0.5 : 1)};
  position: relative;
  z-index: 1;
  line-height: 1;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 36px;
  }

  @media (max-width: 480px) {
    font-size: 28px;
  }
`;

export const TileSubContent = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.textTertiary};
  margin: 0.25rem 0 0 0;
  text-align: center;
  position: relative;
  z-index: 1;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
