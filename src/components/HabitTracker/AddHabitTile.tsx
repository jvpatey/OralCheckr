import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddTileContainer = styled.div`
  background-color: #e0e0e0;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #07889b;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    transform: scale(1.05);
    color: #07889b;
  }
`;

const HabitName = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #07889b;
  margin-top: 10px;
`;

interface AddHabitTileProps {
  onAddClick: () => void;
}

export function AddHabitTile({ onAddClick }: AddHabitTileProps) {
  return (
    <AddTileContainer onClick={onAddClick}>
      <HabitName>Add a Habit</HabitName>
      <EditIcon>
        <FontAwesomeIcon icon={faPlus} />
      </EditIcon>
    </AddTileContainer>
  );
}
