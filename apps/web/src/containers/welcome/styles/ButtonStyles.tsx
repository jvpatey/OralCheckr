import styled from "styled-components";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "guest"
  | "login"
  | "signup";

interface BaseButtonProps {
  $variant?: ButtonVariant;
}

export const BaseButton = styled.button<BaseButtonProps>`
  margin: 0;
  border-radius: 9999px;
  padding: 12px 22px;
  min-height: 44px;
  height: auto;
  width: 100%;
  flex: 1;
  min-width: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-sans), system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  position: relative;
  overflow: hidden;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  background: ${({ theme, $variant }) => {
    switch ($variant) {
      case "login":
      case "secondary":
        return "transparent";
      case "danger":
        return `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`;
      case "primary":
      case "signup":
        return theme.primaryGradient;
      case "guest":
        return theme.primaryGradient;
      default:
        return theme.primaryGradient;
    }
  }};

  color: ${({ theme, $variant }) => {
    switch ($variant) {
      case "login":
      case "secondary":
        return theme.textPrimary;
      default:
        return "#ffffff";
    }
  }};

  border: 1px solid
    ${({ theme, $variant }) => {
      switch ($variant) {
        case "login":
          return `${theme.primary}45`;
        case "secondary":
          return `${theme.primary}45`;
        case "danger":
          return theme.error;
        case "primary":
        case "signup":
          return theme.primary;
        case "guest":
          return theme.primary;
        default:
          return theme.primary;
      }
    }};

  box-shadow: ${({ $variant }) =>
    $variant === "login" || $variant === "secondary"
      ? "none"
      : `0 2px 10px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.08) inset`};

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
      rgba(255, 255, 255, 0.22),
      transparent
    );
    transition: left 0.55s ease;
  }

  &:hover {
    box-shadow: ${({ theme, $variant }) => {
      if ($variant === "login")
        return `0 0 0 1px ${theme.primary}55 inset`;
      if ($variant === "secondary")
        return `0 0 0 1px ${theme.primary}35 inset`;
      return `0 6px 20px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(255, 255, 255, 0.12) inset`;
    }};
    border-color: ${({ theme, $variant }) => {
      if ($variant === "login") return `${theme.primary}70`;
      if ($variant === "secondary") return theme.primary;
      if ($variant === "danger") return theme.error;
      return theme.primary;
    }};
    background: ${({ theme, $variant }) => {
      if ($variant === "login") return `${theme.primary}10`;
      if ($variant === "secondary") return `${theme.primary}12`;
      if ($variant === "danger")
        return `linear-gradient(135deg, ${theme.errorLight} 0%, ${theme.error} 100%)`;
      return theme.primaryGradient;
    }};
  }

  &:hover::before {
    left: ${({ $variant }) =>
      $variant === "login" || $variant === "secondary" ? "-100%" : "100%"};
  }

  &:focus-visible {
    outline: 2px solid
      ${({ theme, $variant }) =>
        $variant === "danger" ? theme.error : theme.primary};
    outline-offset: 3px;
  }

  &:active {
    transform: scale(0.99);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  &:disabled:hover {
    transform: none;
    box-shadow: none;
    background: ${({ theme, $variant }) => {
      switch ($variant) {
        case "login":
        case "secondary":
          return "transparent";
        case "danger":
          return `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`;
        default:
          return theme.primaryGradient;
      }
    }};
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0) scale(0.99);
    }

    &:disabled:hover {
      transform: none;
    }
  }

  @media (max-width: 480px) {
    flex: none;
    width: 100%;
    padding: 12px 20px;
    font-size: 0.9375rem;
  }
`;
