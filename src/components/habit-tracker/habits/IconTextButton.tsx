import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

interface IconTextButtonProps {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
  backgroundColor: string;
  hoverColor: string;
  isEditMode?: boolean;
  disabled?: boolean;
}

const ButtonContainer = styled.div<{
  $backgroundColor: string;
  $hoverColor: string;
  $isEditMode?: boolean;
  $disabled?: boolean;
}>`
  /* Modern gradient background */
  background: ${({ $backgroundColor, $disabled, theme }) => {
    if ($disabled) return theme.disabledBackground;
    // Create gradient based on color
    if (
      $backgroundColor === theme.green ||
      $backgroundColor === theme.secondary
    ) {
      return theme.secondaryGradient;
    }
    if ($backgroundColor === theme.red || $backgroundColor === theme.error) {
      return `linear-gradient(135deg, ${theme.error} 0%, ${theme.errorLight} 100%)`;
    }
    if (
      $backgroundColor === theme.yellow ||
      $backgroundColor === theme.warning
    ) {
      return `linear-gradient(135deg, ${theme.warning} 0%, ${theme.warningLight} 100%)`;
    }
    return theme.primaryGradient;
  }};
  color: ${({ theme, $disabled }) => ($disabled ? theme.textGrey : "white")};
  width: auto;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  padding: 0 24px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  border: none;
  box-shadow: ${({ theme, $disabled }) =>
    $disabled ? "none" : theme.shadowMd};
  position: relative;
  overflow: hidden;
  font-weight: 600;

  /* Subtle shine sweep effect */
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

  &:hover:not([disabled]) {
    transform: translateY(-2px) scale(1.02);
    box-shadow: ${({ theme }) => theme.shadowLg};

    &::before {
      left: 100%;
    }
  }

  &:active:not([disabled]) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    font-size: 14px;
    height: 36px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    font-size: 13px;
    height: 34px;
  }
`;

const IconWrapper = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 14px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const Label = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 5px;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    margin-left: 5px;
  }
`;

// Functional component for the common icon button with text (edit mode, add habit, cancel buttons) - used in the Habits component
export function IconTextButton({
  icon,
  label,
  onClick,
  backgroundColor,
  hoverColor,
  isEditMode = false,
  disabled = false,
}: IconTextButtonProps) {
  return (
    <ButtonContainer
      onClick={disabled ? undefined : onClick}
      $backgroundColor={backgroundColor}
      $hoverColor={hoverColor}
      $isEditMode={isEditMode}
      $disabled={disabled}
    >
      <IconWrapper>
        <FontAwesomeIcon icon={icon} />
      </IconWrapper>
      <Label>{label}</Label>
    </ButtonContainer>
  );
}
