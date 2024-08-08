import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { DayBubble } from "./DayBubble";

// Styled component for the date controls
const DateControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

// Styled component for the date bubbles container
const DayBubbleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
`;

// Styled component for the date picker
const CustomDatePickerInput = styled.input`
  background-color: #f5f5f5;
  border: none;
  color: #3f93b2;
  border: 2px solid #3f93b2;
  padding: 8px 12px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #3f93b2;
    color: #f5f5f5;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 3px 2px rgba(53, 122, 150, 0.5);
  }
`;

// Styled component for the arrow buttons
const ArrowButton = styled.button`
  background: none;
  border: none;
  color: #3f93b2;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  width: 30px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dfdfdf;
  }

  &:focus {
    outline: none;
  }
`;

// Helper function to get the start of the week for a given date
const getStartOfWeek = (date: Date) => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
  return startOfWeek;
};

// Helper function to get an array of the days in the week
const getDaysInWeek = (startOfWeek: Date) => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    days.push(day);
  }
  return days;
};

export function DatePickerWithBubbles() {
  // State to store the currently selected date in the DatePicker
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // State to store the currently selected day of the week
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());

  // Get the start of the week and the days in the week
  const startOfWeek = getStartOfWeek(selectedDate);
  const daysInWeek = getDaysInWeek(startOfWeek);

  // Format the week range
  const weekRange = `${startOfWeek.toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })} - ${daysInWeek[6].toLocaleDateString("en", {
    month: "short",
    day: "numeric",
  })}`;

  // Handler functions for changing the selected date
  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7);
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7);
      return newDate;
    });
  };

  return (
    <DateControlsContainer>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          if (date) setSelectedDate(date);
        }}
        dateFormat="MMMM d, yyyy"
        showWeekNumbers
        customInput={<CustomDatePickerInput />}
        placeholderText={weekRange}
      />
      <DayBubbleContainer>
        <ArrowButton onClick={handlePrevWeek}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </ArrowButton>
        {daysInWeek.map((day, index) => (
          <DayBubble
            key={index}
            selected={index === selectedDay}
            onClick={() => setSelectedDay(index)}
            date={day}
          />
        ))}
        <ArrowButton onClick={handleNextWeek}>
          <FontAwesomeIcon icon={faChevronRight} />
        </ArrowButton>
      </DayBubbleContainer>
    </DateControlsContainer>
  );
}
