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

// Modern grid container for dashboard cards
export const LandingCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 32px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 12px;
  }
`;

// Alternative layout for when you want centered cards
export const CenteredCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    gap: 40px;
  }

  @media (max-width: 768px) {
    gap: 24px;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    padding: 0 12px;
  }
`;

// Stats section for dashboard overview
export const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 40px;
  padding: 0 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 30px;
    padding: 0 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 24px;
    padding: 0 12px;
  }
`;

// Individual stat card
export const StatCard = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadowMd};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeUp} 1s ease-out both;

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

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadowLg};
    border-color: ${({ theme }) => theme.primary}40;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;
