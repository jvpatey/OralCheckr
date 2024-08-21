import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/utilities/color-utils";

interface IconButtonProps {
  icon: IconDefinition;
  onClick: () => void;
  borderColor: string;
  backgroundColor: string;
  color: string;
  hoverBackgroundColor: string;
  hoverColor: string;
  disabled?: boolean;
}

const ButtonContainer = styled.div<{
  $disabled?: boolean;
  $borderColor: string;
  $backgroundColor: string;
  $color: string;
  $hoverBackgroundColor: string;
  $hoverColor: string;
}>`
  background-color: ${({ $backgroundColor, $disabled }) =>
    $disabled ? colors.disabledBgGrey : $backgroundColor};
  border: 2px solid
    ${({ $borderColor, $disabled }) =>
      $disabled ? colors.bgGrey : $borderColor};
  color: ${({ $color, $disabled }) => ($disabled ? colors.bgGrey : $color)};
  width: 50px;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-left: 10px;
  margin-bottom: 10px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: ${({ $hoverBackgroundColor, $disabled }) =>
      $disabled ? colors.disabledBgGrey : $hoverBackgroundColor};
    border: 2px solid
      ${({ $borderColor, $disabled }) =>
        $disabled ? colors.bgGrey : $borderColor};
    color: ${({ $hoverColor, $disabled }) =>
      $disabled ? colors.bgGrey : $hoverColor};
    box-shadow: ${({ $disabled }) =>
      $disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
  }

  @media (max-width: 768px) {
    width: 45px;
  }
`;

const ButtonIcon = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Functional component for the common icon button (log, remove log, edit, and delete buttons) - used in the Habits component
export function IconButton({
  icon,
  onClick,
  borderColor,
  backgroundColor,
  color,
  hoverBackgroundColor,
  hoverColor,
  disabled = false,
}: IconButtonProps) {
  return (
    <ButtonContainer
      onClick={onClick}
      $disabled={disabled}
      $borderColor={borderColor}
      $backgroundColor={backgroundColor}
      $color={color}
      $hoverBackgroundColor={hoverBackgroundColor}
      $hoverColor={hoverColor}
    >
      <ButtonIcon>
        <FontAwesomeIcon icon={icon} />
      </ButtonIcon>
    </ButtonContainer>
  );
}