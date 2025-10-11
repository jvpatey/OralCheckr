import styled, { keyframes } from "styled-components";
import { Nav } from "react-bootstrap";
export { Nav };

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
  padding: 0;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  flex-shrink: 0;
`;

export const ProfileHeader = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;
  box-shadow: ${({ theme }) => theme.shadowXl},
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  padding: 2.5rem 3rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;

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
  gap: 1rem;
`;

export const ProfilePicture = styled.div<{ $hasAvatar?: boolean }>`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px
    ${({ $hasAvatar, theme }) =>
      $hasAvatar ? `solid ${theme.primary}` : `dashed ${theme.borderMedium}`};
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  padding: 1rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowLg};

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
    object-fit: contain;
    padding: 0.5rem;
  }

  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

export const UploadButton = styled.button`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.backgroundColor};
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.4s ease-out;
  white-space: nowrap;
  border: 2px solid ${({ theme }) => theme.blue};
  font-size: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
    border-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.blue};
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 0 15px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
    font-size: 12px;
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

export const ProfileEditButton = styled.button`
  position: absolute;
  top: -1.5rem;
  right: -2rem;
  background: ${({ theme }) => theme.primaryGradient};
  border: 1px solid ${({ theme }) => theme.primary};
  color: white;
  cursor: pointer;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowMd};
  z-index: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }

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
    font-size: 0.85rem;
    padding: 8px 12px;

    svg {
      font-size: 0.9rem;
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
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 0.5rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Value = styled.div<{ $isEditing?: boolean }>`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 1rem;
  padding: 0.875rem 1rem;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 12px;
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
  gap: 12px;
  height: 44px;
  justify-content: flex-end;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const EditButton = styled.button`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 10px;
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};

  &:hover {
    background: ${({ theme }) => theme.surfaceElevated};
    border-color: ${({ theme }) => theme.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowMd};
  }
`;

export const EditInput = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.textPrimary};
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}20;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary}30,
      ${({ theme }) => theme.shadowMd};
    background: ${({ theme }) => theme.surfaceElevated};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
    opacity: 0.6;
  }
`;

export const EditActionButton = styled.button<{ $isCancel?: boolean }>`
  padding: 0 1.5rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadowMd};
  position: relative;

  @media (max-width: 480px) {
    padding: 0 1rem;
    height: 36px;
    font-size: 0.85rem;
  }

  ${({ $isCancel, theme }) =>
    $isCancel
      ? `
    background: ${theme.glassBg};
    backdrop-filter: blur(${theme.glassBlur});
    color: ${theme.textSecondary};
    border: 1px solid ${theme.borderLight};

    &:hover {
      background: ${theme.surfaceElevated};
      color: ${theme.textPrimary};
      border-color: ${theme.borderMedium};
      transform: translateY(-2px);
      box-shadow: ${theme.shadowLg};
    }

    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: ${theme.primaryGradient};
    color: white;
    border: 1px solid ${theme.primary};

    &:hover {
      opacity: 0.9;
      transform: translateY(-2px);
      box-shadow: ${theme.shadowLg};
    }

    &:active {
      transform: translateY(0);
    }
  `}
`;

export const StyledNav = styled(Nav)`
  margin-bottom: 2rem;
  border-bottom: 2px solid ${({ theme }) => theme.borderLight};
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 8px;

  @media (max-width: 480px) {
    gap: 0;
    justify-content: stretch;

    .nav-item {
      flex: 1;
      text-align: center;
    }
  }

  .nav-link {
    color: ${({ theme }) => theme.textSecondary};
    padding: 1rem 1.75rem;
    white-space: nowrap;
    margin-bottom: -2px;
    border: none;
    border-bottom: 2px solid transparent;
    border-radius: 0;
    background: transparent;
    font-size: 1.25rem;
    font-weight: 700;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;

    &.active {
      color: ${({ theme }) => theme.primary};
      border-bottom-color: ${({ theme }) => theme.primary};
      background: transparent;

      &::after {
        content: "";
        position: absolute;
        bottom: -2px;
        left: 0;
        right: 0;
        height: 2px;
        background: ${({ theme }) => theme.primaryGradient};
        box-shadow: 0 0 8px ${({ theme }) => theme.primary}50;
      }
    }

    &:hover:not(.active) {
      color: ${({ theme }) => theme.textPrimary};
      background: ${({ theme }) => theme.glassBg};
      border-radius: 12px 12px 0 0;
    }

    @media (max-width: 480px) {
      padding: 0.875rem 0.5rem;
      font-size: 1rem;
      width: 100%;
      text-align: center;
    }
  }
`;

// Container for tabs section
export const TabsContainer = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;
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
    color: ${({ theme }) => theme.textPrimary};
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
    background: ${({ theme }) => theme.primaryGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }
  }
`;

export const EditInstructions = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.875rem;
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
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.borderLight};

  &.entering {
    max-height: 80px;
    opacity: 1;
    transform: translateY(0);
    margin-bottom: 1rem;
    padding: 1rem;
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
