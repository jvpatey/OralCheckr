import { useRef } from "react";
import DatePicker from "react-datepicker";
import { IconButton } from "../../../components/habit-tracker/habits/IconButton";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import { formatMonthYear } from "../../../common/utilities/date-utils";
import { useTheme } from "styled-components";
import {
  DatePickerContainer,
  DatePickerButton,
} from "../../../components/habit-tracker/analytics/styles/DateSelectorStyles";

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
        borderColor={theme.blue}
        color={theme.blue}
        hoverBackgroundColor={theme.blue}
      />
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
      <IconButton
        icon={faChevronRight}
        onClick={increaseDate}
        borderColor={theme.blue}
        color={theme.blue}
        hoverBackgroundColor={theme.blue}
        disabled={isNextDisabled}
      />
      <TodayButton onClick={handleTodayClick} />
    </DatePickerContainer>
  );
}
