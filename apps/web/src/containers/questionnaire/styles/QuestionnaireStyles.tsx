import styled, { keyframes } from "styled-components";
import { QuestionnaireFlowPrimaryButton } from "../../../components/questionnaire/styles/QuestionnaireFlowLayout";
import { Header } from "../../../components/habit-tracker/habits/HabitComponents";
import { BaseButton } from "../../welcome/styles/ButtonStyles";
import {
  AUTH_QUESTIONNAIRE_MARGIN_LEFT,
  scrollbarStyle,
} from "../../../styles/SharedStyles";

/** Shared max width for questionnaire column */
const assessmentMaxWidth = "min(960px, 100%)";

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

// Fills LandingContainer flex column; long questions scroll inside QuestionContent (not clipped)
export const ModernAssessmentContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  align-self: stretch;
  min-height: 0;
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? `calc(100% - ${AUTH_QUESTIONNAIRE_MARGIN_LEFT})` : "100%"};
  margin-left: ${({ $isAuthenticated }) =>
    $isAuthenticated ? AUTH_QUESTIONNAIRE_MARGIN_LEFT : "0"};
  padding: 24px 20px 32px;
  overflow: hidden;

  /* Smooth fade-up animation matching landing page */
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 800px) {
    padding: 16px 16px 24px;
  }

  @media (max-height: 700px) {
    padding: 20px;
  }
`;

/** Same outline pill as welcome Login — compact, no full-width stretch */
export const QuestionnaireBackButton = styled(BaseButton).attrs(() => ({
  type: "button" as const,
  $variant: "login" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: 0 !important;
  padding: 10px 20px !important;
`;

/** Inline with question counter — low profile (overrides BaseButton 44px login min-height) */
export const QuestionnaireBackButtonCompact = styled(QuestionnaireBackButton)`
  padding: 2px 10px !important;
  min-height: 28px !important;
  font-size: 0.75rem !important;
  font-weight: 600 !important;
  line-height: 1.15 !important;
`;

/**
 * Back left, “Question n of m” optically centered (equal 1fr side tracks).
 */
export const AssessmentBackAndStepRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  column-gap: 8px;
  width: 100%;
  margin-top: 6px;
  min-width: 0;

  & > *:first-child {
    justify-self: start;
  }

  & > *:nth-child(2) {
    justify-self: center;
    text-align: center;
  }
`;

/** Progress + card column */
export const AssessmentMainColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  max-width: ${assessmentMaxWidth};
  margin: 0 auto;
`;

/** Desktop: prev | card | next. Mobile: card then nav bar below */
export const QuestionCardRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: clamp(10px, 2vw, 24px);
  width: 100%;
  flex: 1 1 0;
  min-height: 0;

  @media (max-width: 640px) {
    flex-direction: column;
    flex: 1 1 auto;
    align-items: stretch;
    gap: 0;
  }
`;

/** Side arrow column — hidden on small screens (mobile bar used instead) */
export const QuestionNavSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;

  @media (max-width: 640px) {
    display: none;
  }
`;

/** Prev + Next/Submit under the card on narrow viewports */
export const QuestionNavMobileBar = styled.div`
  display: none;

  @media (max-width: 640px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-shrink: 0;
    margin-top: 14px;
    gap: 12px;
    padding: 0 2px;
  }
`;

/** Circular controls — border / hover aligned with welcome `login` outline button */
export const QuestionNavArrowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: none;
  font-family: var(--font-sans), system-ui, sans-serif;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    opacity 0.25s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => `${theme.primary}10`};
    border-color: ${({ theme }) => `${theme.primary}70`};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}55`} inset;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:disabled:hover {
    background: transparent;
    border-color: ${({ theme }) => `${theme.primary}45`};
    box-shadow: none;
  }
`;

/** Compact primary submit for final step (desktop flank + mobile bar) */
export const QuestionnaireNavSubmitButton = styled(QuestionnaireFlowPrimaryButton)`
  flex: none !important;
  min-width: min(160px, 42vw) !important;
  padding: 12px 22px !important;
  font-size: 1rem !important;
`;

// Progress bar only (title + step line live in AssessmentSectionHeader)
export const AssessmentHeader = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 0 4px;
  width: 100%;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`;

// Scrollable middle — flex min-height:0 + flex-start so long checklists aren’t clipped
export const QuestionContent = styled.div`
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding-bottom: 12px;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  ${scrollbarStyle}
`;

// Fade wrapper for smooth question transitions without remounting
export const QuestionFadeWrapper = styled.div`
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.18s ease-in-out;

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
  padding: clamp(24px, 4.5vw, 40px) clamp(20px, 3.5vw, 36px);

  @media (max-width: 480px) {
    border-radius: 16px;
    padding: 20px 16px;
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
  max-width: ${assessmentMaxWidth};
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

/** Question counter — centered in grid middle column */
export const AssessmentStepLine = styled(ProgressIndicator)`
  margin: 0;
  white-space: nowrap;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** Title stack + divider; width matches AssessmentMainColumn */
export const AssessmentSectionHeader = styled(Header)`
  width: 100%;
  max-width: ${assessmentMaxWidth};
  margin-left: auto;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 4px;
  box-sizing: border-box;
  flex-shrink: 0;

  /* Section title scale — not full marketing HeroTitle — frees vertical space for the card */
  & h2 {
    font-size: clamp(1.65rem, 2vw + 0.85rem, 2.35rem);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.12;
    margin: 0 0 6px;
    max-width: none;
    animation: none;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    & h2 {
      font-size: clamp(1.5rem, 1.8vw + 1rem, 2.1rem);
    }
  }

  @media (max-height: 900px) {
    --habit-header-divider-gap: 10px;

    & h2 {
      font-size: clamp(1.35rem, 1.5vw + 0.85rem, 1.95rem);
      margin-bottom: 4px;
    }
  }
`;

