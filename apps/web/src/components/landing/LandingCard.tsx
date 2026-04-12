import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BentoTitle,
  BentoDescription,
} from "../../containers/welcome/styles/BentoGridStyles";

const DashboardCardTitle = styled(BentoTitle)`
  margin-bottom: 8px;
  font-size: 1.35rem;

  @media (max-width: 768px) {
    font-size: 1.0625rem;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const DashboardCardDescription = styled(BentoDescription)`
  font-size: 0.9375rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
    line-height: 1.42;
  }

  @media (max-width: 480px) {
    font-size: 0.8125rem;
  }
`;

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

// Icon tile — same language as BentoIcon (elevated surface, cyan glyph)
const CardIconTile = styled.div`
  width: 52px;
  height: 52px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 14px;
  color: ${({ theme }) => theme.primary};
  font-size: 1.35rem;
  transition:
    border-color 0.3s ease,
    background 0.3s ease,
    color 0.3s ease;

  svg {
    opacity: 0.92;
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.2rem;
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
    margin-bottom: 10px;
    border-radius: 12px;
  }
`;

const CardIcon = styled(FontAwesomeIcon)`
  color: inherit;
`;

// Solid bento-style surface + hover (see BentoCardContainer)
const ModernCard = styled(Link)`
  display: block;
  width: 100%;
  min-height: 228px;
  background: ${({ theme }) => theme.surfaceColor};
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 18px;
  padding: 22px 20px;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition:
    box-shadow 0.35s ease,
    border-color 0.35s ease,
    transform 0.35s ease;
  animation: ${fadeUp} 0.8s ease-out both;
  box-shadow:
    ${({ theme }) => theme.shadowLg},
    0 0 0 1px ${({ theme }) => theme.borderLight} inset;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}07 0%,
      transparent 52%
    );
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
    border-radius: 18px;
  }

  &:hover::before {
    opacity: 1;
  }

  &:nth-child(1) {
    animation-delay: 0.1s;
  }
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  &:nth-child(3) {
    animation-delay: 0.3s;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-2px);
      box-shadow:
        ${({ theme }) => theme.shadowXl},
        0 10px 36px rgba(0, 0, 0, 0.1),
        0 0 0 1px ${({ theme }) => theme.borderLight} inset;
      border-color: ${({ theme }) => `${theme.primary}30`};
    }

    &:hover ${CardIconTile} {
      border-color: ${({ theme }) => `${theme.primary}35`};
      background: ${({ theme }) => theme.surfaceColor};
      color: ${({ theme }) => theme.primaryDark};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }

  &:active {
    transform: translateY(-1px);
  }

  @media (max-width: 1024px) {
    padding: 18px 16px;
    min-height: 208px;
  }

  @media (max-width: 768px) {
    padding: 16px 14px;
    min-height: 196px;
  }

  @media (max-width: 480px) {
    padding: 14px 12px;
    min-height: 184px;
  }
`;

const FeatureBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 2;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.borderLight};
  color: ${({ theme }) => theme.primary};

  @media (max-width: 480px) {
    font-size: 0.625rem;
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
  badge?: string;
};

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
        <CardIconTile>
          <CardIcon icon={icon} />
        </CardIconTile>
        <DashboardCardTitle>{title}</DashboardCardTitle>
        <DashboardCardDescription>{description}</DashboardCardDescription>
      </CardContent>
    </ModernCard>
  );
}
