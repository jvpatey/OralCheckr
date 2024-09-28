import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "../../../components/habit-tracker/habits/DayBubble";
import { formatDateShort } from "../../../common/utilities/date-utils";
import { addWeeks, isSameWeek, subWeeks } from "date-fns";

// Container for day bubbles and arrow navigation
const DayBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
  }
`;

// Styled component for the arrow buttons that navigate between weeks
const ArrowButton = styled.button<{ $disabled: boolean }>`
  background: none;
  border: none;
  color: ${({ $disabled, theme }) => ($disabled ? theme.textGrey : theme.blue)};
  font-size: 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 50%;
  width: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $disabled, theme }) =>
      $disabled ? "none" : theme.disabledBackground};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 16px;
  }

  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    font-size: 14px;
  }
`;

interface DayBubbleSelectorProps {
  daysInWeek: Date[];
  selectedFullDate: Date;
  setSelectedFullDate: (date: Date) => void;
  onDateChange: (date: Date) => void;
  isEditMode: boolean;
}

// Functional component for day bubbles and week navigation in the habits page of Analytics
export function DayBubbleSelector({
  daysInWeek,
  selectedFullDate,
  setSelectedFullDate,
  onDateChange,
  isEditMode,
}: DayBubbleSelectorProps) {
  const today = new Date();

  // Function to handle week navigation (previous or next) based on direction
  const handleWeekChange = (direction: number) => {
    const newDate = direction === -1 ? subWeeks(selectedFullDate, 1) : addWeeks(selectedFullDate, 1);
    
    // If the new date is in the future when navigating, set it to today
    if (newDate > today) {
      setSelectedFullDate(today);
      onDateChange(today);
    } else {
      setSelectedFullDate(newDate);
      onDateChange(newDate);
    }
  };

  // Handler for DayBubble click
  const handleDayClick = (day: Date) => {
    if (!isEditMode && day <= today) {
      setSelectedFullDate(day);
      onDateChange(day);
    }
  };

  // Check if today is in the current week (if yes, disable next arrow)
  const isCurrentWeek = isSameWeek(today, selectedFullDate);

  return (
    <DayBubbleContainer>
      <ArrowButton
        onClick={() => handleWeekChange(-1)}
        $disabled={isEditMode}
        disabled={isEditMode}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </ArrowButton>

      {/* Render day bubbles for each day in the current week */}
      {daysInWeek.map((day, index) => (
        <DayBubble
          key={index}
          selected={
            formatDateShort(selectedFullDate) === formatDateShort(day) &&
            !isEditMode
          }
          onClick={() => handleDayClick(day)}
          date={day}
          isEditMode={isEditMode || day > today}
        />
      ))}

      <ArrowButton
        onClick={() => handleWeekChange(1)}
        $disabled={isEditMode || isCurrentWeek}
        disabled={isEditMode || isCurrentWeek}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </ArrowButton>
    </DayBubbleContainer>
  );
}
