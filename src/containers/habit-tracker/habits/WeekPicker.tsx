import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import { colors } from "../../../common/utilities/color-utils";
import { formatDateShort } from "../../../common/utilities/date-utils";
import { DayBubbleSelector } from "./DayBubbleSelector";

// Styled component for the container that holds the DatePicker and controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Styled component to wrap the DatePicker and its controls
const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  @media (max-width: 400px) {
    margin-left: 30px;
  }
`;

// Custom-styled button to be used as the input field for the DatePicker
const CustomDatePickerInput = styled.button<{ $disabled: boolean }>`
  background-color: ${({ $disabled, theme }) =>
    $disabled ? colors.disabledBgGrey : theme.backgroundColor};
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
    background-color: ${({ $disabled }) =>
      $disabled ? colors.disabledBgGrey : colors.blue};
    color: ${({ $disabled, theme }) => ($disabled ? colors.textGrey : theme.backgroundColor)};
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

interface WeekPickerProps {
  isEditMode: boolean;
  onDateChange: (date: Date) => void;
}

// Functional component for the WeekPicker used in the habits page of Analytics
export function WeekPicker({ isEditMode, onDateChange }: WeekPickerProps) {
  const today = new Date();
  const [selectedFullDate, setSelectedFullDate] = useState<Date>(today);

  // When the date changes, update the internal state and trigger the callback
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedFullDate(date);
      onDateChange(date);
    }
  };

  // Calculate the start of the week for the selected date to display on WeekPicker button and Daybubble
  const startOfWeek = new Date(selectedFullDate);
  startOfWeek.setDate(selectedFullDate.getDate() - selectedFullDate.getDay());

  // Create an array of dates for the current week to display on WeekPicker button and Daybubble
  const daysInWeek = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    return day;
  });

  // Custom input for the DatePicker to show the selected week range
  const CustomInput = forwardRef(({ onClick }: any, ref: any) => (
    <CustomDatePickerInput $disabled={isEditMode} onClick={onClick} ref={ref}>
      {`${formatDateShort(startOfWeek)} - ${formatDateShort(daysInWeek[6])}`}
    </CustomDatePickerInput>
  ));

  // Handle the click on the Today button to set the selected date to today
  const handleTodayClick = () => {
    setSelectedFullDate(today);
    onDateChange(today);
  };

  return (
    <DateControlsContainer>
      <DatePickerWrapper>
        <DatePicker
          selected={selectedFullDate}
          onChange={handleDateChange}
          dateFormat="w/yyyy"
          showWeekPicker // Enable week selection mode for React Weekpicker
          customInput={<CustomInput />}
          disabled={isEditMode}
          maxDate={today} // Prevent selecting dates in the future
        />
        <TodayButton onClick={handleTodayClick} disabled={isEditMode} />
      </DatePickerWrapper>

      <DayBubbleSelector
        daysInWeek={daysInWeek}
        selectedFullDate={selectedFullDate}
        setSelectedFullDate={setSelectedFullDate}
        onDateChange={onDateChange}
        isEditMode={isEditMode}
      />
    </DateControlsContainer>
  );
}
