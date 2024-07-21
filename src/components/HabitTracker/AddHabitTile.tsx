import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// styled component styles for the add habit tile component
const AddTileContainer = styled.div`
  background-color: #e0e0e0;
  width: 65%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #07889b;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  transition: transform 0.3s;

  &:hover {
    font-weight: bold;
    transform: scale(1.05);
    color: #07889b;
  }

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const HabitName = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const EditIcon = styled.div`
  cursor: pointer;
  color: #07889b;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
`;

// Types
interface AddHabitTileProps {
  onAddClick: () => void;
}

export function AddHabitTile({ onAddClick }: AddHabitTileProps) {
  return (
    <AddTileContainer onClick={onAddClick}>
      <HabitName>Add Habit</HabitName>
      <IconWrapper>
        <EditIcon>
          <FontAwesomeIcon icon={faPlus} />
        </EditIcon>
      </IconWrapper>
    </AddTileContainer>
  );
}
