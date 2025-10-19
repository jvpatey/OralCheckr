import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Smooth fade-in and slide animation
const fadeInSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Modern glassmorphism sidebar for 2025 - Enhanced transparency
export const SidebarContainer = styled.div`
  height: calc(100vh - 120px);
  width: 220px;
  position: fixed;
  top: 104px;
  left: 16px;

  /* Enhanced glassmorphism effect - more transparent */
  background: ${({ theme }) => theme.glassBg}99;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);

  /* Modern borders and shadows */
  border: 1px solid ${({ theme }) => theme.borderLight}80;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;

  /* Layout */
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px 16px;

  /* Animation */
  animation: ${fadeInSlide} 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  /* Z-index - below navbar */
  z-index: 900;

  /* Subtle gradient overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.primaryGradient};
    opacity: 0.02;
    border-radius: 20px;
    pointer-events: none;
  }

  @media (max-width: 800px) {
    width: 70px;
    padding: 20px 8px;
    align-items: center;
    left: 8px;
  }

  @media (max-height: 700px) {
    top: 96px;
    height: calc(100vh - 118px);
  }
`;

// Modern sidebar link with smooth interactions
export const SidebarLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;

  /* Typography */
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  color: ${({ theme }) => theme.textSecondary};

  /* Spacing */
  padding: 14px 16px;
  border-radius: 12px;

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* Default state */
  background: transparent;

  /* Hover state - modern glass effect */
  &:hover {
    color: ${({ theme }) => theme.primary};
    background: ${({ theme }) => theme.surfaceElevated};
    transform: translateX(4px);
    box-shadow: ${({ theme }) => theme.shadowSm};
  }

  /* Active state - gradient highlight */
  &.active {
    color: ${({ theme }) => theme.primary};
    font-weight: 600;
    background: ${({ theme }) => theme.surfaceElevated};
    box-shadow: ${({ theme }) => theme.shadowMd};

    /* Gradient accent bar */
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 60%;
      background: ${({ theme }) => theme.primaryGradient};
      border-radius: 0 4px 4px 0;
      box-shadow: 0 0 12px ${({ theme }) => theme.glowColor};
    }
  }

  @media (max-width: 800px) {
    justify-content: center;
    padding: 12px;
    font-size: 18px;

    /* Tooltip for mobile */
    &::after {
      content: attr(data-tooltip);
      position: absolute;
      left: calc(100% + 12px);
      top: 50%;
      transform: translateY(-50%);

      /* Glassmorphic tooltip */
      background: ${({ theme }) => theme.glassBg};
      backdrop-filter: blur(${({ theme }) => theme.glassBlur});
      -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});

      color: ${({ theme }) => theme.textPrimary};
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid ${({ theme }) => theme.borderLight};
      box-shadow: ${({ theme }) => theme.shadowMd};

      white-space: nowrap;
      font-size: 13px;
      font-weight: 500;

      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 1000;
    }

    &:hover::after {
      opacity: 1;
    }

    &.active::before {
      left: 50%;
      transform: translate(-50%, -50%);
      width: 60%;
      height: 4px;
      top: 0;
      border-radius: 0 0 4px 4px;
    }
  }
`;

// Link content wrapper - no longer needs underline effect
export const LinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

// Icon with modern styling
export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  width: 20px;
  transition: transform 0.3s ease;

  ${SidebarLink}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 800px) {
    font-size: 20px;
    width: 24px;
  }
`;

// Text with smooth transitions
export const Text = styled.span`
  display: flex;
  align-items: center;
  white-space: nowrap;

  @media (max-width: 800px) {
    display: none;
  }
`;
