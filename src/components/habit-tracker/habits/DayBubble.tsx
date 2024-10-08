import styled from "styled-components";
import { formatWeekdayShort } from "../../../common/utilities/date-utils";

// Styled component for the individual day bubbles in the date picker
const DayBubbleStyled = styled.div<{ selected: boolean; $isEditMode: boolean }>`
  // Background color changes based on selection and edit mode
  background-color: ${({ selected, $isEditMode, theme }) =>
    selected
      ? theme.blue
      : $isEditMode
      ? theme.disabledBackground
      : theme.disabledBackground};
  color: ${({ selected, $isEditMode, theme }) =>
    selected || $isEditMode ? theme.backgroundColor : theme.blue};

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
    background-color: ${({ selected, $isEditMode, theme }) =>
      $isEditMode
        ? theme.disabledBackground
        : selected
        ? theme.blue
        : theme.disabledBackground};
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

// Functional component to render each day bubble in the date picker
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
      <div>{formatWeekdayShort(date)}</div>
    </DayBubbleStyled>
  );
}
