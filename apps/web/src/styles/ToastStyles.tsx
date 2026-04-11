import styled, { createGlobalStyle } from "styled-components";

// Global toast styles for react-toastify
export const GlobalToastStyles = createGlobalStyle`
  /* Toast container positioning and spacing */
  .Toastify__toast-container {
    padding: 16px;
    z-index: 9999;
  }

  /* Main toast styling - minimal overrides */
  .Toastify__toast {
    margin-bottom: 12px !important;
    font-family: inherit !important;
  }

  /* Modern toast wrapper */
  .modern-toast {
    background: ${({ theme }) => theme.glassBg} !important;
    backdrop-filter: blur(${({ theme }) => theme.glassBlur}) !important;
    -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur}) !important;
    border: 1px solid ${({ theme }) => theme.borderLight} !important;
    border-radius: 16px !important;
    padding: 16px 48px 16px 20px !important;
    box-shadow: ${({ theme }) => theme.shadowXl} !important;
    min-width: 320px !important;
    max-width: 420px !important;
    position: relative !important;
  }

  /* Toast body styling */
  .Toastify__toast-body {
    padding: 0 !important;
    margin: 0 !important;
    color: ${({ theme }) => theme.textPrimary} !important;
    font-size: 0.9rem !important;
    font-weight: 500 !important;
    line-height: 1.4 !important;
    margin-right: 8px !important;
  }

  /* Success toast variant */
  .Toastify__toast--success.modern-toast {
    border-left: 4px solid ${({ theme }) => theme.success} !important;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${({ theme }) =>
        theme.success}10, transparent);
      pointer-events: none;
    }
  }

  /* Error toast variant */
  .Toastify__toast--error.modern-toast {
    border-left: 4px solid ${({ theme }) => theme.error} !important;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${({ theme }) =>
        theme.error}10, transparent);
      pointer-events: none;
    }
  }

  /* Warning toast variant */
  .Toastify__toast--warning.modern-toast {
    border-left: 4px solid ${({ theme }) => theme.warning} !important;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${({ theme }) =>
        theme.warning}10, transparent);
      pointer-events: none;
    }
  }

  /* Info toast variant */
  .Toastify__toast--info.modern-toast {
    border-left: 4px solid ${({ theme }) => theme.primary} !important;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, ${({ theme }) =>
        theme.primary}10, transparent);
      pointer-events: none;
    }
  }

  /* Progress bar styling */
  .Toastify__progress-bar {
    background: ${({ theme }) => theme.primaryGradient} !important;
    height: 3px !important;
    border-radius: 0 0 16px 16px !important;
    opacity: 0.9 !important;
    z-index: 1 !important;
  }

  /* Progress bar background */
  .Toastify__progress-bar--bg {
    background: ${({ theme }) => theme.borderLight} !important;
    opacity: 0.3 !important;
  }

  /* Progress bar container */
  .Toastify__progress-bar-container {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 3px !important;
    border-radius: 0 0 16px 16px !important;
    overflow: hidden !important;
  }

  /* Close button styling */
  .Toastify__close-button {
    color: ${({ theme }) => theme.textTertiary} !important;
    opacity: 0.8 !important;
    font-size: 1.2rem !important;
    font-weight: 700 !important;
    padding: 6px !important;
    border-radius: 8px !important;
    transition: all 0.2s ease !important;
    position: absolute !important;
    top: 12px !important;
    right: 12px !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(0, 0, 0, 0.1) !important;
    border: none !important;
    cursor: pointer !important;
    line-height: 1 !important;
    z-index: 999 !important;
    pointer-events: auto !important;
    text-decoration: none !important;

    &:hover {
      opacity: 1 !important;
      background: rgba(0, 0, 0, 0.2) !important;
      color: ${({ theme }) => theme.textPrimary} !important;
      transform: scale(1.1) !important;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.primary}40 !important;
      outline-offset: 2px !important;
    }

    &:active {
      transform: scale(0.95) !important;
    }

    &::before {
      content: "×" !important;
      font-size: 1.1rem !important;
      line-height: 1 !important;
    }
  }

  /* Hover effects */
  .modern-toast:hover {
    transform: translateY(-2px) !important;
    box-shadow: ${({ theme }) =>
      theme.shadowXl}, 0 8px 32px rgba(0, 0, 0, 0.12) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }

  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    .Toastify__toast-container {
      padding: 12px !important;
    }

    .modern-toast {
      min-width: 280px !important;
      max-width: calc(100vw - 24px) !important;
      padding: 14px 16px !important;
      border-radius: 14px !important;
    }

    .Toastify__close-button {
      top: 10px !important;
      right: 10px !important;
      width: 20px !important;
      height: 20px !important;
      font-size: 1rem !important;
    }
  }

  @media (max-width: 480px) {
    .modern-toast {
      min-width: 260px !important;
      padding: 12px 14px !important;
      border-radius: 12px !important;
    }

    .Toastify__toast-body {
      font-size: 0.85rem !important;
    }
  }

  /* Animation keyframes */
  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOutRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  /* Exit animation */
  .Toastify__toast--exiting {
    animation: slideOutRight 0.3s ease-in forwards !important;
  }
`;

// Custom toast content wrapper for icons and styling
export const ToastContentWrapper = styled.div<{
  $type: "success" | "error" | "warning" | "info";
}>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  position: relative;
  z-index: 1;
  padding-right: 16px;
  box-sizing: border-box;

  .toast-icon {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    color: ${({ $type, theme }) => {
      switch ($type) {
        case "success":
          return theme.success;
        case "error":
          return theme.error;
        case "warning":
          return theme.warning;
        case "info":
          return theme.primary;
        default:
          return theme.primary;
      }
    }};
  }

  .toast-content {
    flex: 1;
    min-width: 0;

    .toast-title {
      font-weight: 600;
      font-size: 0.9rem;
      color: ${({ theme }) => theme.textPrimary};
      margin: 0 0 4px 0;
      line-height: 1.3;
    }

    .toast-message {
      font-weight: 500;
      font-size: 0.85rem;
      color: ${({ theme }) => theme.textSecondary};
      margin: 0;
      line-height: 1.4;
    }
  }
`;

// Close button component
export const ToastCloseButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textTertiary};
  opacity: 0.7;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 4px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.textTertiary}20;
    color: ${({ theme }) => theme.textPrimary};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary}40;
    outline-offset: 2px;
  }
`;
