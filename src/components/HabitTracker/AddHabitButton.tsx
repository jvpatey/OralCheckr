import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../common/color-utils";

// Styled component styles for the add habit tile component
const AddHabitButtonContainer = styled.div`
  background-color: ${colors.green};
  color: ${colors.bgWhite};
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
  white-space: nowrap;

  &:hover {
    background-color: ${colors.bgWhite};
    border: 2px solid ${colors.green};
    color: ${colors.green};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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

const HabitName = styled.div`
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

const AddIcon = styled.div`
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

interface AddHabitTileProps {
  onAddClick: () => void;
}

export function AddHabitButton({ onAddClick }: AddHabitTileProps) {
  return (
    <AddHabitButtonContainer onClick={onAddClick}>
      <AddIcon>
        <FontAwesomeIcon icon={faPlus} />
      </AddIcon>
      <HabitName>Add Habit</HabitName>
    </AddHabitButtonContainer>
  );
}
