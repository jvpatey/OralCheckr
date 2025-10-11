import styled, { keyframes } from "styled-components";
import { Card } from "react-bootstrap";

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const WelcomeCard = styled(Card)`
  width: 80vw;
  max-width: 800px;

  /* Glassmorphism Effect */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Subtle border for glass effect */
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;

  /* Enhanced shadow for depth */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
    0 0 0 1px ${({ theme }) => theme.borderLight} inset,
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  padding: 20px;
  animation: ${fadeUp} 1s ease-out;
  height: auto;
  margin: 0 auto 0 auto;

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Hover effect for interactivity */
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 40px ${({ theme }) => theme.glowColor},
      0 0 0 1px ${({ theme }) => theme.borderMedium} inset;
  }

  @media (min-width: 1200px) {
    max-width: 900px;
    padding: 28px;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 80vw;
    max-width: 750px;
    padding: 24px;
  }

  @media (max-width: 768px) {
    width: 85vw;
    max-width: 700px;
    padding: 20px;
    border-radius: 20px;
    margin: 0 auto 40px auto;
  }

  @media (max-width: 480px) {
    width: 90vw;
    padding: 18px;
    border-radius: 18px;
    margin: 0 auto 30px auto;
  }

  @media (max-width: 375px) {
    width: 90vw;
    padding: 16px;
    margin: 0 auto 25px auto;
  }
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: calc(100vh - 40px);
  padding: 20px 0 60px 0;
  box-sizing: border-box;
  width: 100%;
  position: relative;

  @media (max-width: 768px) {
    min-height: calc(100vh - 30px);
    padding: 15px 0 50px 0;
  }

  @media (max-width: 480px) {
    min-height: calc(100vh - 20px);
    padding: 10px 0 40px 0;
  }
`;

// New hero hierarchy components
export const HeroTitle = styled.h1`
  text-align: center;
  margin-bottom: 12px;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  line-height: 1.1;

  /* Beautiful gradient text effect */
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.primary} 0%,
    ${({ theme }) => theme.secondary} 50%,
    ${({ theme }) => theme.accent} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  /* Subtle glow effect */
  filter: drop-shadow(0 4px 8px rgba(6, 182, 212, 0.3));

  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 2.75rem;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    font-size: 2.25rem;
  }
`;

export const HeroSubtitle = styled.h2`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin-bottom: 16px;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.5px;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

export const HeroDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  margin: 0 auto 20px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 14px;
  }
`;

export const SubText = styled.h2`
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 12px;
  text-align: center;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  margin-left: 20px;
  margin-right: 20px;
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

export const LogoStyle = styled.div`
  text-align: center;
  position: relative;
  display: inline-flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
  width: 100%;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 5px;

  &:hover {
    transform: translateY(-3px);
  }
`;

export const LogoImgStyle = styled.img`
  height: 55px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  filter: drop-shadow(0 4px 8px ${({ theme }) => theme.primary}20);

  ${LogoStyle}:hover & {
    transform: scale(1.05) rotate(-2deg);
    filter: drop-shadow(0 8px 16px ${({ theme }) => theme.primary}30);
  }

  @media (max-width: 480px) {
    height: 45px;
  }
`;

export const LogoText = styled.span`
  font-size: 2.5rem;
  font-weight: 600;

  /* Gradient text effect */
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  display: inline-block;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 8px;
  letter-spacing: -0.3px;

  ${LogoStyle}:hover & {
    filter: brightness(1.1);
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

export const ColoredText = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

export const LoginSection = styled.div`
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.borderLight};
  text-align: center;
`;

export const LoginTitle = styled.h4`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: -0.25px;
`;

export const LoginSubtitle = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  margin-bottom: 20px;
  line-height: 1.4;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;
