import styled from "styled-components";
import {
  ModalOutlineButton,
  StyledFormButton,
} from "../../welcome/styles/ModalStyles";

/** Score summary — solid bento-style surface */
export const RetakeScoreCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  padding: 28px 32px;
  margin: clamp(20px, 4vw, 32px) 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 400px;
  width: 100%;
  color: ${({ theme }) => theme.textPrimary};
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
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
    padding: 22px 24px;
    margin: 20px 0;
  }
`;

export const RetakeScoreNumber = styled.div<{ $scoreColor: string }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
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

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const RetakeCompletionLine = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  line-height: 1.5;
  margin-top: 4px;
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
