import styled, { keyframes } from "styled-components";
import { scrollbarStyle } from "../../../styles/SharedStyles";

// Smooth fade-up animation matching landing page
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Column capped to viewport so long questions scroll inside QuestionContent (not clipped)
export const ModernAssessmentContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 40px 20px;
  max-height: calc(100dvh - clamp(100px, 11vw, 132px) - clamp(40px, 5vw, 56px));
  overflow: hidden;

  /* Smooth fade-up animation matching landing page */
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 800px) {
    padding: 20px 16px;
    max-height: calc(100dvh - clamp(88px, 14vw, 108px) - clamp(32px, 6vw, 48px));
  }

  @media (max-height: 700px) {
    padding: 20px;
    max-height: calc(100dvh - 88px - 36px);
  }
`;

// Compact header section with minimal spacing
export const AssessmentHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 18px;
    padding: 0 16px;
  }
`;

// Scrollable middle — flex min-height:0 + flex-start so long checklists aren’t clipped
export const QuestionContent = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  ${scrollbarStyle}

  @media (max-width: 768px) {
    margin-bottom: 18px;
  }
`;

// Fade wrapper for smooth question transitions without remounting
export const QuestionFadeWrapper = styled.div`
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.12s ease-in-out;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
`;

/** Bento-style surface wrapping the active question */
export const QuestionPanel = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  padding: clamp(20px, 4vw, 32px) clamp(16px, 3vw, 28px);

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 18px 14px;
  }
`;

// Compact action section for buttons
export const ActionSection = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  margin-top: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 12px;
    flex-direction: column;
    align-items: stretch;
    margin-top: 14px;
  }
`;

// Error message styling
export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.error};
  background: ${({ theme }) => theme.errorLight}20;
  border: 1px solid ${({ theme }) => theme.errorLight};
  border-radius: 12px;
  padding: 16px;
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

/** Host for role="progressbar" — bar + % on one row */
export const ProgressRoot = styled.div`
  width: 100%;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-bottom: 8px;
  }
`;

export const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 22px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) inset;

  @media (max-width: 768px) {
    height: 20px;
  }

  @media (max-width: 480px) {
    height: 18px;
  }
`;

/** Centered on the track — legible on both fill and track (shadow + white) */
export const ProgressPercentInside = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color: #ffffff;
  text-shadow:
    0 0 6px rgba(0, 0, 0, 0.65),
    0 1px 2px rgba(0, 0, 0, 0.85);
  pointer-events: none;
  user-select: none;

  @media (min-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const ProgressFill = styled.div<{ $percent: number }>`
  height: 100%;
  width: ${({ $percent }) => Math.min(100, Math.max(0, $percent))}%;
  border-radius: inherit;
  background: ${({ theme }) => theme.primaryGradient};
  box-shadow: 0 0 12px ${({ theme }) => `${theme.primary}35`};
  transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const ProgressLabelsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const ProgressIndicator = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};

  @media (max-width: 480px) {
    font-size: 0.9375rem;
  }
`;

