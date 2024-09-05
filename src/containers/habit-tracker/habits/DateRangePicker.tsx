import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "../../../components/habit-tracker/habits/DayBubble";
import { colors } from "../../../common/utilities/color-utils";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import { formatDateShort } from "../../../common/utilities/date-utils";

// Styled component for the container of the date controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Styled component for the container of the date picker and today button
const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  @media (max-width: 400px) {
    margin-left: 30px;
  }
`;

// Styled component for the date bubbles container
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

// Styled component for the date picker input button
const CustomDatePickerInput = styled.button<{ $disabled: boolean }>`
  background-color: ${({ $disabled }) =>
    $disabled ? colors.disabledBgGrey : colors.bgWhite};
  color: ${({ $disabled }) => ($disabled ? colors.textGrey : colors.blue)};
  border: ${({ $disabled }) =>
    $disabled
      ? `2px solid ${colors.disabledBgGrey}`
      : `2px solid ${colors.blue}`};
  padding: 8px 12px;
  border-radius: 5px;
  text-align: center;
  min-width: 150px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
    background-color: ${({ $disabled }) =>
      $disabled ? colors.disabledBgGrey : colors.blue};
    color: ${({ $disabled }) => ($disabled ? colors.textGrey : colors.bgWhite)};
    border: ${({ $disabled }) =>
      $disabled
        ? `2px solid ${colors.disabledBgGrey}`
        : `2px solid ${colors.blue}`};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 2px rgba(53, 122, 150, 0.5);
  }
`;

// Styled component for the arrow buttons to navigate weeks
const ArrowButton = styled.button<{ $disabled: boolean }>`
  background: none;
  border: none;
  color: ${({ $disabled }) => ($disabled ? colors.textGrey : colors.blue)};
  font-size: 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 50%;
  width: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $disabled }) =>
      $disabled ? "none" : colors.disabledBgGrey};
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

// Helper function to calculate the start of the week for a given date
const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return startOfWeek;
};

// Helper function to get an array of days in the current week
const getDaysInWeek = (startOfWeek: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

interface DateRangePickerProps {
  isEditMode: boolean;
  selectedFullDate: Date;
  setSelectedFullDate: (date: Date) => void;
}

// Functional component for the date picker - used in the Habits component
export function DateRangePicker({
  isEditMode,
  selectedFullDate,
  setSelectedFullDate,
}: DateRangePickerProps) {
  // State to track the selected day within the week
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(
    selectedFullDate.getDay()
  );

  const today = new Date();
  const startOfWeek = getStartOfWeek(selectedFullDate);
  const daysInWeek = getDaysInWeek(startOfWeek);
  const weekRange = `${formatDateShort(startOfWeek)} - ${formatDateShort(
    daysInWeek[6]
  )}`;

  // Handler for moving to the previous week
  const handlePrevWeek = () => {
    const newDate = new Date(selectedFullDate);
    newDate.setDate(selectedFullDate.getDate() - 7);
    setSelectedFullDate(newDate);
    setSelectedDayIndex(newDate.getDay());
  };

  // Handler for moving to the next week
  const handleNextWeek = () => {
    const newDate = new Date(selectedFullDate);
    newDate.setDate(selectedFullDate.getDate() + 7);
    setSelectedFullDate(newDate);
    setSelectedDayIndex(newDate.getDay());

    // Ensure that the selected day is not in the future
    if (newDate > today) {
      setSelectedFullDate(today);
      setSelectedDayIndex(today.getDay());
    }
  };

  // Handler for clicking on a specific day bubble
  const handleDayClick = (dayIndex: number) => {
    const day = daysInWeek[dayIndex];
    if (!isEditMode && day <= today) {
      setSelectedFullDate(day);
      setSelectedDayIndex(dayIndex);
    }
  };

  // Handler for resetting to the current date
  const handleTodayClick = () => {
    setSelectedFullDate(today);
    setSelectedDayIndex(today.getDay());
  };

  // Custom input component for the DatePicker
  const CustomInput = forwardRef(({ onClick }: any, ref: any) => (
    <CustomDatePickerInput $disabled={isEditMode} onClick={onClick} ref={ref}>
      {weekRange}
    </CustomDatePickerInput>
  ));

  // Determine if the next week arrow should be disabled
  const isNextWeekDisabled = today <= daysInWeek[6];

  return (
    <DateControlsContainer>
      <DatePickerWrapper>
        <DatePicker
          selected={selectedFullDate}
          onChange={(date: Date | null) => {
            if (date) {
              setSelectedFullDate(date);
              setSelectedDayIndex(date.getDay());
            }
          }}
          dateFormat="MMMM d, yyyy"
          showWeekNumbers={false}
          highlightDates={daysInWeek}
          customInput={<CustomInput />}
          disabled={isEditMode}
          maxDate={today}
        />
        <TodayButton onClick={handleTodayClick} disabled={isEditMode} />
      </DatePickerWrapper>
      <DayBubbleContainer>
        <ArrowButton
          onClick={handlePrevWeek}
          $disabled={isEditMode}
          disabled={isEditMode}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        {daysInWeek.map((day, index) => (
          <DayBubble
            key={index}
            selected={
              index === selectedDayIndex && !(isEditMode || day > today)
            }
            onClick={() => handleDayClick(index)}
            date={day}
            isEditMode={isEditMode || day > today}
          />
        ))}
        <ArrowButton
          onClick={handleNextWeek}
          $disabled={isEditMode || isNextWeekDisabled}
          disabled={isEditMode || isNextWeekDisabled}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowButton>
      </DayBubbleContainer>
    </DateControlsContainer>
  );
}
