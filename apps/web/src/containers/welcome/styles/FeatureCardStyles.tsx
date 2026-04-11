import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
`;

export const FeatureCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  /* Staggered entrance animation */
  & > *:nth-child(1) {
    animation: ${fadeUp} 0.8s ease-out 0.3s both;
  }

  & > *:nth-child(2) {
    animation: ${fadeUp} 0.8s ease-out 0.5s both;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
    max-width: 500px;
  }

  @media (max-width: 480px) {
    gap: 20px;
    max-width: 100%;
  }
`;

export const FeatureCardContainer = styled.div`
  /* Enhanced Glassmorphism Effect */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Modern border styling */
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;

  /* Enhanced shadow system */
  box-shadow: ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset,
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Enhanced hover effects */
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 40px ${({ theme }) => theme.glowColor},
      0 0 0 1px ${({ theme }) => theme.primary}40 inset;
    border-color: ${({ theme }) => theme.primary}60;
    animation: ${float} 3s ease-in-out infinite;
  }

  &:active {
    transform: translateY(-4px) scale(1.01);
  }

  /* Dynamic gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}08 0%,
      ${({ theme }) => theme.accent}05 50%,
      transparent 100%
    );
    opacity: 0;
    transition: all 0.4s ease;
    pointer-events: none;
    border-radius: 24px;
  }

  &:hover::before {
    opacity: 1;
  }

  /* Subtle shine effect on hover */
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      45deg,
      transparent 40%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 60%
    );
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    transition: transform 0.6s ease;
    pointer-events: none;
  }

  &:hover::after {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }

  @media (max-width: 768px) {
    padding: 28px 20px;
    border-radius: 20px;
    min-height: 260px;
  }

  @media (max-width: 480px) {
    padding: 24px 16px;
    border-radius: 18px;
    min-height: 240px;
  }
`;

export const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 20px;
  color: white;
  font-size: 24px;
  box-shadow: ${({ theme }) => theme.shadowLg},
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  /* Subtle inner glow */
  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    border-radius: 18px;
    pointer-events: none;
  }

  ${FeatureCardContainer}:hover & {
    transform: scale(1.1) rotate(5deg);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 30px ${({ theme }) => theme.glowColor},
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  }

  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 22px;
    margin-bottom: 16px;
    border-radius: 18px;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    font-size: 20px;
    margin-bottom: 14px;
    border-radius: 16px;
  }
`;

export const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.375rem;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
    margin-bottom: 8px;
  }
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Styled FontAwesome icon wrapper
export const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
`;
