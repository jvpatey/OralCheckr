import styled from "styled-components";
import { useRef } from "react";
import DatePicker from "react-datepicker";
import { IconButton } from "../../../../components/habit-tracker/habits/IconButton";
import { TodayButton } from "../../../../components/habit-tracker/analytics/TodayButton";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../../common/utilities/color-utils";
import "react-datepicker/dist/react-datepicker.css";

interface MonthSelectorProps {
  selectedMonth: Date;
  onMonthChange: (date: Date) => void;
}

// Styled component for the Month Picker container
const MonthPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 440px;

  @media (max-width: 600px) {
    width: 300px;
    padding: 0 10px;
  }
`;

// Styled component for the custom Month Picker button
const MonthPickerButton = styled.button`
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

// The MonthSelector component to handle the selection and navigation of months for month view of analytics page
export function MonthSelector({
  selectedMonth,
  onMonthChange,
}: MonthSelectorProps) {
  const datePickerRef = useRef<DatePicker>(null);

  // Handles the change of the selected month from the DatePicker
  const handleMonthChange = (date: Date | null) => {
    if (date) {
      onMonthChange(date);
    }
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  };

  // Decrease the selected month by one
  const decreaseMonth = () => {
    const prevMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() - 1,
      1
    );
    onMonthChange(prevMonth);
  };

  // Increase the selected month by one
  const increaseMonth = () => {
    const nextMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + 1,
      1
    );
    onMonthChange(nextMonth);
  };

  // Set the selected month to the current month
  const handleTodayClick = () => {
    onMonthChange(new Date());
  };

  // Handle the click on the month button to open the date picker
  const handleButtonClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <MonthPickerContainer>
      <IconButton
        icon={faChevronLeft}
        onClick={decreaseMonth}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <DatePicker
        selected={selectedMonth}
        onChange={handleMonthChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        showPopperArrow={false}
        ref={datePickerRef}
        onClickOutside={() => {
          if (datePickerRef.current) {
            datePickerRef.current.setOpen(false);
          }
        }}
        customInput={
          <MonthPickerButton onClick={handleButtonClick}>
            {selectedMonth.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </MonthPickerButton>
        }
      />
      <IconButton
        icon={faChevronRight}
        onClick={increaseMonth}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <TodayButton onClick={handleTodayClick} />
    </MonthPickerContainer>
  );
}
