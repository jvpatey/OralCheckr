import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "./DayBubble";

// Styled component for the container of the date controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

// Styled component for the container of the date bubbles
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
  background-color: ${({ $disabled }) => ($disabled ? "#e0e0e0" : "#f5f5f5")};
  border: none;
  color: ${({ $disabled }) => ($disabled ? "#3f93b2" : "#3f93b2")};
  border: ${({ $disabled }) =>
    $disabled ? "2px solid #f5f5f5" : "2px solid #3f93b2"};
  padding: 8px 12px;
  border-radius: 10px;
  text-align: center;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? "#e0e0e0" : "#3f93b2")};
    color: ${({ $disabled }) => ($disabled ? "#3f93b2" : "#f5f5f5")};
    border: ${({ $disabled }) =>
      $disabled ? "2px solid #f5f5f5" : "2px solid #f5f5f5"};
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
  color: ${({ $disabled }) => ($disabled ? "#9e9e9e" : "#3f93b2")};
  font-size: 20px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  border-radius: 50%;
  width: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ $disabled }) => ($disabled ? "none" : "#dfdfdf")};
  }

  &:focus {
    outline: none;
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

interface DatePickerWithBubblesProps {
  isEditMode: boolean;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export function DatePickerWithBubbles({
  isEditMode,
  selectedDate,
  setSelectedDate,
}: DatePickerWithBubblesProps) {
  // State to track the selected day within the week
  const [selectedDay, setSelectedDay] = useState<number>(selectedDate.getDay());

  // Calculate the start of the week and the days in the week based on the selected date
  const startOfWeek = getStartOfWeek(selectedDate);
  const daysInWeek = getDaysInWeek(startOfWeek);

  // Format the week range for display
  const weekRange = `${startOfWeek.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })} - ${daysInWeek[6].toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })}`;

  // Handler for moving to the previous week
  const handlePrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 7);
    setSelectedDate(newDate);
    setSelectedDay(newDate.getDay());
  };

  // Handler for moving to the next week
  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 7);
    setSelectedDate(newDate);
    setSelectedDay(newDate.getDay());
  };

  // Handler for clicking on a specific day bubble
  const handleDayClick = (dayIndex: number) => {
    const newDate = new Date(startOfWeek);
    newDate.setDate(startOfWeek.getDate() + dayIndex);
    setSelectedDate(newDate);
    setSelectedDay(dayIndex);
  };

  // Custom input component for the DatePicker
  const CustomInput = forwardRef(({ onClick }: any, ref: any) => (
    <CustomDatePickerInput $disabled={isEditMode} onClick={onClick} ref={ref}>
      {weekRange}
    </CustomDatePickerInput>
  ));

  return (
    <DateControlsContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) setSelectedDate(date);
        }}
        dateFormat="MMMM d, yyyy"
        showWeekNumbers
        customInput={<CustomInput />}
        disabled={isEditMode}
      />
      <DayBubbleContainer>
        <ArrowButton onClick={handlePrevWeek} $disabled={isEditMode}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        {daysInWeek.map((day, index) => (
          <DayBubble
            key={index}
            selected={index === selectedDay}
            onClick={() => handleDayClick(index)}
            date={day}
            isEditMode={isEditMode}
          />
        ))}
        <ArrowButton onClick={handleNextWeek} $disabled={isEditMode}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowButton>
      </DayBubbleContainer>
    </DateControlsContainer>
  );
}
