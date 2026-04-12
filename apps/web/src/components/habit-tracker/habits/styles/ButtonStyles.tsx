import styled, { css } from "styled-components";

// Base button style
export const BaseButton = styled.div<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

// Icon button container with modern gradient styling
export const IconButtonContainer = styled(BaseButton)<{
  $disabled?: boolean;
  $borderColor: string;
  $color: string;
  $hoverBackgroundColor: string;
}>`
  /* Glassmorphism background */
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.disabledBackground : `${theme.glassBg}`};
  backdrop-filter: ${({ $disabled }) => ($disabled ? "none" : "blur(8px)")};
  -webkit-backdrop-filter: ${({ $disabled }) =>
    $disabled ? "none" : "blur(8px)"};

  /* Modern border with gradient color */
  border: 2px solid
    ${({ $borderColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $borderColor};
  color: ${({ $color, $disabled, theme }) =>
    $disabled ? theme.disabledText : $color};

  width: 48px;
  height: 48px;
  border-radius: 14px;
  box-shadow: ${({ theme, $disabled }) =>
    $disabled ? "none" : theme.shadowSm};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Gradient overlay for hover effect */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ $hoverBackgroundColor }) =>
      `linear-gradient(135deg, ${$hoverBackgroundColor} 0%, ${$hoverBackgroundColor}90 100%)`};
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 12px;
  }

  &:hover:not([aria-disabled="true"]) {
    background: ${({ $hoverBackgroundColor }) => $hoverBackgroundColor};
    border: 2px solid ${({ $borderColor }) => $borderColor};
    color: white;
    box-shadow: ${({ theme }) => theme.shadowMd};
    transform: translateY(-2px);

    &::before {
      opacity: 0.2;
    }
  }

  &:active:not([aria-disabled="true"]) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

/** Flanking habit controls — same visual language as week-selector ArrowButton */
export const HabitIconButtonContainer = styled(BaseButton)<{
  $disabled?: boolean;
  $accent: "plus" | "minus" | "edit" | "delete";
}>`
  font-family: var(--font-sans), system-ui, sans-serif;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.2s ease,
    opacity 0.2s ease;

  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          cursor: not-allowed;
          pointer-events: none;
          opacity: 0.5;
          background: transparent;
          border: 1px solid ${theme.borderLight};
          color: ${theme.textGrey};
          box-shadow: none;
        `
      : css`
          cursor: pointer;
          opacity: 1;
          background: transparent;
          box-shadow: none;
        `}

  ${({ $disabled, $accent, theme }) =>
    !$disabled &&
    ($accent === "plus" || $accent === "minus"
      ? css`
          border: 1px solid ${`${theme.primary}45`};
          color: ${theme.textPrimary};
          &:hover {
            border-color: ${`${theme.primary}65`};
            background: ${`${theme.primary}0d`};
            color: ${theme.primary};
            box-shadow: 0 0 0 1px ${`${theme.primary}22`} inset;
          }
        `
      : $accent === "edit"
        ? css`
            border: 1px solid
              color-mix(in srgb, ${theme.warning} 45%, transparent);
            color: ${theme.textPrimary};
            &:hover {
              border-color: color-mix(
                in srgb,
                ${theme.warning} 65%,
                transparent
              );
              background: color-mix(
                in srgb,
                ${theme.warning} 12%,
                transparent
              );
              color: ${theme.warning};
              box-shadow: 0 0 0 1px
                color-mix(in srgb, ${theme.warning} 22%, transparent) inset;
            }
          `
        : css`
            border: 1px solid
              color-mix(in srgb, ${theme.error} 45%, transparent);
            color: ${theme.textPrimary};
            &:hover {
              border-color: color-mix(in srgb, ${theme.error} 65%, transparent);
              background: color-mix(in srgb, ${theme.error} 12%, transparent);
              color: ${theme.error};
              box-shadow: 0 0 0 1px
                color-mix(in srgb, ${theme.error} 22%, transparent) inset;
            }
          `)}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover:not([aria-disabled="true"]) {
      transform: translateY(-1px);
    }

    &:active:not([aria-disabled="true"]) {
      transform: translateY(0) scale(0.99);
    }
  }
`;

export const HabitIconInner = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

// Icon text button container
export const IconTextButtonContainer = styled(BaseButton)`
  background-color: ${({ theme }) => theme.blue};
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: 600;
  gap: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.darkBlue};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 14px;
  }
`;

// Icon container
export const IconContainer = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
