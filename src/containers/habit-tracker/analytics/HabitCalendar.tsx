import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Logging } from "../../../containers/habit-tracker/habits/Habits";
import { colors } from "../../../common/utilities/color-utils";

interface CalendarProgressProps {
  habitsLog: Logging;
  selectedHabit: string;
  year: number;
  month: string;
  habitCount: number;
  selectedMonth: Date;
}

// Container for the entire calendar component
const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .react-calendar {
    width: 100%;
    max-width: 100%;
    border: none;
    background-color: white;
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 8px;
    padding: 0px;
  }

  .react-calendar__navigation {
    display: none;
  }

  .react-calendar__tile {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    pointer-events: none;
  }

  .react-calendar__month-view__days__day {
    height: 55px;
    margin: 0;
  }

  .react-calendar__month-view__days__day--neighboringMonth,
  .react-calendar__month-view__days__day > abbr {
    visibility: hidden;
  }

  .react-calendar__month-view__days__day--weekend {
    color: inherit;
  }

  .react-calendar__tile--active,
  .react-calendar__tile--now {
    background: none;
    border: none;
  }

  .react-calendar__month-view__weekdays {
    color: ${colors.green};
  }

  .react-calendar__month-view__weekdays__weekday {
    color: ${colors.green};
  }
`;

// Wrapper for each day's circular progress bar
const DayWrapper = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Styled component to display the current month and year
const MonthYearDisplay = styled.div`
  color: ${colors.blue};
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px;
`;

// HabitCalendar component to render the calendar with habit tracking progress
export function HabitCalendar({
  habitsLog,
  selectedHabit,
  year,
  month,
  habitCount,
  selectedMonth,
}: CalendarProgressProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // Update the selected date whenever the selected month changes
  useEffect(() => {
    setSelectedDate(selectedMonth);
  }, [selectedMonth]);

  // Calculate the progress of logs vs count
  const getDayProgress = (day: number) => {
    const logs = habitsLog[selectedHabit]?.[year]?.[month]?.[day] || 0;
    const progress = (logs / habitCount) * 100;
    return progress;
  };

  // Render content for each day tile in the calendar
  const tileContent = ({ date }: { date: Date }) => {
    const day = date.getDate();
    const progress = getDayProgress(day);

    return (
      <DayWrapper>
        <CircularProgressbar
          value={progress}
          text={day.toString()}
          styles={buildStyles({
            textSize: "24px",
            pathColor: progress === 100 ? colors.green : colors.blue,
            textColor: colors.blue,
            trailColor: "#f4f4f4",
          })}
        />
      </DayWrapper>
    );
  };

  // Display the current month and year based on the selected date
  const currentMonthYear = `${selectedDate?.toLocaleDateString("en-US", {
    month: "long",
  })} ${selectedDate?.getFullYear()}`;

  return (
    <CalendarContainer>
      <MonthYearDisplay>{currentMonthYear}</MonthYearDisplay>
      <Calendar
        onChange={() => {}}
        value={selectedDate}
        tileContent={tileContent}
        calendarType="iso8601"
      />
    </CalendarContainer>
  );
}
