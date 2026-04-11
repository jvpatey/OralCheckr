import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../styles/SharedStyles";

// Animation keyframes
const slideInFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideOutToLeft = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
`;

const slideOutToRight = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(30px);
  }
`;

// Main container — solid bento tile (matches results / dashboard)
export const CardStackContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 440px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;

  grid-column: 2;
  grid-row: 1 / 3;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}07 0%,
      transparent 52%
    );
    opacity: 0.85;
    pointer-events: none;
    border-radius: 20px;
  }

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 3;
    min-height: 320px;
  }

  @media (max-width: 768px) {
    min-height: 280px;
  }
`;

/** Eyebrow-style label — matches questionnaire “Assess” / results “Improve” */
export const ImprovementLabel = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  opacity: 0.95;
  text-align: center;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

// Content area that fills the card - styled like dashboard
export const ContentArea = styled.div`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 24px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// Edge hover zones for navigation - more subtle like dashboard
export const EdgeHoverZone = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 0;
  ${({ $side }) => $side}: 0;
  width: 25%;
  height: 100%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: ${({ $side }) =>
    $side === "left" ? "flex-start" : "flex-end"};
  padding: ${({ $side }) => ($side === "left" ? "0 0 0 12px" : "0 12px 0 0")};
  opacity: 0;
  transition: opacity 0.3s ease;

  /* Very subtle gradient overlay */
  background: ${({ $side, theme }) =>
    $side === "left"
      ? `linear-gradient(to right, ${theme.primary}04, transparent)`
      : `linear-gradient(to left, ${theme.primary}04, transparent)`};

  &:hover {
    opacity: 1;
  }
`;

// Arrow icon in hover zone - styled like dashboard
export const EdgeArrow = styled.div<{ $side: "left" | "right" }>`
  color: ${({ theme }) => theme.primary};
  font-size: 18px;
  opacity: 0.6;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;

  &:hover {
    opacity: 1;
    transform: scale(1.15);
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

// Content container with slide animation
export const SlideContainer = styled.div<{
  $animationDirection:
    | "slideInLeft"
    | "slideInRight"
    | "slideOutLeft"
    | "slideOutRight"
    | "none";
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  animation: ${({ $animationDirection }) => {
      switch ($animationDirection) {
        case "slideInLeft":
          return slideInFromLeft;
        case "slideInRight":
          return slideInFromRight;
        case "slideOutLeft":
          return slideOutToLeft;
        case "slideOutRight":
          return slideOutToRight;
        default:
          return "none";
      }
    }}
    0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

// Category header - styled like dashboard cards with prominent data display
export const CategoryHeader = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
  line-height: 1.2;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// Recommendation text - styled like dashboard cards
export const RecommendationText = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  text-align: center;
  overflow-y: auto;
  ${scrollbarStyle}
  padding: 0 12px;
  font-weight: 400;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.4;
    padding: 0 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.3;
    padding: 0 4px;
  }
`;

// Empty state
export const NoRecommendations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  padding: 40px 20px;

  .icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.6;
  }

  .message {
    font-size: 1.1rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    padding: 30px 16px;

    .icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
    }

    .message {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 20px 12px;

    .icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    .message {
      font-size: 0.9rem;
    }
  }
`;

// Keyboard navigation hint (subtle)
export const KeyboardHint = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 2;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.textTertiary};
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;

  ${CardStackContainer}:hover & {
    opacity: 0.6;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;
