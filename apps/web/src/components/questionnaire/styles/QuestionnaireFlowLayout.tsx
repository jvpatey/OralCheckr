import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { BaseButton } from "../../../containers/welcome/styles/ButtonStyles";
import { Header } from "../../habit-tracker/habits/HabitComponents";

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

/** Same divider + animation as Track / Analyze; width comes from parent shell */
export const QuestionnaireStackHeader = styled(Header)`
  width: 100%;
`;

/** Accounts for sidebar — vertical rhythm matches QuestionnairePageShell (Results) */
export const QuestionnaireFlowContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  min-height: calc(100vh - 120px);
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 0 clamp(16px, 4vw, 24px) 48px;
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 800px) {
    padding: 0 16px 40px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding-bottom: 32px;
  }
`;

export const QuestionnaireCtaSection = styled.div`
  margin-top: clamp(28px, 5vw, 40px);
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

/** Body below left-aligned header — description + CTA centered on start / retake */
export const QuestionnaireFlowBodyCentered = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
`;

export const QuestionnaireCtaSectionCentered = styled(QuestionnaireCtaSection)`
  justify-content: center;
`;

export const QuestionnaireCtaLink = styled(BaseButton).attrs(() => ({
  as: Link,
  $variant: "primary" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: min(100%, 260px);
  padding: 14px 28px;
  font-size: 1.0625rem;
  text-decoration: none;
  text-align: center;
`;

export const QuestionnairePrimaryCta = styled(BaseButton).attrs(() => ({
  $variant: "primary" as const,
  type: "button" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: min(100%, 260px);
  padding: 14px 28px;
  font-size: 1.0625rem;
`;

/**
 * Outline pill — same look as suggested-habit “Add to tracker” / “Go to habit tracker”
 * (welcome login outline + results retake CTA).
 */
export const QuestionnaireOutlineCta = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  min-height: 46px;
  padding: 11px 18px;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  cursor: pointer;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease,
    opacity 0.25s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

/** In-flow questionnaire: Next / Submit */
export const QuestionnaireFlowPrimaryButton = styled(BaseButton).attrs(() => ({
  $variant: "primary" as const,
  type: "button" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: min(100%, 132px);
  padding: 14px 28px;
  font-size: 1.0625rem;
`;

/** In-flow questionnaire: Previous */
export const QuestionnaireFlowSecondaryButton = styled(BaseButton).attrs(() => ({
  $variant: "secondary" as const,
  type: "button" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: min(100%, 132px);
  padding: 14px 28px;
  font-size: 1.0625rem;
`;

/** In-flow questionnaire: Quit / Exit to results */
export const QuestionnaireFlowDangerButton = styled(BaseButton).attrs(() => ({
  $variant: "danger" as const,
  type: "button" as const,
}))`
  flex: none !important;
  width: auto !important;
  min-width: min(100%, max-content);
  padding: 14px 22px;
  font-size: 1.0625rem;
  white-space: nowrap;
  gap: 8px;
`;

/** Results / long-form questionnaire pages — top-aligned, full-width content */
export const QuestionnairePageShell = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 0 clamp(16px, 4vw, 24px) 48px;
  min-height: calc(100vh - 120px);
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 1199px) {
    width: 100%;
    margin-left: 0;
  }

  @media (max-width: 800px) {
    padding: 0 16px 40px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding-bottom: 32px;
  }
`;

export const QuestionnaireGuestSignupCta = styled(BaseButton).attrs(() => ({
  $variant: "signup" as const,
  type: "button" as const,
}))`
  flex: none !important;
  width: 100%;
  max-width: min(100%, 440px);
  padding: 14px 24px;
  font-size: 1rem;
  line-height: 1.45;
  white-space: normal;
`;
