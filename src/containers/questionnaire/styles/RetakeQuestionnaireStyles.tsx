import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap/Button";
import { keyframes } from "styled-components";

export const ModalButton = styled(Button)<ButtonProps>`
  &.btn-secondary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    color: ${({ theme }) => theme.textGrey};
    border: 1px solid ${({ theme }) => theme.textGrey};

    &:hover {
      background-color: ${({ theme }) => theme.textGrey};
      color: ${({ theme }) => theme.accentBackgroundColor};
      border-color: ${({ theme }) => theme.backgroundColor};
    }
  }

  &.btn-primary {
    background-color: ${({ theme }) => theme.accentBackgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};

    &:hover {
      background-color: ${({ theme }) => theme.blue};
      border-color: ${({ theme }) => theme.blue};
      color: ${({ theme }) => theme.accentBackgroundColor};
    }
  }
`;

export const MiniResultsCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  padding: 10px;
  margin: -10px 0 10px 0;
  width: 60%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const ScoreText = styled.div<{ $scoreColor: string }>`
  font-size: 1.2rem;
  color: ${(props) => props.$scoreColor};
  font-weight: bold;
  margin: 0;
`;

export const CompletedText = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.textGrey};
`;

export const DateText = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textGrey};
  margin: 0;
`;

// Modern retake questionnaire styles
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modern fluid container
export const ModernRetakeContainer = styled.div<{
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
  padding: 40px 20px;

  /* Animation */
  animation: ${fadeInUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
    padding: 24px 16px;
    min-height: calc(100vh - 100px);
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding: 20px;
  }
`;

// Modern hero title with gradient
export const HeroTitle = styled.h1`
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 40px;
  line-height: 1.2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 32px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-bottom: 24px;
  }
`;

// Modern description text
export const DescriptionText = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  line-height: 1.6;
  margin: 0 0 24px 0;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 0 20px 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 16px 0;
  }
`;

// Modern glassmorphic score card with dynamic background
export const ModernScoreCard = styled.div<{ $scoreColor: string }>`
  /* Dynamic background based on score */
  background: ${({ $scoreColor }) => $scoreColor};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Modern borders and shadows */
  border: none;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadowLg};

  padding: 24px 32px;
  margin: 32px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 400px;
  width: 100%;
  color: white;

  @media (max-width: 768px) {
    padding: 20px 24px;
    margin: 24px 0;
    gap: 12px;
  }
`;

// Modern score text
export const ModernScoreText = styled.div<{ $scoreColor: string }>`
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

// Modern completion text
export const ModernCompletionText = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Modern action section
export const ModernActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 24px;
  }
`;

// Modern gradient button
export const ModernGradientButton = styled.button`
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
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowXl};
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &::before {
      opacity: 0.3;
    }
  }

  /* Active state */
  &:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
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
