import styled from "styled-components";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { IconButton } from "../../../components/habit-tracker/habits/IconButton";
import {
  faChevronLeft,
  faChevronRight,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../common/utilities/color-utils";
import "react-datepicker/dist/react-datepicker.css";

interface YearSelectorProps {
  selectedYear: Date;
  onYearChange: (date: Date) => void;
}

// Styled component for the Year Picker container
const YearPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  margin-bottom: 10px;

  @media (max-width: 600px) {
    width: 300px;
    padding: 0 10px;
  }
`;

// Styled component for the custom Year Picker button
const YearPickerButton = styled.button`
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

// The YearSelector component to handle the selection and navigation of years
export function YearSelector({
  selectedYear,
  onYearChange,
}: YearSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Handles the change of the selected year from the DatePicker
  const handleYearChange = (date: Date | null) => {
    if (date) {
      onYearChange(date);
    }
    setIsOpen(false);
  };

  // Decrease the selected year by one
  const decreaseYear = () => {
    const prevYear = new Date(
      selectedYear.getFullYear() - 1,
      selectedYear.getMonth(),
      1
    );
    onYearChange(prevYear);
  };

  // Increase the selected year by one
  const increaseYear = () => {
    const nextYear = new Date(
      selectedYear.getFullYear() + 1,
      selectedYear.getMonth(),
      1
    );
    onYearChange(nextYear);
  };

  // Set the selected year to the current year
  const handleTodayClick = () => {
    onYearChange(new Date());
  };

  return (
    <YearPickerContainer>
      <IconButton
        icon={faChevronLeft}
        onClick={decreaseYear}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <DatePicker
        selected={selectedYear}
        onChange={handleYearChange}
        dateFormat="yyyy"
        showYearPicker
        showPopperArrow={false}
        open={isOpen}
        onClickOutside={() => setIsOpen(false)}
        customInput={
          <YearPickerButton onClick={() => setIsOpen(!isOpen)}>
            {selectedYear.getFullYear()}
          </YearPickerButton>
        }
      />
      <IconButton
        icon={faChevronRight}
        onClick={increaseYear}
        borderColor={colors.blue}
        backgroundColor={colors.bgWhite}
        color={colors.blue}
        hoverBackgroundColor={colors.blue}
        hoverColor={colors.bgWhite}
      />
      <IconButton
        icon={faCalendarDay}
        onClick={handleTodayClick}
        borderColor={colors.green}
        backgroundColor={colors.bgWhite}
        color={colors.green}
        hoverBackgroundColor={colors.green}
        hoverColor={colors.bgWhite}
      />
    </YearPickerContainer>
  );
}
