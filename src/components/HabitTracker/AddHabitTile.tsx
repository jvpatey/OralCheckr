import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Styled component styles for the add habit tile component
const AddTileContainer = styled.div`
  background-color: #d9ead3;
  color: #659053;
  font-weight: bold;
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
  border: 2px solid #659053;
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;
  transition: box-shadow 0.3s, color 0.3s, font-weight 0.3s;

  &:hover {
    font-weight: bold;
    border-color: #38761d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    color: #38761d;
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
  margin-right: 40px;
`;

const AddIcon = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
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
