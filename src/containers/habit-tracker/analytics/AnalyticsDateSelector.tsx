import { useRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { IconButton } from "../../../components/habit-tracker/habits/IconButton";
import { TodayButton } from "../../../components/habit-tracker/analytics/TodayButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";
import "react-datepicker/dist/react-datepicker.css";

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

// Styled component for the Date Picker container
const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    width: 300px;
    padding: 0 10px;
  }
`;

// Styled component for the custom Date Picker button
const DatePickerButton = styled.button`
  background-color: ${colors.bgWhite};
  color: ${colors.blue};
  border: 2px solid ${colors.blue};
  padding: 0 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  height: 45px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  margin-bottom: 10px;
  margin-left: 10px;

  @media (max-width: 600px) {
    min-width: 50px;
    padding: 0 10px;
  }

  &:hover {
    background-color: ${colors.blue};
    border: 2px solid ${colors.blue};
    color: ${colors.bgWhite};
  }
`;

// The AnalyticsDateSelector functional component to handle both month and year selection - used in month and year view analytics
export function AnalyticsDateSelector({
  selectedDate,
  onDateChange,
  viewType,
}: AnalyticsDateSelectorProps) {
  const datePickerRef = useRef<DatePicker>(null);

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

  return (
    <DatePickerContainer>
      <IconButton
        icon={faChevronLeft}
        onClick={decreaseDate}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat={viewType === ViewType.MONTH ? "MMMM yyyy" : "yyyy"}
        showYearPicker={viewType === ViewType.YEAR}
        showMonthYearPicker={viewType === ViewType.MONTH}
        showPopperArrow={false}
        ref={datePickerRef}
        onClickOutside={() => {
          if (datePickerRef.current) {
            datePickerRef.current.setOpen(false);
          }
        }}
        customInput={
          <DatePickerButton onClick={handleButtonClick}>
            {viewType === ViewType.MONTH
              ? selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })
              : selectedDate.getFullYear()}
          </DatePickerButton>
        }
      />
      <IconButton
        icon={faChevronRight}
        onClick={increaseDate}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <TodayButton onClick={handleTodayClick} />
    </DatePickerContainer>
  );
}