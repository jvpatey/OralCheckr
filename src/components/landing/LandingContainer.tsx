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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

// Background floating elements for modern effect
export const BackgroundEffects = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 10%;
    left: 10%;
    width: 300px;
    height: 300px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}20,
      ${({ theme }) => theme.accent}20
    );
    border-radius: 50%;
    filter: blur(60px);
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 20%;
    right: 15%;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary}20,
      ${({ theme }) => theme.primary}20
    );
    border-radius: 50%;
    filter: blur(40px);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;

// Modern dashboard container with enhanced styling
export const LandingContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  min-height: 100vh;
  padding: 120px 20px 40px 20px; /* Top padding to account for navbar */
  background: ${({ theme }) => theme.backgroundGradient};
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 100px 16px 30px 16px; /* Reduced top padding on mobile */
  }

  @media (max-width: 480px) {
    padding: 80px 12px 20px 12px; /* Further reduced on small screens */
  }
`;

// Welcome header section
export const WelcomeHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeUp} 1s ease-out 0.2s both;

  @media (max-width: 768px) {
    margin-bottom: 40px;
  }
`;

export const WelcomeTitle = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 4px 8px ${({ theme }) => theme.glowColor});

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const WelcomeSubtitle = styled.p`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
