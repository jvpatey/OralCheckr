import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { BaseButton } from "../../../containers/welcome/styles/ButtonStyles";
import {
  HeroCopy,
  HeroTitle,
} from "../../../containers/welcome/styles/WelcomeStyles";

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

/** Centered hero column for questionnaire intro / retake (always centered, unlike marketing hero) */
export const QuestionnaireHeroCopy = styled(HeroCopy)`
  align-items: center;
  text-align: center;

  @media (min-width: 1024px) {
    align-items: center;
    text-align: center;
  }
`;

/** Page title — hero scale; full phrase stays on one line on large viewports */
export const QuestionnairePageTitle = styled(HeroTitle)`
  max-width: min(100%, 30ch);

  @media (min-width: 1024px) {
    max-width: none;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    max-width: none;
    white-space: normal;
  }
`;

/** Accounts for sidebar on questionnaire / habit routes */
export const QuestionnaireFlowContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 40px clamp(16px, 4vw, 24px);
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
    padding: 24px 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding: 20px 16px;
  }
`;

export const QuestionnaireCtaSection = styled.div`
  margin-top: clamp(28px, 5vw, 40px);
  display: flex;
  justify-content: center;
  width: 100%;
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
  align-items: center;
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 0 clamp(16px, 4vw, 24px) 48px;
  min-height: calc(100vh - 120px);
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
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
