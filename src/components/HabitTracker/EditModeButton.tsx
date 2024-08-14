import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/color-utils";

// Styled component styles for the edit button
const EditTileContainer = styled.div<{
  $isEditMode: boolean;
  $disabled: boolean;
}>`
  background-color: ${({ $isEditMode, $disabled }) =>
    $disabled
      ? colors.disabledBgGrey
      : $isEditMode
      ? colors.red
      : colors.yellow};
  color: ${colors.bgWhite};
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

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? colors.disabledBgGrey : colors.bgWhite};
    border: 2px solid
      ${({ $isEditMode, $disabled }) =>
        $disabled
          ? colors.disabledBgGrey
          : $isEditMode
          ? colors.red
          : colors.yellow};
    color: ${({ $isEditMode, $disabled }) =>
      $disabled ? colors.textGrey : $isEditMode ? colors.red : colors.yellow};
    box-shadow: ${({ $disabled }) =>
      $disabled ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
  }

  @media (max-width: 768px) {
    padding: 0 12px;
    height: 35px;
  }
`;

const ButtonLabel = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  @media (max-width: 480px) {
    font-size: 10px;
    margin-left: 10px;
  }
`;

const EditIcon = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 480px) {
    font-size: 10px;
    margin-left: 3px;
  }
`;

interface EditModeButtonProps {
  onClick: () => void;
  isEditMode: boolean;
  disabled?: boolean;
}

export function EditModeButton({
  onClick,
  isEditMode,
  disabled = false,
}: EditModeButtonProps) {
  return (
    <EditTileContainer
      onClick={disabled ? undefined : onClick}
      $isEditMode={isEditMode}
      $disabled={disabled}
    >
      <EditIcon>
        <FontAwesomeIcon icon={isEditMode ? faTimes : faPencilAlt} />
      </EditIcon>
      <ButtonLabel>{isEditMode ? "Exit" : "Edit"}</ButtonLabel>
    </EditTileContainer>
  );
}
