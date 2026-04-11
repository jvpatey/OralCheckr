import styled, { keyframes } from "styled-components";

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

// Dashboard CTA grid — gap and max width aligned with BentoGridContainer
export const LandingCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 1;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

export const CenteredCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

// Stats — spacing aligned with welcome feature grid
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto clamp(32px, 5vw, 48px);
  padding: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: clamp(24px, 4vw, 36px);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 24px;
  }
`;

// Stat tiles — solid bento-style surface (BentoCardContainer)
export const StatCard = styled.div`
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;
  transition:
    box-shadow 0.35s ease,
    border-color 0.35s ease,
    transform 0.35s ease;
  animation: ${fadeUp} 0.8s ease-out both;
  position: relative;
  overflow: hidden;

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }
  &:nth-child(4) {
    animation-delay: 0.4s;
  }

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

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 14px;
  }
`;

export const StatValue = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const StatLabel = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSecondary};
  position: relative;
  z-index: 1;

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;
