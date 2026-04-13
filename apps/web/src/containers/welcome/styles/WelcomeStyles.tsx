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

// Background floating elements — softer, slower; motion only when allowed
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
    top: 12%;
    left: 8%;
    width: 220px;
    height: 220px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.primary}14,
      ${({ theme }) => theme.accent}12
    );
    border-radius: 50%;
    filter: blur(72px);
    opacity: 0.85;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 18%;
    right: 10%;
    width: 180px;
    height: 180px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary}12,
      ${({ theme }) => theme.primary}10
    );
    border-radius: 50%;
    filter: blur(56px);
    opacity: 0.8;
  }

  @media (prefers-reduced-motion: no-preference) {
    &::before {
      animation: ${float} 14s ease-in-out infinite;
    }

    &::after {
      animation: ${pulse} 12s ease-in-out infinite;
    }
  }

  @media print {
    display: none !important;
  }
`;

// Modern container — padding tuned for phone, iPad, desktop
export const ModernWelcomeContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 56px clamp(16px, 4vw, 32px) 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 481px) and (max-width: 1023px) {
    /* Tracks nav top offset (max(16px, safe-area)) + bar height without double-counting inset */
    --welcome-nav-offset: calc(72px + max(16px, env(safe-area-inset-top, 0px)));
    padding-top: var(--welcome-nav-offset);
  }

  @media (max-width: 480px) {
    --welcome-nav-offset: calc(72px + max(16px, env(safe-area-inset-top, 0px)));
    padding: var(--welcome-nav-offset) 12px 0;
  }
`;

// Hero section — grid layout lives inside
export const HeroSection = styled.section`
  display: block;
  width: 100%;
  padding: clamp(48px, 7vw, 96px) 0 clamp(64px, 9vw, 120px);
  position: relative;
  scroll-margin-top: 80px;

  /* Phones: compact padding; copy + preview use stacked “beats” below */
  @media (max-width: 767px) {
    --hero-mobile-pad-top: 40px;
    padding: var(--hero-mobile-pad-top) 0 64px;
  }

  /* iPad / tablet: two-column hero, centered in first viewport like desktop */
  @media (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 56px);
    min-height: calc(100dvh - 56px);
    padding: clamp(24px, 3.5vw, 44px) 0 clamp(40px, 5vw, 72px);
  }

  /* Desktop: center hero in first viewport under fixed nav (matches ModernWelcomeContainer padding-top) */
  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100vh - 56px);
    min-height: calc(100dvh - 56px);
    padding: clamp(28px, 4vw, 56px) 0 clamp(48px, 7vw, 88px);
  }
`;

export const HeroGrid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: clamp(32px, 5vw, 56px);
  width: 100%;

  @media (max-width: 767px) {
    gap: clamp(24px, 6vw, 40px);
    align-items: stretch;
  }

  /* iPad / tablet: side-by-side copy + preview */
  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: clamp(24px, 3vw, 40px);
    align-items: center;
  }

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.02fr);
    gap: clamp(40px, 4vw, 72px);
  }
`;

export const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  min-width: 0;

  @media (max-width: 767px) {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    /* One viewport: copy + CTAs only; then user scrolls to preview */
    min-height: calc(
      100vh - var(--welcome-nav-offset) - var(--hero-mobile-pad-top)
    );
    min-height: calc(
      100dvh - var(--welcome-nav-offset) - var(--hero-mobile-pad-top)
    );
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    align-items: flex-start;
    text-align: left;
  }

  @media (min-width: 1024px) {
    align-items: flex-start;
    text-align: left;
  }
`;

export const HeroPreviewColumn = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  justify-content: center;

  @media (max-width: 767px) {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    flex-direction: column;
    align-items: center;
    /* Second viewport beat: app preview, then scroll to features */
    min-height: calc(100vh - 48px);
    min-height: calc(100dvh - 48px);
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    align-items: stretch;
    justify-content: center;
  }

  @media (min-width: 1024px) {
    justify-content: flex-end;
  }
