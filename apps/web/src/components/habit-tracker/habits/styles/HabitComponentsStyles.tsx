import styled, { css, keyframes } from "styled-components";
import { scrollbarStyle } from "../../../../styles/SharedStyles";
import {
  HeroEyebrow as WelcomeHeroEyebrow,
  HeroTitle,
} from "../../../../containers/welcome/styles/WelcomeStyles";

// Animation for fading up elements
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
    top: 15%;
    right: 10%;
    width: 250px;
    height: 250px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.secondary}20,
      ${({ theme }) => theme.primary}20
    );
    border-radius: 50%;
    filter: blur(60px);
    animation: ${float} 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 15%;
    left: 10%;
    width: 200px;
    height: 200px;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.accent}20,
      ${({ theme }) => theme.secondary}20
    );
    border-radius: 50%;
    filter: blur(40px);
    animation: ${pulse} 4s ease-in-out infinite;
  }
`;

// Glass card shell — matches SidebarContainer (SidebarStyles) border / bg / shadow
export const CardContainer = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  flex: 1;
  min-height: 0;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px;
  border: 1px solid ${({ theme }) => theme.borderLight}60;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(255, 255, 255, 0.03) inset;
  padding: 2rem 3rem 3rem;
  animation: ${fadeUp} 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  z-index: 1;
  will-change: transform, opacity;
  transform-origin: top center;
  backface-visibility: hidden;

  @media (max-width: 800px) {
    padding: 1.5rem 2rem 2rem;
    border-radius: 24px;
  }

  @media (max-width: 480px) {
    padding: 1.25rem 1.5rem 1.5rem;
  }
`;

// Main habit area — same top + height as SidebarContainer (see SidebarStyles)
export const HabitListContainer = styled.div`
  /* Sidebar: 220px + 16px margin; main column starts past it */
  width: calc(100% - 252px);
  height: calc(100vh - 120px);
  position: fixed;
  top: 104px;
  left: 236px;
  padding: 0 1.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  will-change: transform;
  backface-visibility: hidden;
  animation: ${fadeUp} 1s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;

  @media (max-width: 1199px) {
    width: 100%;
    left: 0;
    padding: 0 1.25rem;
  }

  @media (max-height: 700px) {
    top: 96px;
    height: calc(100vh - 118px);
  }

  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

// Wrapper for habit content
export const HabitWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  position: relative;
  z-index: 1;
  will-change: transform;
  backface-visibility: hidden;
`;

/** Track — same component family as Assess / Improve, tuned for the habit toolbar */
export const HabitHeroEyebrow = styled(WelcomeHeroEyebrow)`
  margin: 0 0 6px;

  @media (max-width: 480px) {
    margin-bottom: 4px;
    font-size: 0.75rem;
  }
`;

/** Title stack (left column above the divider) */
export const HeaderTitleColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
  flex: 1 1 200px;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 500;
  line-height: 1.35;
  max-width: 100%;
`;

// Header: main row (title + actions) above full-width gradient rule
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  /* Match padding below content to margin below rule so space above/below the divider feels even */
  --habit-header-divider-gap: 14px;
  margin-bottom: var(--habit-header-divider-gap);
  position: relative;
  z-index: 1;
  padding-top: 0;
  padding-bottom: var(--habit-header-divider-gap);
  animation: ${fadeUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.3;
    border-radius: 1px;
  }
`;

/** Title + actions on one row; actions align to bottom of title stack (flush above the rule) */
export const HeaderMainRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px 16px;
  width: 100%;
  min-width: 0;
`;

/** Toolbar — right, baseline with subtitle/date (above full-width rule) */
export const HeaderActionsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  flex-shrink: 0;
  padding: 0;
  margin: 0;
  min-width: 0;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const habitHeaderBtnBase = css`
  font-family: var(--font-sans), system-ui, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 9999px;
  min-height: 40px;
  padding: 0 18px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (prefers-reduced-motion: reduce) {
    transition:
      background 0.25s ease,
      color 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  @media (max-width: 768px) {
    min-height: 38px;
    padding: 0 16px;
    font-size: 0.8125rem;
  }

  @media (max-width: 480px) {
    min-height: 36px;
    padding: 0 14px;
  }
`;

/** Sign-up style — primary gradient fill */
export const HabitHeaderButtonPrimary = styled.button`
  ${habitHeaderBtnBase}
  border: 1px solid ${({ theme }) => theme.primary};
  background: ${({ theme }) => theme.primaryGradient};
  color: #ffffff;
  box-shadow:
    0 2px 10px rgba(0, 0, 0, 0.12),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.primary};
    box-shadow:
      0 6px 20px rgba(0, 0, 0, 0.16),
      0 0 0 1px rgba(255, 255, 255, 0.12) inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }
`;

/** Login style — outline pill */
export const HabitHeaderButtonOutline = styled.button`
  ${habitHeaderBtnBase}
  background: transparent;
  color: ${({ theme }) => theme.textPrimary};
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  box-shadow: none;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => `${theme.primary}22`} inset;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }
`;

/** Destructive outline — Delete all */
export const HabitHeaderButtonDangerOutline = styled.button`
  ${habitHeaderBtnBase}
  background: transparent;
  color: ${({ theme }) => theme.textSecondary};
  border: 1px solid ${({ theme }) => `${theme.error}45`};
  box-shadow: none;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => `${theme.error}70`};
    background: ${({ theme }) => `${theme.error}12`};
    color: ${({ theme }) => theme.error};
  }

  &:focus-visible {
    outline-color: ${({ theme }) => theme.error};
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0) scale(0.99);
    }
  }
`;

export const HabitHeaderButtonIcon = styled.span`
  display: inline-flex;
  font-size: 0.875rem;
  opacity: 0.95;

  @media (max-width: 768px) {
    font-size: 0.8125rem;
  }
`;

// Page title — same scale as QuestionnairePageTitle (HeroTitle)
export const HeaderText = styled(HeroTitle).attrs({ as: "h2" })`
  margin: 0 0 8px;
  max-width: none;
  text-align: left;

  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

// Scrollable container for habits
export const ScrollableHabitList = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 4px 4px 16px;
  ${scrollbarStyle}
  will-change: transform;
  backface-visibility: hidden;
  animation: ${fadeUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
`;

// Styled container for the habit list
export const StyledHabitList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  width: 100%;
  box-sizing: border-box;
  animation: ${fadeUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.5s both;
  padding-right: 4px;
`;

// Row: flanking controls = week-selector arrow size, centered in narrow columns
export const HabitRow = styled.div`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 40px;
  column-gap: 10px;
  align-items: center;
  width: 100%;
  min-width: 0;

  & > *:first-child,
  & > *:last-child {
    justify-self: center;
  }

  @media (max-width: 768px) {
    grid-template-columns: 44px minmax(0, 1fr) 44px;
  }

  @media (max-width: 480px) {
    column-gap: 8px;
  }
`;

/** @deprecated — habit rows use grid columns; kept for any legacy imports */
export const HabitRowActions = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
`;

// Text for empty state with gradient
export const PlaceholderText = styled.div`
  font-size: 1.25rem;
  background: ${({ theme }) => theme.primaryGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 40px;
  text-align: center;
  font-weight: 500;
  opacity: 0.8;
`;

// Fluid wrapper for date picker (below page header)
export const DatePickerWrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-bottom: 14px;
  }

  @media (max-width: 480px) {
    margin-bottom: 12px;
  }
`;
