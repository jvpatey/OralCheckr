import styled from "styled-components";
import { colors } from "../../common/utilities/color-utils";

// Styled component for the date bubbles that show the range of dates for the selected week - used in the Habits component
const DayBubbleStyled = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  background-color: ${({ selected }) =>
    selected ? colors.blue : colors.bgGrey};
  color: ${({ $isEditMode }) =>
    $isEditMode ? colors.textGrey : colors.bgWhite};
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 5px;
  cursor: ${({ $isEditMode }) => ($isEditMode ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ $isEditMode }) =>
      $isEditMode ? colors.bgGrey : colors.blue};
    transform: ${({ $isEditMode }) => ($isEditMode ? "none" : "scale(1.05)")};
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 12px;
    margin: 2px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    font-size: 10px;
    margin: 1px;
  }
`;

interface DayBubbleProps {
  selected: boolean;
  onClick: () => void;
  date: Date;
  isEditMode: boolean;
}

export function DayBubble({
  selected,
  onClick,
  date,
  isEditMode,
}: DayBubbleProps) {
  return (
    <DayBubbleStyled
      selected={selected}
      onClick={onClick}
      $isEditMode={isEditMode}
    >
      <div>{date.getDate()}</div>
      <div>{date.toLocaleDateString("en", { weekday: "short" })[0]}</div>
    </DayBubbleStyled>
  );
}
