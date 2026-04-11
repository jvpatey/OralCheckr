import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import { formatDateShort } from "../../../common/utilities/date-utils";
import { DayBubbleSelector } from "./DayBubbleSelector";

// Fluid container for date picker controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Wrapper for the date picker and today button
const DatePickerControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-bottom: 6px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin-bottom: 4px;
  }
`;

// Modern styled wrapper for the week picker dropdown
const StyledWeekPickerWrapper = styled.div`
  .react-datepicker {
    background: ${({ theme }) => theme.glassBg} !important;
    backdrop-filter: blur(${({ theme }) => theme.glassBlur}) !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    border-radius: 16px !important;
    box-shadow: ${({ theme }) => theme.shadowXl} !important;
    padding: 16px !important;
    font-family: inherit !important;
  }

  .react-datepicker__header {
    background: transparent !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    padding: 0 0 12px 0 !important;
    margin-bottom: 12px !important;
  }

  .react-datepicker__current-month {
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 700 !important;
    font-size: 18px !important;
    margin-bottom: 8px !important;
  }

  .react-datepicker__navigation {
    background: ${({ theme }) => theme.primaryGradient} !important;
    border: none !important;
    border-radius: 8px !important;
    width: 32px !important;
    height: 32px !important;
    top: 8px !important;
    transition: all 0.3s ease !important;

    &:hover {
      transform: scale(1.1) !important;
      box-shadow: ${({ theme }) => theme.shadowMd} !important;
    }

    &::before {
      border-color: white !important;
      border-width: 2px 2px 0 0 !important;
    }
  }

  .react-datepicker__navigation--previous {
    left: 8px !important;
  }

  .react-datepicker__navigation--next {
    right: 8px !important;
  }

  .react-datepicker__month {
    margin: 0 !important;
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    padding: 8px !important;
    margin: 2px !important;
    border-radius: 8px !important;
    transition: all 0.3s ease !important;
    border: 1px solid transparent !important;

    &:hover {
      background: rgba(6, 182, 212, 0.1) !important;
      color: ${({ theme }) => theme.primary} !important;
      transform: translateY(-1px) !important;
    }
  }

  .react-datepicker__day--selected {
    background: ${({ theme }) => theme.primaryGradient} !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: ${({ theme }) => theme.shadowMd} !important;
    border: none !important;

    &:hover {
      background: ${({ theme }) => theme.primaryGradient} !important;
      transform: translateY(-1px) scale(1.02) !important;
    }
  }

  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range {
    background: rgba(6, 182, 212, 0.2) !important;
    color: ${({ theme }) => theme.primary} !important;
    font-weight: 600 !important;
    border: 1px solid rgba(6, 182, 212, 0.3) !important;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background: ${({ theme }) => theme.primaryGradient} !important;
    color: white !important;
    font-weight: 600 !important;
    box-shadow: ${({ theme }) => theme.shadowMd} !important;
    border: none !important;
  }

  .react-datepicker__day--today {
    background: rgba(16, 185, 129, 0.1) !important;
    color: ${({ theme }) => theme.secondary} !important;
    font-weight: 600 !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important;
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.textTertiary} !important;
    opacity: 0.5 !important;
  }

  .react-datepicker__day-name {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 600 !important;
    padding: 8px !important;
    margin: 2px !important;
    text-transform: uppercase !important;
    font-size: 12px !important;
    letter-spacing: 0.5px !important;
  }

  /* Hide the default arrow */
  .react-datepicker__triangle {
    display: none !important;
  }
`;

// Custom-styled button to be used as the input field for the DatePicker with gradient
const CustomDatePickerInput = styled.button<{ $disabled: boolean }>`
  /* Gradient background */
  background: ${({ $disabled, theme }) =>
    $disabled ? theme.disabledBackground : theme.primaryGradient};
  color: ${({ $disabled, theme }) => ($disabled ? theme.textGrey : "white")};
  border: none;
  padding: 12px 20px;
  border-radius: 14px;
  text-align: center;
  min-width: 180px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  font-weight: 600;
  font-size: 0.95rem;
  box-shadow: ${({ theme, $disabled }) =>
    $disabled ? "none" : theme.shadowMd};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  /* Subtle glow effect overlay */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    border-radius: 14px;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadowLg};

    &::before {
      opacity: 1;
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    transition-duration: 0.1s;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.primary};
    outline-offset: 2px;
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
      <DatePickerControls>
        <StyledWeekPickerWrapper>
          <DatePicker
            selected={selectedFullDate}
            onChange={handleDateChange}
            dateFormat="w/yyyy"
            showWeekPicker // Enable week selection mode for React Weekpicker
            customInput={<CustomInput />}
            disabled={isEditMode}
            maxDate={today} // Prevent selecting dates in the future
          />
        </StyledWeekPickerWrapper>
        <TodayButton onClick={handleTodayClick} disabled={isEditMode} />
      </DatePickerControls>

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
