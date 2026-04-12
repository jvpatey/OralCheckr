import styled from "styled-components";
import {
  ModalOutlineButton,
  StyledFormButton,
} from "../../welcome/styles/ModalStyles";
import { HeroDescription } from "../../welcome/styles/WelcomeStyles";
import { QuestionnaireCtaSection } from "../../../components/questionnaire/styles/QuestionnaireFlowLayout";

export const RetakeCtaSection = styled(QuestionnaireCtaSection)`
  margin-top: 0;
  justify-content: center;
`;

/**
 * One shared measure for title + card + copy (avoids a narrow card under a wide headline).
 * ~38rem caps line length on ultra-wide while fitting “Oral Health Questionnaire” on one line.
 */
export const RetakePageStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: min(100%, 38rem);
  gap: clamp(28px, 5vw, 40px);
`;

export const RetakeBelowCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: clamp(18px, 3.5vw, 24px);
`;

/** Body copy under the card — full width of stack (same band as title + card) */
export const RetakeHeroDescription = styled(HeroDescription)`
  margin-bottom: 0;
  max-width: none;
  width: 100%;
`;

/** Score summary — solid bento-style surface */
export const RetakeScoreCard = styled.div`
  position: relative;
  isolation: isolate;
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  padding: 26px 28px 28px;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: none;
  align-self: stretch;
  color: ${({ theme }) => theme.textPrimary};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}07 0%,
      transparent 52%
    );
    opacity: 1;
    pointer-events: none;
    border-radius: 20px;
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 22px 24px 24px;
    gap: 10px;
  }

  @media (max-width: 480px) {
    padding: 20px 20px 22px;
    gap: 10px;
  }
`;

export const RetakeScoreNumber = styled.div<{ $scoreColor: string }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0;
  color: ${({ $scoreColor }) => $scoreColor};

  @media (max-width: 768px) {
    font-size: 2.35rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const RetakeScoreLabel = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const RetakeCompletionLine = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textPrimary};
  opacity: 0.88;
  text-align: center;
  line-height: 1.55;
  margin-top: 4px;
  max-width: 100%;
`;

export const RetakeCompletionMuted = styled.span`
  color: ${({ theme }) => theme.textSecondary};
  opacity: 1;
  font-weight: 400;
`;

/** Confirm copy — theme tokens (Bootstrap defaults are too dark for our modal surface) */
export const RetakeModalMessage = styled.p`
  margin: 0;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};

  strong {
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
  }
`;

export const RetakeModalActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 22px;
`;

export const RetakeModalCancel = styled(ModalOutlineButton)`
  width: auto;
  min-width: 112px;
`;

export const RetakeModalConfirm = styled(StyledFormButton)`
  width: auto;
  min-width: 148px;
`;
