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

// Modern container that replaces the single card
export const ModernWelcomeContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px 0 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 50px 16px 0 16px;
  }

  @media (max-width: 480px) {
    padding: 45px 12px 0 12px;
  }
`;

// Hero section with modern typography and spacing
export const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 85vh;
  text-align: center;
  padding: 100px 0 140px 0;
  position: relative;
  scroll-margin-top: 80px; /* Offset for fixed navbar */

  @media (max-width: 768px) {
    min-height: 60vh;
    padding: 60px 0 80px 0;
  }

  @media (max-width: 480px) {
    min-height: 50vh;
    padding: 40px 0 60px 0;
  }
`;

// Feature section with better spacing
export const FeatureSection = styled.section`
  padding: 140px 0;
  width: 100%;
  position: relative;
  scroll-margin-top: 80px; /* Offset for fixed navbar */

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0;
  }
`;

// CTA section with modern styling
export const CTASection = styled.section`
  padding: 120px 0 80px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    padding: 80px 0 60px 0;
  }

  @media (max-width: 480px) {
    padding: 60px 0 40px 0;
  }
`;

// Modern hero typography with enhanced visual impact
export const HeroTitle = styled.h1`
  text-align: center;
  margin-bottom: 24px;
  font-size: 4.5rem;
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 0.95;
  animation: ${fadeUp} 1s ease-out 0.2s both;

  /* Enhanced gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 35%,
    ${({ theme }) => theme.accent} 70%,
    ${({ theme }) => theme.primary} 100%
  );
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${fadeUp} 1s ease-out 0.2s both,
    gradientShift 3s ease-in-out infinite;

  /* Enhanced glow effect */
  filter: drop-shadow(0 8px 16px rgba(6, 182, 212, 0.4));

  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: 3.5rem;
    margin-bottom: 20px;
    letter-spacing: -1.5px;
  }

  @media (max-width: 480px) {
    font-size: 2.75rem;
    letter-spacing: -1px;
  }
`;

export const HeroSubtitle = styled.h2`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-bottom: 32px;
  font-size: 1.75rem;
  font-weight: 600;
  letter-spacing: -0.75px;
  opacity: 0.9;
  animation: ${fadeUp} 1s ease-out 0.4s both;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 24px;
    letter-spacing: -0.5px;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 20px;
  }
`;

export const HeroDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin: 0 auto 40px;
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.6;
  max-width: 700px;
  opacity: 0.8;
  animation: ${fadeUp} 1s ease-out 0.6s both;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 32px;
    max-width: 600px;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
    max-width: 100%;
  }
`;

// Modern logo styling with enhanced effects
export const LogoStyle = styled.div`
  text-align: center;
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  width: 100%;
  justify-content: center;
  margin-bottom: 32px;
  animation: ${fadeUp} 1s ease-out 0.1s both;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const LogoImgStyle = styled.img`
  height: 65px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 6px 12px ${({ theme }) => theme.primary}30);

  ${LogoStyle}:hover & {
    transform: scale(1.05) rotate(-2deg);
    filter: drop-shadow(0 12px 24px ${({ theme }) => theme.primary}40);
  }

  @media (max-width: 768px) {
    height: 55px;
  }

  @media (max-width: 480px) {
    height: 45px;
  }
`;

export const LogoText = styled.span`
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: -1px;

  /* Enhanced gradient text effect */
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  display: inline-block;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 12px;

  ${LogoStyle}:hover & {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
    margin-left: 10px;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
    margin-left: 8px;
  }
`;

// Modern CTA section styling
export const CTASectionTitle = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
  animation: ${fadeUp} 1s ease-out 0.8s both;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

export const CTASectionSubtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 48px;
  line-height: 1.5;
  max-width: 600px;
  opacity: 0.8;
  animation: ${fadeUp} 1s ease-out 1s both;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 32px;
  }
`;

// Hero section buttons - more prominent and modern
export const HeroButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  animation: ${fadeUp} 1s ease-out 0.8s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
  }

  @media (max-width: 480px) {
    gap: 14px;
    max-width: 100%;
  }
`;

export const HeroButtonsSubtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.125rem;
  text-align: center;
  margin-bottom: 32px;
  line-height: 1.5;
  max-width: 500px;
  opacity: 0.9;
  animation: ${fadeUp} 1s ease-out 0.7s both;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 28px;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
`;

// Legacy button container for backward compatibility
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  max-width: 600px;
  animation: ${fadeUp} 1s ease-out 1.2s both;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 16px;
  }
`;

// Legacy components for backward compatibility (can be removed later)
export const ColoredText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

export const SubText = styled.h2`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 12px;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 20px;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-top: 10px;
    margin-bottom: 18px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

export const CardText = styled.p`
  color: ${({ theme }) => theme.textTertiary};
  margin-bottom: 10px;
  margin-right: 30px;
  margin-left: 30px;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 400;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-right: 20px;
    margin-left: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 8px;
  }
`;
