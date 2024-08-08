import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Styled component styles for the add habit tile component
const AddTileContainer = styled.div`
  background-color: #41bc7a;
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
    border: 2px solid #41bc7a;
    color: #41bc7a;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 0 15px;
  }

  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const HabitName = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-left: 5px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
    margin-left: 5px;
  }
`;

const AddIcon = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

interface AddHabitTileProps {
  onAddClick: () => void;
}

export function AddHabitTile({ onAddClick }: AddHabitTileProps) {
  return (
    <AddTileContainer onClick={onAddClick}>
      <AddIcon>
        <FontAwesomeIcon icon={faPlus} />
      </AddIcon>
      <HabitName>Add Habit</HabitName>
    </AddTileContainer>
  );
}
