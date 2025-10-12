import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Smooth fade-in animation
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modern fluid container - no card, just fluid layout
export const ModernContainer = styled.div<{ $isAuthenticated: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 120px);
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 40px 20px;

  /* Animation */
  animation: ${fadeInUp} 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
    padding: 20px 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding: 20px;
  }
`;

// Modern hero title with gradient text
export const HeroTitle = styled.h1`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  font-size: 3.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 24px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

// Modern description text
export const DescriptionText = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 24px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 16px;
  }
`;

// Action section for buttons
export const ActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 48px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 32px;
  }
`;

// Modern gradient button
export const GradientButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Modern gradient background */
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;

  /* Typography */
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 18px 48px;
  border-radius: 16px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowLg};

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border */
  border: none;
  position: relative;
  overflow: hidden;

  /* Subtle glow effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 16px;
  }

  /* Hover effects */
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowXl};
    color: white;

    &::before {
      opacity: 1;
    }
  }

  /* Active state */
  &:active {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 16px 36px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 14px 32px;
  }
`;
