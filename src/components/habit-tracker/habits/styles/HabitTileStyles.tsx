import styled, { css } from "styled-components";

// Common styles for both sides of the flip card with glassmorphism
export const flipCardCommonStyles = css<{ $isComplete: boolean }>`
  /* Glassmorphism background */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Gradient text color */
  color: ${({ $isComplete, theme }) =>
    $isComplete ? theme.secondary : theme.primary};
  font-weight: 600;

  /* Modern gradient border */
  border: 2px solid
    ${({ $isComplete, theme }) =>
      $isComplete ? theme.secondary : theme.primary};
  border-radius: 14px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.shadowMd};
  padding: 14px;
  position: absolute;
  backface-visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Styled component for the tile container with modern effects
export const TileContainer = styled.div`
  perspective: 1000px;
  border-radius: 14px;
  width: 100%;
  height: 56px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadowLg};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 54px;
  }

  &:hover .arrow-icon {
    opacity: 1;
  }
`;

// Styled component for the progress bar with gradient
export const ProgressBar = styled.div<{
  $progress: number;
  $isComplete: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $progress }) => $progress}%;
  background: ${({ $isComplete, theme }) =>
    $isComplete
      ? `linear-gradient(90deg, ${theme.secondary}30, ${theme.secondary}20)`
      : `linear-gradient(90deg, ${theme.primary}30, ${theme.primary}20)`};
  z-index: 1;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 14px 0 0 14px;
`;

// Styled component for the flip card with conditional flipping
export const FlipCard = styled.div<{ $flipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ $flipped }) =>
    $flipped ? "rotateX(180deg)" : "rotateX(0deg)"};
`;

// Front side of the flip card
export const FlipCardFront = styled.div<{ $isComplete: boolean }>`
  ${flipCardCommonStyles}
  z-index: 2;
`;

// Back side of the flip card
export const FlipCardBack = styled.div<{ $isComplete: boolean }>`
  ${flipCardCommonStyles}
  transform: rotateX(180deg);
  z-index: 2;
`;

// Styled component for displaying the habit name with gradient text
export const HabitName = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
  text-align: center;
  z-index: 2;
  letter-spacing: -0.25px;
`;

// Styled component for the arrow icon with gradient
export const ArrowIconWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  left: 8px;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.primaryLight};
  }
`;

// Styled component for the text on the back side with modern typography
export const BackText = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 10px;
  z-index: 2;

  .label {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 4px;
  }

  .value {
    background: ${({ theme }) => theme.secondaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
  }

  .spaced {
    margin-top: 6px;
  }
`;

// Styled component for displaying the log count in a bubble with gradient
export const LogCountBubble = styled.div`
  /* Gradient background */
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;
  font-weight: 700;
  font-size: 0.875rem;
  border-radius: 12px;
  min-width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 12px;
  z-index: 2;
  box-shadow: ${({ theme }) => theme.shadowSm};
  padding: 0 8px;
`;
