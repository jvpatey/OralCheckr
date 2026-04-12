import styled, { keyframes } from "styled-components";
import { BaseButton } from "../../welcome/styles/ButtonStyles";
import { NavLinksContainer } from "../../navigation/styles/ModernNavBarStyles";

export { NavIndicator as ProfileTabIndicator, NavLink as ProfileTabButton } from "../../navigation/styles/ModernNavBarStyles";

export const ProfileTabBarShell = styled(NavLinksContainer)`
  width: 100%;
  margin-bottom: 2rem;
`;

// Modern 2025 animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

export const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 50px;
  }
`;

export const slideUp = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 50px;
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
    max-height: 0;
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

// Modern page container with background gradient
export const PageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: ${({ theme }) => theme.backgroundGradient};
  overflow-y: auto;
  padding: calc(80px + 2rem) 0;
  z-index: 800;

  /* Add bottom spacing by using a pseudo-element */
  &::after {
    content: "";
    display: block;
    height: 0.5rem;
    flex-shrink: 0;
  }

  /* Background floating elements */
  &::before {
    content: "";
    position: fixed;
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
    pointer-events: none;
  }

  &::after {
    content: "";
    position: fixed;
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
    pointer-events: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.primary}40;
    border-radius: 8px;
    transition: background 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.primary}60;
  }
`;

// Modern profile container - no card, just clean layout
export const ProfileCard = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  animation: ${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  box-sizing: border-box;
`;

/** Left-aligned hero — matches Track / Analyze page title stack */
export const ProfilePageHeader = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 1.75rem;
  max-width: 100%;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

/** Guest / loading / error copy inside ProfileHeader */
export const ProfileStateTitle = styled.h2`
  font-family: var(--font-sans), system-ui, sans-serif;
  margin: 0 0 12px;
  font-size: clamp(1.1rem, 1.2vw + 0.85rem, 1.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.textPrimary};
  line-height: 1.35;
`;

export const ProfileStateText = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  margin: 0 0 10px;
  font-size: clamp(0.95rem, 0.45vw + 0.82rem, 1.0625rem);
  line-height: 1.65;
  color: ${({ theme }) => theme.textSecondary};
  font-weight: 400;
  max-width: 36rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

/** Accent segment for `SectionTitle` in account/data tabs — matches `ModalHeadingAccent` */
export const SectionTitleAccent = styled.span`
  color: ${({ theme }) => theme.primary};
  -webkit-text-fill-color: ${({ theme }) => theme.primary};
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const ProfileHeader = styled.div<{ $singleColumn?: boolean }>`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 28px;
  box-shadow: ${({ theme }) => theme.shadowXl},
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  padding: 2.5rem 3rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: ${({ $singleColumn }) =>
    $singleColumn ? "1fr" : "auto 1fr"};
  gap: 2rem;

  ${({ $singleColumn }) =>
    $singleColumn &&
    `
    text-align: center;
    justify-items: center;
  `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
    padding: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-bottom: 1.25rem;
  }
`;

export const ProfilePictureSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const ProfilePicture = styled.div<{
  $hasAvatar?: boolean;
  $isEditing?: boolean;
}>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px
    ${({ $hasAvatar, $isEditing, theme }) =>
      $isEditing
        ? `solid ${theme.primary}`
        : $hasAvatar
          ? `solid ${theme.primary}`
          : `dashed ${theme.borderMedium}`};
  color: ${({ theme }) => theme.textSecondary};
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  padding: ${({ $hasAvatar }) => ($hasAvatar ? "0" : "1rem")};
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme, $isEditing }) =>
    $isEditing
      ? `${theme.shadowXl}, 0 0 0 4px ${theme.primary}28, 0 0 28px ${theme.primary}30`
      : theme.shadowLg};

  &:hover {
    border-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.secondary};
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadowXl},
      0 0 20px ${({ theme }) => theme.secondary}30;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

/** Sits below the circular avatar; same action as tapping the photo in edit mode. */
export const ProfilePictureEditHint = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border: none;
  cursor: pointer;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #ffffff;
  background: ${({ theme }) => `${theme.primary}e6`};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 9999px;
  white-space: nowrap;
  text-align: center;
  line-height: 1.2;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition:
    filter 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    filter: brightness(1.08);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

export const UploadButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: ${({ theme }) => theme.primaryGradient};
  color: #ffffff;
  width: auto;
  min-height: 40px;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  padding: 0 22px;
  cursor: pointer;
  transition:
    box-shadow 0.25s ease,
    filter 0.25s ease,
    opacity 0.25s ease;
  white-space: nowrap;
  border: 1px solid ${({ theme }) => theme.primary};
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  box-shadow: ${({ theme }) => theme.shadowMd};

  &:hover {
    filter: brightness(1.05);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    padding: 0 18px;
    font-size: 0.875rem;
  }

  @media (max-width: 480px) {
    padding: 0 14px;
    font-size: 0.8125rem;
  }
