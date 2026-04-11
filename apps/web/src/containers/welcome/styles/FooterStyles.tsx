import styled from "styled-components";
import { Link } from "react-router-dom";

export const FooterContainer = styled.footer`
  width: 100%;
  margin-top: clamp(32px, 4vw, 48px);
  padding: 16px 0 18px;
  position: relative;
  z-index: 1;
  border-top: 1px solid ${({ theme }) => theme.borderLight};
  background: ${({ theme }) => theme.surfaceColor};
  box-shadow:
    0 -1px 0 ${({ theme }) => theme.borderLight} inset,
    0 -8px 28px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    margin-top: 28px;
    padding: 14px 0 16px;
  }
`;

export const FooterInner = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px);
  box-sizing: border-box;
`;

/* Desktop: brand | Support (center) | legal — three-column grid */
export const FooterMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 16px 20px;
    text-align: left;
  }
`;

export const FooterBrand = styled.div`
  flex-shrink: 0;

  @media (min-width: 768px) {
    justify-self: start;
  }
`;

export const FooterCenter = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-self: center;
  }
`;

export const FooterEyebrow = styled.p`
  margin: 0 0 4px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  opacity: 0.95;
`;

export const FooterTitle = styled.h2`
  margin: 0;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.45rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: ${({ theme }) => theme.textPrimary};
`;

export const FooterTitleAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const FooterRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;

  @media (min-width: 768px) {
    justify-self: end;
    align-items: flex-end;
    text-align: right;
    max-width: min(100%, 380px);
  }
`;

export const FooterMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;

  @media (min-width: 768px) {
    align-items: flex-end;
  }
`;

export const FooterCopyright = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textPrimary};
  letter-spacing: -0.02em;
`;

export const FooterCredits = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.textTertiary};
  line-height: 1.4;

  @media (min-width: 768px) {
    max-width: 340px;
  }
`;

export const FooterLink = styled(Link)`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  padding: 0 16px;
  border-radius: 9999px;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;
