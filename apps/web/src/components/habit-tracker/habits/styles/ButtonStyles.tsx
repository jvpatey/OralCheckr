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

/** Flanking habit tile: same height as TileContainer (56px / 54px) */
export const HabitIconButtonContainer = styled(BaseButton)<{
  $disabled?: boolean;
  $accent: "plus" | "minus" | "edit" | "delete";
}>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  ${({ $disabled, theme }) =>
    $disabled
      ? css`
          cursor: not-allowed;
          opacity: 0.42;
          background: ${theme.disabledBackground};
          border: 1px solid ${theme.borderMedium};
          color: ${theme.textDisabled};
          box-shadow: none;
        `
      : css`
          cursor: pointer;
          opacity: 1;
          background: color-mix(in srgb, ${theme.glassBg} 88%, transparent);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            ${theme.shadowSm};
        `}

  ${({ $disabled, $accent, theme }) =>
    !$disabled &&
    ($accent === "plus"
      ? css`
          border: 1px solid color-mix(in srgb, ${theme.secondary} 36%, transparent);
          color: ${theme.secondary};
          &:hover {
            border-color: color-mix(in srgb, ${theme.secondary} 58%, transparent);
            background: color-mix(in srgb, ${theme.secondary} 16%, ${theme.glassBg});
            color: ${theme.secondaryDark};
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.12),
              ${theme.shadowMd},
              0 0 14px color-mix(in srgb, ${theme.secondary} 22%, transparent);
            transform: translateY(-1px);
          }
        `
      : $accent === "minus"
        ? css`
            border: 1px solid color-mix(in srgb, ${theme.primary} 28%, transparent);
            color: ${theme.textSecondary};
            &:hover {
              border-color: color-mix(in srgb, ${theme.error} 48%, transparent);
              background: color-mix(in srgb, ${theme.error} 11%, ${theme.glassBg});
              color: ${theme.error};
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, 0.1),
                ${theme.shadowMd};
              transform: translateY(-1px);
            }
          `
        : $accent === "edit"
          ? css`
              border: 1px solid color-mix(in srgb, ${theme.warning} 34%, transparent);
              color: ${theme.textTertiary};
              &:hover {
                border-color: color-mix(in srgb, ${theme.warning} 55%, transparent);
                background: color-mix(in srgb, ${theme.warning} 14%, ${theme.glassBg});
                color: ${theme.warning};
                box-shadow:
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  ${theme.shadowMd};
                transform: translateY(-1px);
              }
            `
          : css`
              border: 1px solid color-mix(in srgb, ${theme.error} 32%, transparent);
              color: ${theme.textTertiary};
              &:hover {
                border-color: color-mix(in srgb, ${theme.error} 58%, transparent);
                background: color-mix(in srgb, ${theme.error} 14%, ${theme.glassBg});
                color: ${theme.error};
                box-shadow:
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  ${theme.shadowMd};
                transform: translateY(-1px);
              }
            `)}

  &:active:not([aria-disabled="true"]) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 54px;
    height: 54px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const HabitIconInner = styled.div`
  font-size: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;

  @media (max-width: 768px) {
    font-size: 18px;
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