`;

export const ProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-content: start;
  position: relative;

  * {
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .email-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

/** Icon-only control — same outline pill treatment as welcome Login (`BaseButton` login variant). */
export const ProfileEditButton = styled(BaseButton).attrs({
  type: "button",
  $variant: "login" as const,
})`
  position: absolute;
  top: -1.5rem;
  right: -2rem;
  z-index: 1;

  width: 44px;
  min-width: 44px;
  max-width: 44px;
  height: 44px;
  min-height: 44px;
  padding: 0;
  flex: none;
  flex-shrink: 0;

  svg {
    font-size: 1rem;
  }

  @media (max-width: 900px) {
    top: -1.25rem;
    right: -1rem;
  }

  @media (max-width: 480px) {
    top: -1rem;
    right: -0.5rem;
    width: 40px;
    min-width: 40px;
    max-width: 40px;
    height: 40px;
    min-height: 40px;

    svg {
      font-size: 0.9375rem;
    }
  }
`;

export const InfoGroup = styled.div`
  margin-bottom: 1rem;
  position: relative;
  transform-origin: top;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    margin 0.5s cubic-bezier(0.4, 0, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const Label = styled.div`
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;
`;

export const Value = styled.div<{ $isEditing?: boolean }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.45;
  min-height: 44px;
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: ${({ theme }) => theme.surfaceElevated};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.borderLight};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};

  ${({ $isEditing, theme }) =>
    $isEditing &&
    `
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px ${theme.primary}20;
    background: ${theme.surfaceElevated};
  `}
`;

export const EditActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  min-height: 46px;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const EditButton = styled.button`
  font-family: var(--font-sans), system-ui, sans-serif;
  background: transparent;
  border: 1px solid ${({ theme }) => `${theme.primary}45`};
  border-radius: 9999px;
  color: ${({ theme }) => theme.textPrimary};
  cursor: pointer;
  padding: 10px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  transition:
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => `${theme.primary}65`};
    background: ${({ theme }) => `${theme.primary}0d`};
    color: ${({ theme }) => theme.primary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }
`;

export const EditInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 10px 16px;
  min-height: 44px;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.45;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.surfaceElevated};
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 9999px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}22;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30;
    background: ${({ theme }) => theme.surfaceColor};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textTertiary};
    opacity: 1;
  }
`;

export const EditActionButton = styled.button<{ $isCancel?: boolean }>`
  font-family: var(--font-sans), system-ui, sans-serif;
  padding: 11px 22px;
  border-radius: 9999px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  cursor: pointer;
  transition:
    box-shadow 0.25s ease,
    filter 0.25s ease,
    opacity 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    color 0.25s ease;
  min-height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    min-height: 44px;
    font-size: 0.875rem;
  }

  ${({ $isCancel, theme }) =>
    $isCancel
      ? `
    background: transparent;
    color: ${theme.textPrimary};
    border: 1px solid ${`${theme.primary}45`};

    &:hover {
      border-color: ${`${theme.primary}65`};
      background: ${`${theme.primary}0d`};
      color: ${theme.primary};
    }
  `
      : `
    background: ${theme.primaryGradient};
    color: #ffffff;
    border: 1px solid ${theme.primary};

    &:hover:not(:disabled) {
      filter: brightness(1.05);
      box-shadow: ${theme.shadowLg};
    }

    &:active:not(:disabled) {
      filter: brightness(0.98);
    }
  `}
`;

// Clips horizontal motion when switching tab panels
export const ProfileTabPanelRegion = styled.div`
  overflow-x: hidden;
`;

// Container for tabs section
export const TabsContainer = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 28px;
  box-shadow: ${({ theme }) => theme.shadowXl},
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  padding: 2.5rem 3rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 4rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    margin-bottom: 3rem;
  }
`;

export const TabContent = styled.div`
  padding: 0;
  background: transparent;

  h3 {
    font-family: var(--font-sans), system-ui, sans-serif;
    color: ${({ theme }) => theme.textPrimary};
    font-size: clamp(1.15rem, 1.2vw + 0.9rem, 1.35rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.35;
    margin-bottom: 1.75rem;
    /* Do not set -webkit-text-fill-color here — it inherits into child spans and
       blocks dual-tone titles (SectionTitle + SectionTitleAccent). */
  }

  @media (max-width: 768px) {
    h3 {
      margin-bottom: 1.5rem;
    }
  }
`;

export const EditInstructions = styled.p`
  font-family: var(--font-sans), system-ui, sans-serif;
  color: ${({ theme }) => theme.textTertiary};
  font-size: 0.8125rem;
  line-height: 1.45;
  font-weight: 400;
  letter-spacing: 0.01em;
  grid-column: 1 / -1;
  text-align: left;
  margin: 0;
  padding: 0;
  max-height: 0;
  opacity: 0;
  transform: translateY(-20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  pointer-events: none;
  /* Muted “hint” — reads clearly below form fields, not like an input */
  background: color-mix(in srgb, ${({ theme }) => theme.borderLight} 22%, transparent);
  border-radius: 20px;
  border: 1px solid
    color-mix(in srgb, ${({ theme }) => theme.borderMedium} 35%, transparent);
  box-shadow: none;

  &.entering {
    max-height: 80px;
    opacity: 1;
    transform: translateY(0);
    margin-bottom: 1rem;
    padding: 0.75rem 0.9rem;
    pointer-events: auto;
  }

  &.exiting {
    max-height: 0;
    opacity: 0;
    transform: translateY(-20px);
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 0.8rem;

    &.entering {
      max-height: 100px;
      padding: 0.875rem;
    }
  }
`;
