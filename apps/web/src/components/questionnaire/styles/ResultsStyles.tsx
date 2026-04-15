import styled from "styled-components";
import { Link } from "react-router-dom";
import { QuestionnaireOutlineCta } from "./QuestionnaireFlowLayout";

/** Grid — aligned with dashboard / bento spacing */
export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  width: 100%;
  max-width: 1300px;
  margin: clamp(8px, 2vw, 16px) auto 0;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 16px;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

/** Solid bento surface — matches retake / dashboard tiles */
const bentoCardBase = styled.div`
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  padding: 24px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition:
    box-shadow 0.35s ease,
    border-color 0.35s ease,
    transform 0.35s ease;
  overflow: hidden;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}07 0%,
      transparent 52%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
    border-radius: 20px;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-3px);
      box-shadow:
        ${({ theme }) => theme.shadowXl},
        0 10px 36px rgba(0, 0, 0, 0.1),
        0 0 0 1px ${({ theme }) => theme.borderLight} inset;
      border-color: ${({ theme }) => `${theme.primary}30`};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }

  @media (max-width: 1024px) {
    min-height: 260px;
    padding: 20px;
  }

  @media (max-width: 768px) {
    min-height: 220px;
    padding: 16px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
    padding: 14px;
  }
`;

export const BentoCard = bentoCardBase;

export const LargeBentoCard = styled(BentoCard)`
  grid-column: 1;
  grid-row: 1;
  color: ${({ theme }) => theme.textPrimary};
  min-height: 200px;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
    min-height: 180px;
  }

  @media (max-width: 768px) {
    min-height: 160px;
  }
`;

export const SmallBentoCard = styled(BentoCard)`
  grid-column: 1;
  grid-row: 2;
  min-height: 200px;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 2;
    min-height: 180px;
  }

  @media (max-width: 768px) {
    min-height: 160px;
  }

  @media (max-width: 480px) {
    min-height: 140px;
  }
`;

export const BentoCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

export const ModernActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: clamp(32px, 5vw, 48px);
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 28px;
  }
`;

export const DateDisplayText = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: ${({ theme }) => theme.primary};
  text-align: center;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 2.35rem;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 6px;
  }
`;

export const AssessLabel = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
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

export const ResultsQuestionnaireCta = styled(QuestionnaireOutlineCta)`
  min-width: min(100%, 240px);
  width: auto;
  max-width: 100%;
  padding: 12px 22px;
  font-size: 0.9375rem;
`;

export const ResultsHeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
`;

export const ResultsHeaderIconCta = styled(QuestionnaireOutlineCta).attrs(() => ({
  as: Link,
}))`
  text-decoration: none;
  min-height: 40px;
  min-width: 40px;
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 9999px;
`;

export const VisitSummaryRow = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: clamp(20px, 3vw, 28px);
  width: 100%;
`;

export const VisitSummaryCta = styled(QuestionnaireOutlineCta).attrs(() => ({
  as: Link,
}))`
  text-decoration: none;
  min-width: min(100%, 280px);
  width: auto;
  max-width: 100%;
  padding: 12px 22px;
  font-size: 0.9375rem;
`;
