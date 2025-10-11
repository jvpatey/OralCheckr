import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Loading skeleton for stat cards
export const StatCardSkeleton = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadowMd};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.primary}20 50%,
      transparent 100%
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.5s infinite;
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`;

// Loading skeleton for main cards
export const CardSkeleton = styled.div`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 24px;
  padding: 32px;
  min-height: 300px;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadowLg};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.primary}15 50%,
      transparent 100%
    );
    background-size: 200px 100%;
    animation: ${shimmer} 1.5s infinite;
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

// Loading spinner component
export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid ${({ theme }) => theme.borderLight};
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.primary};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

// Loading overlay for the entire dashboard
export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.overlayBg};
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

export const LoadingContent = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
`;

export const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 1.125rem;
  font-weight: 500;
  animation: ${pulse} 2s ease-in-out infinite;
`;

// Quick action buttons for enhanced interactivity
export const QuickActionButton = styled.button`
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  padding: 12px 20px;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${({ theme }) => theme.shadowSm};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => theme.primary}20,
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.primary}60;
    box-shadow: ${({ theme }) => theme.shadowMd};
    color: ${({ theme }) => theme.primary};

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

// Notification toast for feedback
export const NotificationToast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.glassBg};
  backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  border: 1px solid ${({ theme }) => theme.borderLight};
  border-radius: 12px;
  padding: 16px 20px;
  color: ${({ theme }) => theme.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadowLg};
  z-index: 1000;
  transform: translateX(400px);
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &.visible {
    transform: translateX(0);
    opacity: 1;
  }

  &.success {
    border-left: 4px solid ${({ theme }) => theme.success};
  }

  &.error {
    border-left: 4px solid ${({ theme }) => theme.error};
  }

  &.warning {
    border-left: 4px solid ${({ theme }) => theme.warning};
  }

  @media (max-width: 768px) {
    right: 16px;
    left: 16px;
    transform: translateY(-100px);
    
    &.visible {
      transform: translateY(0);
    }
  }
`;
