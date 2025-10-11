import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FeatureCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  max-width: 100%;
  margin: 20px auto 0;
  padding: 0;
  width: 100%;
  box-sizing: border-box;

  /* Staggered entrance animation */
  & > *:nth-child(1) {
    animation: fadeUp 0.6s ease-out 0.2s both;
  }

  & > *:nth-child(2) {
    animation: fadeUp 0.6s ease-out 0.4s both;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 16px;
  }

  @media (max-width: 480px) {
    gap: 14px;
    margin-top: 14px;
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FeatureCardContainer = styled.div`
  /* Glassmorphism Effect */
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

  /* Subtle border for glass effect */
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 20px;

  /* Enhanced shadow for depth */
  box-shadow: ${({ theme }) => theme.shadowMd};

  padding: 18px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Hover effect */
  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
      0 0 20px ${({ theme }) => theme.glowColor};
    border-color: ${({ theme }) => theme.primary};
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
  }

  /* Subtle gradient overlay on hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}05 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 768px) {
    padding: 14px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    border-radius: 14px;
  }
`;

export const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.primaryGradient};
  border-radius: 14px;
  color: white;
  font-size: 20px;
  box-shadow: ${({ theme }) => theme.shadowMd};
  transition: all 0.3s ease;

  ${FeatureCardContainer}:hover & {
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowLg};
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const FeatureTitle = styled.h3`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: -0.25px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

export const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

// Styled FontAwesome icon wrapper
export const StyledIcon = styled(FontAwesomeIcon)`
  color: white;
`;
