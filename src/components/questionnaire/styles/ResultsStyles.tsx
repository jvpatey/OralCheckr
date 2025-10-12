import styled, { keyframes } from "styled-components";
import { Card } from "react-bootstrap";
import { scrollbarStyle } from "../../../styles/SharedStyles";

export const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Modern results page styles
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

// Modern fluid results container with navbar spacing
export const ModernResultsContainer = styled.div<{
  $isAuthenticated: boolean;
}>`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
  width: ${({ $isAuthenticated }) =>
    $isAuthenticated ? "calc(100% - 240px)" : "100%"};
  margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "240px" : "0")};
  padding: 40px 20px;
  margin-top: 80px; /* Account for navbar height */

  /* Animation */
  animation: ${fadeInUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 800px) {
    width: ${({ $isAuthenticated }) =>
      $isAuthenticated ? "calc(100% - 86px)" : "100%"};
    margin-left: ${({ $isAuthenticated }) => ($isAuthenticated ? "86px" : "0")};
    padding: 24px 16px;
    min-height: calc(100vh - 100px);
    margin-top: 70px; /* Slightly less margin on mobile */
  }

  @media (max-height: 700px) {
    min-height: calc(100vh - 80px);
    padding: 20px;
    margin-top: 60px; /* Even less margin on shorter screens */
  }
`;

// Modern hero title with gradient
export const ResultsHeroTitle = styled.h1`
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

// Modern bento grid container with 3 cards
export const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 20px;
  }

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Modern bento card
export const BentoCard = styled.div`
  /* Glassmorphism effect */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Modern borders and shadows */
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadowLg};

  padding: 24px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadowXl};
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
    padding: 12px;
  }
`;

// Large bento card (for score) with dynamic background
export const LargeBentoCard = styled(BentoCard)<{ $scoreColor: string }>`
  grid-column: 1;
  grid-row: 1;
  background: ${({ $scoreColor }) => $scoreColor};
  border: none;
  color: white;
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
  }

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 1;
  }
`;

// Small bento card for completion date and retake button
export const SmallBentoCard = styled(BentoCard)`
  grid-column: 1;
  grid-row: 2;
  min-height: 160px;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 2;
  }

  @media (max-width: 768px) {
    min-height: 140px;
  }

  @media (max-width: 480px) {
    min-height: 120px;
  }
`;

// Regular bento card (for recommendations)
export const RegularBentoCard = styled(BentoCard)`
  grid-column: 2;
  grid-row: 1 / 3;

  @media (max-width: 1024px) {
    grid-column: 1;
    grid-row: 3;
  }
`;

// Modern card header
export const BentoCardHeader = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 16px 0;
  text-align: center;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
`;

// Modern card content
export const BentoCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Modern score display
export const ModernScoreDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

// Modern score number
export const ModernScoreNumber = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

// Modern score label
export const ModernScoreLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  opacity: 0.9;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

// Modern progress bar for score
export const ModernProgressBar = styled.div<{ $scoreColor: string }>`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  overflow: hidden;
  margin-top: 12px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--progress-width, 0%);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Modern action section
export const ModernActionSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: 32px;
  }
`;

// Modern gradient button for sign up
export const ModernSignUpButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Modern gradient background */
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;

  /* Typography */
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 14px 32px;
  border-radius: 16px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowLg};

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Border */
  border: none;
  position: relative;
  overflow: hidden;
  max-width: 400px;
  text-align: center;
  line-height: 1.4;

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

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 12px 24px;
    max-width: 90%;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 10px 20px;
  }
`;

// Modern retake button for the completion date card
export const ModernRetakeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  /* Modern gradient background */
  background: ${({ theme }) => theme.secondaryGradient};
  color: white;

  /* Typography */
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.01em;

  /* Spacing */
  padding: 10px 20px;
  border-radius: 10px;

  /* Modern shadow */
  box-shadow: ${({ theme }) => theme.shadowMd};

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
    border-radius: 10px;
  }

  /* Hover effects */
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
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

  /* Focus state for accessibility */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
`;

// Date display text
export const DateDisplayText = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-bottom: 12px;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export const ResultsCard = styled(Card)`
  width: 100%;
  max-width: 1200px;
  height: auto;
  max-height: calc(100vh - 120px);
  background-color: ${({ theme }) => theme.accentBackgroundColor};
  border: transparent;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow-y: auto;
  animation: ${fadeUp} 1s ease-out;
  ${scrollbarStyle}

  @media (max-width: 1024px) {
    max-width: 700px;
  }

  @media (max-width: 768px) {
    max-width: 600px;
    max-height: calc(100vh - 140px);
  }

  @media (max-width: 375px) {
    max-width: 90vw;
    max-height: calc(100vh - 100px);
  }
`;

export const ResultsCardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  width: calc(100% - 200px);
  margin-left: 200px;
  padding: 20px;
  margin-top: 70px;

  @media (max-width: 768px) {
    width: calc(100% - 50px);
    margin-left: 50px;
    padding: 10px;
  }

  @media (max-width: 375px) {
    padding: 5px;
    margin-top: 50px;
  }

  @media (max-height: 700px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

export const TilesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  padding: 20px;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 10px;
    gap: 15px;
  }
`;

export const TileWrapper = styled.div`
  width: 48%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  height: 400px;

  @media (max-width: 1024px) {
    width: 100%;
    height: 380px;
  }

  @media (max-width: 768px) {
    height: 350px;
  }

  @media (max-width: 375px) {
    height: 320px;
    min-height: 320px;
    max-height: 320px;
  }
`;

export const ConvertButton = styled.button`
  background-color: ${({ theme }) => theme.green};
  color: ${({ theme }) => theme.backgroundColor};
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  margin: 20px auto 0 auto;
  display: block;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.green};
    border-color: ${({ theme }) => theme.green};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 8px 16px;
    margin: 15px auto 0 auto;
    width: 90%;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
    padding: 6px 12px;
    margin: 10px auto 0 auto;
    width: 95%;
  }
`;
