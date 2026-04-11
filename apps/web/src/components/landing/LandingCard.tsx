import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
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

// Define styled components first
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary};
  margin-bottom: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.75rem;
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }
`;

const CardIconContainer = styled.div`
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

const CardIcon = styled(FontAwesomeIcon)`
  position: relative;
  z-index: 1;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textTertiary};
  line-height: 1.6;
  margin: 0;
  max-width: 300px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    font-size: 0.95rem;
    max-width: 280px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    max-width: 100%;
  }
`;

// Now define the ModernCard that references the above components
const ModernCard = styled(Link)`
  display: block;
  width: 100%;
  min-height: 300px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;
  padding: 32px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeUp} 1s ease-out both;
  box-shadow: ${({ theme }) => theme.shadowLg};

  /* Gradient overlay for depth */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  /* Subtle background pattern */
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 20%,
      ${({ theme }) => theme.primary}08 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.primary}60;
    box-shadow: ${({ theme }) => theme.shadowXl};

    &::before {
      opacity: 1;
    }

    &::after {
      opacity: 1;
    }

    ${CardIconContainer} {
      transform: scale(1.05);
      box-shadow: ${({ theme }) => theme.shadowXl},
        0 0 15px ${({ theme }) => theme.primary + "30"},
        0 0 0 1px rgba(255, 255, 255, 0.2) inset;
    }

    ${CardTitle} {
      color: ${({ theme }) => theme.primary};
    }

    ${CardText} {
      color: ${({ theme }) => theme.textSecondary};
    }
  }

  @media (max-width: 768px) {
    min-height: 280px;
    padding: 28px 24px;
  }

  @media (max-width: 480px) {
    min-height: 260px;
    padding: 24px 20px;
  }
`;

// Optional feature badge for cards
const FeatureBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: ${({ theme }) => theme.accentGradient};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: ${({ theme }) => theme.shadowSm};
  opacity: 0;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${ModernCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 4px 8px;
    top: 12px;
    right: 12px;
  }
`;

type DashboardCardProps = {
  title: string;
  description: string;
  buttonLink: string;
  icon: any;
  badge?: string; // Optional badge text
};

// Modern functional component for Landing card buttons
export function LandingCard({
  title,
  description,
  buttonLink,
  icon,
  badge,
}: DashboardCardProps) {
  return (
    <ModernCard to={buttonLink}>
      {badge && <FeatureBadge>{badge}</FeatureBadge>}
      <CardContent>
        <CardIconContainer>
          <CardIcon icon={icon} />
        </CardIconContainer>
        <CardTitle>{title}</CardTitle>
        <CardText>{description}</CardText>
      </CardContent>
    </ModernCard>
  );
}
