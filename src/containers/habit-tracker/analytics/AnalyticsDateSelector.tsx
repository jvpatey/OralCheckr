import { useRef } from "react";
import DatePicker from "react-datepicker";
import { IconButton } from "../../../components/habit-tracker/habits/IconButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { formatMonthYear } from "../../../common/utilities/date-utils";
import { useTheme } from "styled-components";
import styled from "styled-components";
import {
  DatePickerContainer,
  DatePickerButton,
} from "../../../components/habit-tracker/analytics/styles/DateSelectorStyles";

// Modern styled wrapper for the date picker dropdown
const StyledDatePickerWrapper = styled.div`
  .react-datepicker {
    background: ${({ theme }) => theme.glassBg} !important;
    backdrop-filter: blur(${({ theme }) => theme.glassBlur}) !important;
    border: 1px solid
      ${({ theme }) => theme.glassBorder || "rgba(255, 255, 255, 0.2)"} !important;
    border-radius: 16px !important;
    box-shadow: ${({ theme }) => theme.shadowXl} !important;
    padding: 12px !important;
    font-family: inherit !important;
    min-width: 200px !important;
    max-width: 250px !important;
  }

  .react-datepicker__header {
    background: transparent !important;
    border-bottom: 1px solid
      ${({ theme }) => theme.glassBorder || "rgba(255, 255, 255, 0.1)"} !important;
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
      border-color: ${({ theme }) => theme.textPrimary} !important;
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

  .react-datepicker__month-text {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    padding: 8px 10px !important;
    margin: 1px !important;
    border-radius: 8px !important;
    transition: all 0.3s ease !important;
    border: 1px solid transparent !important;
    min-width: 60px !important;
    text-align: center !important;

    &:hover {
      background: rgba(6, 182, 212, 0.1) !important;
      color: ${({ theme }) => theme.primary} !important;
      transform: translateY(-1px) !important;
    }
  }

  .react-datepicker__month-text--selected {
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

  .react-datepicker__year-text {
    color: ${({ theme }) => theme.textSecondary} !important;
    font-weight: 500 !important;
    padding: 8px 12px !important;
    margin: 1px !important;
    border-radius: 8px !important;
    transition: all 0.3s ease !important;
    border: 1px solid transparent !important;
    min-width: 60px !important;
    text-align: center !important;

    &:hover {
      background: rgba(6, 182, 212, 0.1) !important;
      color: ${({ theme }) => theme.primary} !important;
      transform: translateY(-1px) !important;
    }
  }

  .react-datepicker__year-text--selected {
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

  /* Hide the default arrow */
  .react-datepicker__triangle {
    display: none !important;
  }
`;

// Define the ViewType enum for selecting month or year selector
export enum ViewType {
  MONTH = "month",
  YEAR = "year",
}

// interface for AnalyticsDateSelector
interface AnalyticsDateSelectorProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  viewType: ViewType;
}

// The AnalyticsDateSelector functional component to handle both month and year selection - used in month and year view analytics
export function AnalyticsDateSelector({
  selectedDate,
  onDateChange,
  viewType,
}: AnalyticsDateSelectorProps) {
  const theme = useTheme();
  const datePickerRef = useRef<DatePicker>(null);
  const today = new Date();

  // Handle the change of the selected date (either month or year)
  const handleDateChange = (date: Date | null) => {
    if (date) {
      onDateChange(date);
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  // Decrease the selected month or year by one
  const decreaseDate = () => {
    const newDate =
      viewType === ViewType.MONTH
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
        : new Date(selectedDate.getFullYear() - 1, selectedDate.getMonth(), 1);
    onDateChange(newDate);
  };

  // Increase the selected month or year by one
  const increaseDate = () => {
    if (isNextDisabled) return;

    const newDate =
      viewType === ViewType.MONTH
        ? new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
        : new Date(selectedDate.getFullYear() + 1, selectedDate.getMonth(), 1);
    onDateChange(newDate);
  };

  // Set the selected date to the current month or year
  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  // Handle the click on the date button to open the date picker
  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  // Check to compare selectedDate with the current date to see if next button should be disabled
  const isNextDisabled =
    (viewType === ViewType.MONTH &&
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth()) ||
    (viewType === ViewType.YEAR &&
      selectedDate.getFullYear() === today.getFullYear());

  return (
    <DatePickerContainer>
      <IconButton
        icon={faChevronLeft}
        onClick={decreaseDate}
        borderColor={theme.primary}
        color={theme.primary}
        hoverBackgroundColor={theme.primary}
      />
      <StyledDatePickerWrapper>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat={viewType === ViewType.MONTH ? "MMMM yyyy" : "yyyy"}
          showYearPicker={viewType === ViewType.YEAR}
          showMonthYearPicker={viewType === ViewType.MONTH}
          showPopperArrow={false}
          ref={datePickerRef}
          maxDate={today}
          onClickOutside={() => {
            if (datePickerRef.current) {
              datePickerRef.current.setOpen(false);
            }
          }}
          customInput={
            <DatePickerButton onClick={handleButtonClick}>
              {viewType === ViewType.MONTH
                ? formatMonthYear(selectedDate)
                : selectedDate.getFullYear()}
            </DatePickerButton>
          }
        />
      </StyledDatePickerWrapper>
      <IconButton
        icon={faChevronRight}
        onClick={increaseDate}
        borderColor={theme.primary}
        color={theme.primary}
        hoverBackgroundColor={theme.primary}
        disabled={isNextDisabled}
      />
    </DatePickerContainer>
  );
}
