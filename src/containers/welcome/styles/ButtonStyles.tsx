import styled from "styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "guest"
  | "login"
  | "signup";

interface BaseButtonProps {
  $variant?: ButtonVariant;
}

export const BaseButton = styled.button<BaseButtonProps>`
  /* Modern glassmorphism button styling */
  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case "primary":
      case "signup":
        return theme.primaryGradient;
      case "login":
        return theme.secondaryGradient;
      case "guest":
        return theme.glassBg;
      default:
        return theme.primaryGradient;
    }
  }};

  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "guest":
        return theme.textPrimary;
      default:
        return "white";
    }
  }};
  border: 1px solid
    ${({ theme, $variant }) => {
      switch ($variant) {
        case "primary":
        case "signup":
          return theme.primary;
        case "login":
          return theme.secondary;
        case "guest":
          return theme.borderMedium;
        default:
          return theme.primary;
      }
    }};

  /* Modern sizing and spacing */
  margin: 0;
  border-radius: 16px;
  padding: 14px 16px;

  /* Full width in horizontal layout */
  flex: 1;
  min-width: 0;
  cursor: pointer;
  display: block;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.25px;

  /* Enhanced shadows and effects */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;

  /* Smooth transitions */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Glassmorphism for guest button */
  ${({ $variant }) =>
    $variant === "guest" &&
    `
    backdrop-filter: blur(${({ theme }) => theme.glassBlur});
    -webkit-backdrop-filter: blur(${({ theme }) => theme.glassBlur});
  `}

  /* Subtle shine effect */
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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.6s ease;
  }

  &:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.2) inset;

    /* Guest button special hover */
    ${({ $variant }) =>
      $variant === "guest" &&
      `
      background: ${({ theme }) => theme.surfaceElevated};
      color: ${({ theme }) => theme.textPrimary};
      border-color: ${({ theme }) => theme.primary};
    `}

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0) scale(1.01);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:disabled:hover {
    transform: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 16px 24px;
    font-size: 0.95rem;
    border-radius: 14px;
    flex: none;
    width: 100%;
  }

  @media (max-width: 480px) {
    padding: 14px 20px;
    font-size: 0.9rem;
    border-radius: 12px;
  }
`;
