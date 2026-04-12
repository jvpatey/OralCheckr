import styled, { css } from "styled-components";

// Common styles for both sides — stronger frosted glass
export const flipCardCommonStyles = css<{ $isComplete: boolean }>`
  background: ${({ $isComplete, theme }) =>
    $isComplete
      ? `linear-gradient(
    165deg,
    color-mix(in srgb, ${theme.surfaceElevated} 42%, transparent) 0%,
    ${theme.glassBg} 45%,
    color-mix(in srgb, ${theme.secondary} 14%, ${theme.glassBg}) 100%
  )`
      : `linear-gradient(
    165deg,
    color-mix(in srgb, ${theme.surfaceElevated} 42%, transparent) 0%,
    ${theme.glassBg} 45%,
    color-mix(in srgb, ${theme.primary} 12%, ${theme.glassBg}) 100%
  )`};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  color: ${({ $isComplete, theme }) =>
    $isComplete ? theme.secondary : theme.primary};
  font-weight: 600;

  border: 1px solid
    ${({ $isComplete, theme }) =>
      $isComplete
        ? `color-mix(in srgb, ${theme.secondary} 32%, transparent)`
        : `color-mix(in srgb, ${theme.primary} 28%, transparent)`};
  border-radius: 16px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    ${({ theme }) => theme.shadowMd},
    0 0 0 1px color-mix(in srgb, ${({ theme }) => theme.borderLight} 75%, transparent);
  padding: 16px;
  position: absolute;
  backface-visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
`;

// Styled component for the tile container with modern effects
export const TileContainer = styled.div`
  perspective: 1000px;
  border-radius: 14px;
  flex: 1;
  min-width: 0;
  width: auto;
  height: 56px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &:hover {
    box-shadow: ${({ theme }) =>
      `${theme.shadowLg}, 0 0 28px color-mix(in srgb, ${theme.primary} 22%, transparent)`};
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    height: 54px;
  }

  &:hover .arrow-icon {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`;

// Liquid-style progress bar with flowing animation
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
      ? `linear-gradient(135deg, ${theme.secondary}40, ${theme.secondary}20, ${theme.secondary}60)`
      : `linear-gradient(135deg, ${theme.primary}40, ${theme.primary}20, ${theme.primary}60)`};
  background-size: 200% 100%;
  z-index: 1;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px 0 0 16px;
  overflow: hidden;

  /* Liquid flowing animation */
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 70%
    );
    animation: liquidFlow 3s ease-in-out infinite;
    transform: translateX(-100%) rotate(45deg);
  }

  /* Liquid bubble effect */
  &::after {
    content: "";
    position: absolute;
    bottom: 10%;
    right: 10%;
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    animation: bubbleFloat 2s ease-in-out infinite;
  }

  @keyframes liquidFlow {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    50% {
      transform: translateX(100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) rotate(45deg);
    }
  }

  @keyframes bubbleFloat {
    0%,
    100% {
      transform: translateY(0) scale(1);
      opacity: 0.4;
    }
    50% {
      transform: translateY(-10px) scale(1.2);
      opacity: 0.8;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: width 0.2s ease-out;

    &::before,
    &::after {
      animation: none !important;
    }
  }
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

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
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
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
`;

// Styled component for the arrow icon with glassmorphism
export const ArrowIconWrapper = styled.div`
  position: absolute;
  bottom: 6px;
  left: 10px;
  font-size: 0.75rem;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 3;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 8px;
  padding: 2px 4px;
  border: 1px solid ${({ theme }) => theme.borderLight};

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.primaryLight};
    background: ${({ theme }) => theme.primary}20;
    border-color: ${({ theme }) => theme.primary}40;
  }
`;

// Styled component for the text on the back side with modern glassmorphism typography
export const BackText = styled.div`
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding: 8px 12px;
  z-index: 2;
  position: relative;
  min-height: 100%;
  box-sizing: border-box;

  .label {
    color: ${({ theme }) => theme.textSecondary};
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    margin-bottom: 4px;
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    line-height: 1.2;
  }

  .value {
    background: ${({ theme }) => theme.primaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 700;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
    font-size: 0.9rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    line-height: 1.2;
  }

  .spaced {
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px solid ${({ theme }) => theme.borderLight};
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: -1px;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 1px;
      background: ${({ theme }) => theme.primaryGradient};
    }
  }
`;

// Count badge: quiet glass until goal met, then emerald (secondary) success
export const LogCountBubble = styled.div<{ $isComplete: boolean }>`
  font-size: 0.8125rem;
  font-weight: ${({ $isComplete }) => ($isComplete ? 700 : 600)};
  border-radius: 12px;
  min-width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: 12px;
  z-index: 2;
  padding: 0 9px;
  position: relative;
  overflow: hidden;

  ${({ $isComplete, theme }) =>
    $isComplete
      ? `
    background: ${theme.secondaryGradient};
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.22);
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.2),
      ${theme.shadowMd},
      0 0 12px color-mix(in srgb, ${theme.secondary} 28%, transparent);
  `
      : `
    background: color-mix(in srgb, ${theme.glassBg} 92%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: ${theme.textSecondary};
    border: 1px solid color-mix(in srgb, ${theme.borderLight} 85%, transparent);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  `}

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    opacity: ${({ $isComplete }) => ($isComplete ? 1 : 0)};
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 70%
    );
    animation: ${({ $isComplete }) => ($isComplete ? "shimmer 2.5s ease-in-out infinite" : "none")};
    transform: translateX(-100%) rotate(45deg);
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%) rotate(45deg);
    }
    100% {
      transform: translateX(100%) rotate(45deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      animation: none !important;
    }
  }
`;