`;

export const HeroEyebrow = styled.p`
  margin: 0 0 16px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primary};
  opacity: 0.95;
  animation: ${fadeUp} 0.85s ease-out 0.05s both;

  @media (max-width: 480px) {
    margin-bottom: 12px;
    font-size: 0.75rem;
  }
`;

export const HeroTrustRow = styled.p`
  margin: 0 0 28px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.textTertiary};
  letter-spacing: 0.02em;
  line-height: 1.5;
  max-width: 36rem;
  animation: ${fadeUp} 0.85s ease-out 0.48s both;

  @media (min-width: 768px) {
    text-align: left;
  }

  @media (max-width: 480px) {
    margin-bottom: 22px;
    font-size: 0.875rem;
  }
`;

// Feature section with better spacing
export const FeatureSection = styled.section`
  padding: 140px 0;
  width: 100%;
  position: relative;
  scroll-margin-top: 80px; /* Offset for fixed navbar */

  @media (max-width: 1024px) and (min-width: 768px) {
    padding: 96px 0 104px;
  }

  @media (max-width: 767px) {
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

// Hero title — same family as UI, extra-bold for hierarchy (no second webfont)
export const HeroTitle = styled.h1`
  margin: 0 0 20px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: clamp(2.5rem, 5vw + 1rem, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: ${({ theme }) => theme.textPrimary};
  text-align: inherit;
  max-width: 16ch;
  animation: ${fadeUp} 0.9s ease-out 0.15s both;

  @media (min-width: 481px) and (max-width: 767px) {
    max-width: 20ch;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    max-width: 22ch;
    font-size: clamp(2.35rem, 3.2vw + 1.35rem, 3.25rem);
  }

  @media (max-width: 480px) {
    margin-bottom: 16px;
    max-width: none;
  }
`;

export const HeroTitleAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const HeroSubtitle = styled.h2`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 20px;
  font-size: clamp(1.2rem, 1.5vw + 0.85rem, 1.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
  text-align: inherit;
  max-width: 36rem;
  animation: ${fadeUp} 0.9s ease-out 0.28s both;

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

export const HeroDescription = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textSecondary};
  margin: 0 0 32px;
  font-size: clamp(1rem, 0.6vw + 0.9rem, 1.125rem);
  font-weight: 400;
  line-height: 1.65;
  max-width: 34rem;
  text-align: inherit;
  animation: ${fadeUp} 0.9s ease-out 0.4s both;

  @media (min-width: 1024px) {
    margin-bottom: 28px;
  }

  @media (max-width: 480px) {
    margin-bottom: 24px;
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

// Wordmark base — matches HeroTitle color/weight; pair with HeroTitleAccent for "Checkr"
export const LogoText = styled.span`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: ${({ theme }) => theme.textPrimary};

  display: inline-block;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 12px;

  ${LogoStyle}:hover & {
    filter: brightness(1.05);
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

// Hero CTAs — row on desktop/tablet landscape-friendly widths; stack on narrow phones
export const HeroButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 12px 14px;
  width: 100%;
  max-width: 420px;
  animation: ${fadeUp} 0.9s ease-out 0.6s both;

  @media (min-width: 768px) and (max-width: 1023px) {
    justify-content: flex-start;
    max-width: 100%;
  }

  @media (min-width: 1024px) {
    justify-content: flex-start;
    max-width: 440px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    max-width: 100%;
    gap: 12px;
  }
`;

export const HeroGuestHintRow = styled.div`
  margin-top: 18px;
  width: 100%;
  max-width: 440px;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.textSecondary};
  text-align: center;
  animation: ${fadeUp} 0.9s ease-out 0.68s both;

  @media (min-width: 768px) {
    text-align: left;
  }

  @media (max-width: 767px) {
    margin-bottom: 12px;
  }

  @media (max-width: 480px) {
    margin-top: 16px;
    font-size: 0.875rem;
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
