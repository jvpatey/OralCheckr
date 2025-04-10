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
  background-color: ${({ $backgroundColor, $disabled, theme }) =>
    $disabled ? theme.disabledBackground : $backgroundColor};
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.textGrey : theme.backgroundColor};
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: all 0.4s ease-out;
  white-space: nowrap;
  border: 2px solid
    ${({ $backgroundColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $backgroundColor};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;

  &:hover {
    background-color: ${({ theme, $disabled }) =>
      $disabled ? theme.disabledBackground : theme.backgroundColor};
    border-color: ${({ $hoverColor, $disabled, theme }) =>
      $disabled ? theme.disabledBackground : $hoverColor};
    color: ${({ $hoverColor, $disabled, theme }) =>
      $disabled ? theme.textGrey : $hoverColor};
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
