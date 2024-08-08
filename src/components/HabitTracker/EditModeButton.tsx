import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTimes } from "@fortawesome/free-solid-svg-icons";

// Styled component styles for the edit button
const EditTileContainer = styled.div<{ isEditMode: boolean }>`
  background-color: ${({ isEditMode }) => (isEditMode ? "#e74c3c" : "#f1c232")};
  color: #ffffff;
  width: auto;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 0 20px;
  cursor: pointer;
  transition: box-shadow 0.3s, background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
    border: 2px solid
      ${({ isEditMode }) => (isEditMode ? "#e07366" : "#f1c232")};
    color: ${({ isEditMode }) => (isEditMode ? "#e07366" : "#f1c232")};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;

const ButtonLabel = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

const EditIcon = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface EditModeButtonProps {
  onClick: () => void;
  isEditMode: boolean;
}

export function EditModeButton({ onClick, isEditMode }: EditModeButtonProps) {
  return (
    <EditTileContainer onClick={onClick} isEditMode={isEditMode}>
      <EditIcon>
        <FontAwesomeIcon icon={isEditMode ? faTimes : faPencilAlt} />
      </EditIcon>
      <ButtonLabel>{isEditMode ? "Exit" : "Edit"}</ButtonLabel>
    </EditTileContainer>
  );
}
