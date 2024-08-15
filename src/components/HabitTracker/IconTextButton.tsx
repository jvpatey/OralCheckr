import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/color-utils";

interface IconTextButtonProps {
  icon: IconDefinition;
  label: string;
  onClick: () => void;
  backgroundColor: string;
  color: string;
  hoverBackgroundColor: string;
  hoverColor: string;
  isEditMode?: boolean;
  disabled?: boolean;
}

const ButtonContainer = styled.div<{
  $backgroundColor: string;
  $color: string;
  $hoverBackgroundColor: string;
  $hoverColor: string;
  $isEditMode?: boolean;
  $disabled?: boolean;
}>`
  background-color: ${({ $backgroundColor, $disabled }) =>
    $disabled ? colors.disabledBgGrey : $backgroundColor};
  color: ${({ $color, $disabled }) => ($disabled ? colors.textGrey : $color)};
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: box-shadow 0.3s, background-color 0.3s;
  white-space: nowrap;

  &:hover {
    background-color: ${({ $hoverBackgroundColor, $disabled }) =>
      $disabled ? colors.disabledBgGrey : $hoverBackgroundColor};
    border: 2px solid
      ${({ $hoverBackgroundColor, $disabled }) =>
        $disabled ? colors.disabledBgGrey : $hoverBackgroundColor};
    color: ${({ $hoverColor, $disabled }) =>
      $disabled ? colors.textGrey : $hoverColor};
    box-shadow: ${({ $disabled }) =>
      $disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
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

export function IconTextButton({
  icon,
  label,
  onClick,
  backgroundColor,
  color,
  hoverBackgroundColor,
  hoverColor,
  isEditMode = false,
  disabled = false,
}: IconTextButtonProps) {
  return (
    <ButtonContainer
      onClick={disabled ? undefined : onClick}
      $backgroundColor={backgroundColor}
      $color={color}
      $hoverBackgroundColor={hoverBackgroundColor}
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
